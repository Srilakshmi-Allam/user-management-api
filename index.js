const dotenv = require('dotenv');

const initialize = async (config) => {

    // Load environment variables from .env file
    dotenv.config();

    // Override environment variables with config values
    process.env = { ...process.env, ...config };

    // get sequlize database from module who using this

    console.log('config.sequelize', config.sequelize)

    global.sequelize = config.sequelize;

    const controllers = require('./Controllers');
    return controllers;
}

// Export everything in a single object
module.exports = {
    initialize,
  };
