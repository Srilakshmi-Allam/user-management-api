const { Op } = require('sequelize');
const UserGroup = require('../Models/UserGroups');
// const sequelize = require('../Config/Connection');
const { pagination } = require('../utils/Common');
const CustomError = require('../utils/CustomError');
const errorMessages = require('../utils/ErrorMessages');

const getUserGroupPagination = async (req, { searchFilters, page = 1, pageSize = 10 }) => {
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

    const userGroups = await UserGroup.findAndCountAll({
      where: where,
      offset, limit
    });

    // Calculate total pages and total items
    const totalItems = userGroups.count;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Create a response object with pagination information
    const response = {
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      totalPages,
      totalItems,
      data: userGroups.rows,
    };

    return response;
  }
  catch (err) {
    //log.info (errorMessages.EFUG, err);
    throw new CustomError(errorMessages.EFUG)
  }
}


const getUserGroup = async (id) => {
  try {

    let whereCondition = {};

    if (id) {
      whereCondition.UserGroupID = id;
    }

    const userGroups = await UserGroup.findAll({
      where: whereCondition,
    });
    return userGroups;
  }
  catch (err) {
    //log.info (errorMessages.EFUG, err);
    console.log(err)
    throw new CustomError(errorMessages.EFUG)
  }
}

const getUserGroupById = async (id) => {
  try {

    let whereCondition = {};

    if (id) {
      whereCondition.UserGroupID = id;
    }

    const userGroups = await UserGroup.findOne({
      where: whereCondition,
    });
    return userGroups;
  }
  catch (err) {
    //log.info (errorMessages.EFUG, err);
    throw new CustomError(errorMessages.EFUG)
  }
}

const createUserGroup = async (data) => {
  try {

    const result = await UserGroup.create(data);
    return result;
  }
  catch (err) {
    //log.info(errorMessages.EOCUG, err);
    throw new CustomError(errorMessages.EOCUG);
  }
}

const updateUserGroup = async (id, data) => {
  try {

    const [updatedRowsCount, [updateUserGroup]] = await UserGroup.update(data, {
      where: { UserGroupID: id },
      returning: true, // Return the updated record
    });

    if (!updatedRowsCount) {
      return ''
    }

    return updateUserGroup;
  }
  catch (err) {
    //log.info(errorMessages.EOUUG, err)
    throw new CustomError(errorMessages.EOUUG);
  }
}

module.exports = {
  getUserGroupById,
  getUserGroupPagination,
  getUserGroup,
  createUserGroup,
  updateUserGroup
}