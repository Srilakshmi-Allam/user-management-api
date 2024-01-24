const dotenv = require('dotenv');

const { userGroupController,
    userController,
    screenController,
    roleController,
    RoleAccessScreenController,
    ModuleController,
    AuthUpdatePassword,
} = require('./Controllers')

const initialize = async (config) => {

    // Load environment variables from .env file
    dotenv.config();

    // Override environment variables with config values
    process.env = { ...process.env, ...config };

    // get sequlize database from module who using this

    console.log('config.sequelize', config.sequelize)

    global.sequelize = config.sequelize;
}

// Export everything in a single object
module.exports = {
    initialize,
    userGroupController,
    userController,
    screenController,
    roleController,
    RoleAccessScreenController,
    ModuleController,
    AuthUpdatePassword,
  };