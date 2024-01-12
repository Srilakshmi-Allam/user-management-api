const { Op } = require('sequelize');
const User = require('../Models/Users');
const Role = require('../Models/Roles');
const UserGroup = require('../Models/UserGroups');
require('dotenv').config();
const Sequelize = require('sequelize');
// const sequelize = require('../Config/Connection');
const { pagination, chartData, pieData } = require('../utils/Common');
const CustomError = require('../utils/CustomError');
const errorMessages = require('../utils/ErrorMessages');
const axios = require('axios');
const generateRandomPassword = require('../utils/PasswordGenerator'); // Adjust the path as needed
const { getAuth0AccessToken } = require('../utils/CreateUserAccessToken'); // Import the fetchUserData function
const sequelize = require('../Config/Connection');

const getUser = async (req, { searchFilters, page = 1, pageSize = 10 }) => {
  try {

    const { offset, limit } = pagination(page, pageSize);
    const where = {};

    searchFilters = JSON.parse(searchFilters)
    // Iterate through the keys of filterKeys and add conditions to 'where' object
    for (const key in searchFilters) {
      if (searchFilters[key]) {
        // For case-insensitive search 
        where[key] = { [Op.iLike]: `%${searchFilters[key]}%` };
      }
    }

    const user = await User.findAndCountAll({
      include: [
        {
          model: UserGroup,
          as: 'UserGroup',
          attributes: ['UserGroupName'],
        },
        {
          model: Role,
          as: 'Role',
          attributes: ['RoleName'],
        },
      ],
      where: where,
      offset, limit
    });

    // Calculate total pages and total items
    const totalItems = user.count;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Create a response object with pagination information
    const response = {
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      totalPages,
      totalItems,
      data: user.rows,
    };

    return response;
  }
  catch (err) {
    console.log(err);
    //log.info (errorMessages.EFU, err);
    throw new CustomError(errorMessages.EFU)
  }
}

const getUserById = async (id) => {

  try {
    const user = await User.findOne({
      include: [
        {
          model: UserGroup,
          as: 'UserGroup',
          attributes: ['UserGroupName'],
        },
        {
          model: Role,
          as: 'Role',
          attributes: ['RoleName'],
        },
      ],
      where: { UserID: id },
    });
    return user
  }
  catch (err) {
    //log.info(errorMessages.EFU, err);
    throw new CustomError(errorMessages.EFU);
  }
}

const getUserByEmail = async (email) => {

  try {
    const user = await User.findOne({
      where: { UserEmail: email },
    });
    return user
  }
  catch (err) {
    //log.info(errorMessages.EFU, err);
    throw new CustomError(errorMessages.EFU);
  }
}

const createUser = async (data) => {
  try {
    const password = generateRandomPassword();
    //log.info(password);

    // Get the Auth0 Access Token
    const auth0AccessToken = await getAuth0AccessToken();

    const auth0UserData = {
      email: data.UserEmail,
      password: password,
      connection: 'Username-Password-Authentication',
      user_metadata: {
        custom_field: 'custom_value',
        Color: password, // Include the password here
      },
    };

    const AuthApiUrl = process.env.AUTH0_EMAIL_API_URL;

    const auth0Response = await axios.post(AuthApiUrl, auth0UserData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth0AccessToken}`,
      },
    });
    if (auth0Response.status === 201) {

      const result = await User.create(data);
      return result;
    }
  }
  catch (err) {
    console.log(err);
    //log.info(errorMessages.EOCU, err);
    throw new CustomError(errorMessages.EOCU);
  }
}

const updateUser = async (id, data) => {
  try {

    const [updatedRowsCount, [updateUser]] = await User.update(data, {
      where: { UserID: id },
      returning: true, // Return the updated record
    });

    if (!updatedRowsCount) {
      return ''
    }

    return updateUser;
  }
  catch (err) {
    //log.info(errorMessages.EOUU, err)
    throw new CustomError(errorMessages.EOUU);
  }
}




module.exports = {
  getUser,
  getUserByEmail,
  createUser,
  getUserById,
  updateUser,
}