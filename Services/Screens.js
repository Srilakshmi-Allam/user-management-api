const { Op } = require('sequelize');
const Screen = require('../Models/Screens')
const User = require('../Models/Users');
const Role = require('../Models/Roles');
const RoleAccessScreen = require('../Models/RoleAccessScreens');
const Module = require('../Models/Modules');
const { pagination } = require('../utils/Common');
const CustomError = require('../utils/CustomError');
const errorMessages = require('../utils/ErrorMessages');


const getScreenPagination = async (req, { searchFilters, page = 1, pageSize = 10 }) => {
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

    const screens = await Screen.findAndCountAll({
      include: [
        {
          model: Module,
          as: 'Module',
          attributes: ['ModuleName', 'ModuleIcon'],
        }
      ],
      where: where,
      offset, limit
    });

    // Calculate total pages and total items
    const totalItems = screens.count;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Create a response object with pagination information
    const response = {
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      totalPages,
      totalItems,
      data: screens.rows,
    };

    return response;
  }
  catch (err) {
    //log.info (errorMessages.EFS, err);
    throw new CustomError(errorMessages.EFS)
  }
}


const getScreen = async (id) => {
  try {

    let whereCondition = {};

    if (id) {
      whereCondition.ScreenID = id;
    }

    const screens = await Screen.findAll({
      include: [
        {
          model: Module,
          as: 'Module',
          attributes: ['ModuleName', 'ModuleIcon'],
        }
      ],
      where: whereCondition,
    });

    return screens;
  }
  catch (err) {
    //log.info (errorMessages.EFS, err);
    throw new CustomError(errorMessages.EFS)
  }
}


const getScreenById = async (id) => {
  try {

    let whereCondition = {};

    if (id) {
      whereCondition.ScreenID = id;
    }

    const screens = await Screen.findOne({
      include: [
        {
          model: Module,
          as: 'Module',
          attributes: ['ModuleName', 'ModuleIcon'],
        }
      ],
      where: whereCondition,
      // attributes: [
      //   'ScreenID',
      //   'ScreenName',
      //   'ScreenURL',
      //   'ScreenActive',
      //   'ScreenOrder',
      //   'ModuleID',
      //   'CreatedBy',
      //   'CreatedAt',
      //   'UpdatedBy',
      //   'UpdatedAt'

      // ],
    });

    return screens;
  }
  catch (err) {
    //log.info (errorMessages.EFS, err);
    throw new CustomError(errorMessages.EFS)
  }
}

const createScreen = async (data) => {
  try {

    const result = await Screen.create(data);
    return result;
  }
  catch (err) {
    //log.info(errorMessages.EOCS, err);
    throw new CustomError(errorMessages.EOCS);
  }
}


// Create a utility function to restructure the data
function restructureData(payload) {
  const modules = {};

  payload.forEach((item) => {
    const { ModuleID, ModuleName, ModuleIcon } = item.RoleAccessScreen.Screen.Module;
    const { ScreenID, ScreenName, ScreenURL } = item.RoleAccessScreen.Screen;

    if (!modules[ModuleID]) {
      modules[ModuleID] = {
        ModuleID,
        ModuleName,
        ModuleIcon,
        Screens: [],
      };
    }

    modules[ModuleID].Screens.push({
      ScreenID,
      ScreenName,
      ScreenURL,
    });
  });

  return { Modules: Object.values(modules) };
}

const getUserScreens = async (userEmail) => {
  try {
    const userScreens = await User.findAll({
      where: { UserEmail: userEmail },
      include: [
        {
          model: Role,
        },
        {
          model: RoleAccessScreen,
          include: [
            {
              model: Screen,
              attributes: ["ScreenID", "ScreenName", "ScreenURL", "ScreenOrder"],

              include: [
                {
                  model: Module,
                  attributes: ["ModuleID", "ModuleName", "ModuleIcon", "ModuleOrder"],
                  where: { ModuleActive: true }
                }
              ],

              where: { ScreenActive: true },
              required: true, // Separate loading for screens
            },
          ],
        },
      ],
      order: [
        [RoleAccessScreen, Screen, Module, 'ModuleOrder', 'ASC'],
        [RoleAccessScreen, Screen, 'ScreenOrder', 'ASC'],
      ],
    }
    )
    // log.info(userScreens);
    if (!userScreens) {
      return res.status(404).json({ message: errorMessages.UNF });
    }

    //  res.json(restructureData(userScreens));
    return (restructureData(userScreens))


  } catch (error) {
    res.status(500).json({ message: errorMessages.ISE });
  }
};

const updateScreen = async (id, data) => {
  try {

    const [updatedRowsCount, [updateScreen]] = await Screen.update(data, {
      where: { ScreenID: id },
      returning: true, // Return the updated record
    });

    if (!updatedRowsCount) {
      return ''
    }

    return updateScreen;
  }
  catch (err) {
    //log.info(errorMessages.EOUS, err)
    throw new CustomError(errorMessages.EOUS);
  }
}

module.exports = {
  getScreenPagination,
  getScreenById,
  getScreen,
  getUserScreens,
  createScreen,
  updateScreen
}