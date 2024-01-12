const RoleAccessScreen= require('../Models/RoleAccessScreens');
const Role = require('../Models/Roles');
const Screen = require('../Models/Screens');
const { pagination } = require('../utils/Common');
const CustomError = require('../utils/CustomError');
const errorMessages = require('../utils/ErrorMessages');


const getRoleAccessScreens = async (id, page = 1, pageSize = 10) => {
    try{

  const { offset, limit } = pagination(page, pageSize);

  let whereCondition = {};

  if (id) {
    whereCondition.RoleAccessScreenID = id;
  }
  const roleAccessScreen = await RoleAccessScreen.findAndCountAll({
    where: whereCondition,
    attributes: [
      'RoleAccessScreenID',
      'RoleID',
      'ScreenID'

    ],
    offset, limit
  });

  // Calculate total pages and total items
  const totalItems = roleAccessScreen.count;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Create a response object with pagination information
  const response = {
    page: parseInt(page),
    pageSize: parseInt(pageSize),
    totalPages,
    totalItems,
    data: roleAccessScreen.rows,
  };

  return response;
}
catch(err){
    //log.info (errorMessages.EFRAS, err);
    throw new CustomError(errorMessages.EFRAS )
  }
}

const createRoleAccessScreen = async (data) => {
    try{
        const result = [];

        for (const ras of data) {
          const {  RoleAccessScreenID, RoleID, ScreenID } = ras;
    
          const role = await Role.findByPk(RoleID);
          if (!role) {
            return res.status(400).json({ message: errorMessages.IRID });
          }
    
          const screen = await Screen.findByPk(ScreenID);
          if (!screen) {
            return res.status(400).json({ message: errorMessages.ISID });
          }
    
          const newRoleAccessScreen = await RoleAccessScreen.create({
            RoleAccessScreenID, RoleID, ScreenID
          });
    
          result.push(newRoleAccessScreen);
        }
  return result;
}
catch (err) {
    //log.info(errorMessages.EOCRAS, err);
    throw new CustomError(errorMessages.EOCRAS );
  }
}

const updateRoleAccessScreen = async (id, data) => {
    try{

  const [updatedRowsCount, [updateRoleAccessScreen]] = await RoleAccessScreen.update(data, {
    where: { RoleAccessScreenID: id},
    returning: true, // Return the updated record
  });

  if (!updatedRowsCount) {
    return ''
  }

  return updateRoleAccessScreen;
}
catch (err) {
    //log.info(errorMessages.EOURAS, err)
    throw new CustomError(errorMessages.EOURAS );
  }
}

const deleteRoleAccessScreens = async( ids) => {
    try{
        const list = [];
        if (!Array.isArray(ids)) {
            ids = [ids];
          }
          for (const id of ids) {
            
      
            const roleAccessScreen = await RoleAccessScreen.findByPk(id);
            if (!roleAccessScreen) {
              continue;
            }
            await roleAccessScreen.destroy();
            list.push(id);
    }
    if (list.length === 0) {
        return list; // Return an empty list when no items are found.
      }
      return list;
    }
    catch(err){
        //log.info(errorMessages.EDRAS, err)
        throw new CustomError(errorMessages.EDRAS)
    }
}

module.exports = {
    getRoleAccessScreens,
    createRoleAccessScreen,
    updateRoleAccessScreen,
    deleteRoleAccessScreens,
}