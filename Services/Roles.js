const { Op } = require('sequelize');
const Role = require('../Models/Roles');
const UserGroup = require('../Models/UserGroups');
const Screen = require('../Models/Screens');
const RoleAccessScreen = require('../Models/RoleAccessScreens');
const Module = require('../Models/Modules');
const { pagination } = require('../utils/Common');
const CustomError = require('../utils/CustomError');
const errorMessages = require('../utils/ErrorMessages');


const getRole = async (req, { searchFilters, page = 1, pageSize = 10 }) => {
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
    const role = await Role.findAndCountAll({
      include: [
        {
          model: UserGroup,
          as: 'UserGroup',
          attributes: ['UserGroupName'],
        },
      ],
      where: where,
      offset, limit
    });

    // Calculate total pages and total items
    const totalItems = role.count;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Create a response object with pagination information
    const response = {
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      totalPages,
      totalItems,
      data: role.rows,
    };

    return response;
  }
  catch (err) {
    //log.info (errorMessages.EFR, err);
    throw new CustomError(errorMessages.EFR)
  }
}

const getAllRolesWithModulesScreensWithID = async (roleId) => {

  try {
    const role = await Role.findAll({
      where: { RoleID: roleId },
      include: [
        {
          model: RoleAccessScreen,
          as: 'RoleAccessScreens', // Use the alias defined in the Role model
          attributes: ['RoleAccessScreenID'],
          include: [
            {
              model: Screen,
              as: 'Screen',
              attributes: ['ScreenID', 'ScreenName', 'ScreenURL', 'ScreenActive', 'ScreenOrder', 'ModuleID'],
              include: [
                {
                  model: Module,
                  as: 'Module',
                  attributes: ['ModuleName', 'ModuleIcon']
                }
              ]
            }
          ]
        },
      ],
    });
    return role;
  }
  catch (err) {
    //log.info(errorMessages.EFD, err);
    throw new CustomError(errorMessages.EFD);
  }
}

const getRoleByUserGroup = async (userGroupId) => {

  try {
    const role = await Role.findAll({
      where: { UserGroupID: userGroupId },
    });
    if (!role) {
      return res.status(404).json({ message: errorMessages.NRUGID });
    }
    return role
  }
  catch (err) {
    //log.info(errorMessages.EFRBUG, err);
    throw new CustomError(errorMessages.EFRBUG);
  }
}

const createRole = async (data) => {
  try {
    // Check if the provided UserGroupId exists in UserGroupModel
    const userGroup = await UserGroup.findByPk(data.UserGroupID); // Use UserGroupId

    if (!userGroup) {
      return res.status(400).json({ message: errorMessages.IUGID });
    }

    const result = await Role.create(data);
    return result;
  }
  catch (err) {
    //log.info(errorMessages.EOCR, err);
    throw new CustomError(errorMessages.EOCR);
  }
}

const updateRole = async (id, data) => {
  try {

    const [updatedRowsCount, [updateRole]] = await Role.update(data, {
      where: { RoleID: id },
      returning: true, // Return the updated record
    });

    if (!updatedRowsCount) {
      return ''
    }

    return updateRole;
  }
  catch (err) {
    //log.info(errorMessages.EOUR, err)
    throw new CustomError(errorMessages.EOUR);
  }
}

module.exports = {
  getRole,
  getAllRolesWithModulesScreensWithID,
  getRoleByUserGroup,
  createRole,
  updateRole,
}