const { Op } = require('sequelize');
const Module = require('../Models/Modules');
const { pagination } = require('../utils/Common');
const CustomError = require('../utils/CustomError');
const errorMessages = require('../utils/ErrorMessages');


const getModule = async (req, { searchFilters, page = 1, pageSize = 10 }) => {
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

    const modules = await Module.findAndCountAll({
      where: where,
      offset, limit
    });

    // Calculate total pages and total items
    const totalItems = modules.count;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Create a response object with pagination information
    const response = {
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      totalPages,
      totalItems,
      data: modules.rows,
    };

    return response;
  }
  catch (err) {
    //log.info (errorMessages.EFM, err);
    throw new CustomError(errorMessages.EFM)
  }
}

const getModuleById = async (id) => {
  try {
    let whereCondition = {};

    if (id) {
      whereCondition.ModuleID = id;
    }

    const modules = await Module.findOne({
      where: whereCondition,
    });
    return modules;
  }
  catch (err) {
    //log.info (errorMessages.EFM, err);
    throw new CustomError(errorMessages.EFM)
  }
}

const createModule = async (data) => {
  try {

    const result = await Module.create(data);
    return result;
  }
  catch (err) {
    //log.info(errorMessages.EOCM, err);
    throw new CustomError(errorMessages.EOCM);
  }
}

const updateModule = async (id, data) => {
  try {

    const [updatedRowsCount, [updateModule]] = await Module.update(data, {
      where: { ModuleID: id },
      returning: true, // Return the updated record
    });

    if (!updatedRowsCount) {
      return ''
    }

    return updateModule;
  }
  catch (err) {
    //log.info(errorMessages.EOUM, err)
    throw new CustomError(errorMessages.EOUM);
  }
}

module.exports = {
  getModule,
  getModuleById,
  createModule,
  updateModule
}