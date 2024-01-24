const dotenv = require('dotenv');

const initialize = async (config) => {
    // Load environment variables from .env file
    dotenv.config();

    // Override environment variables with config values
    process.env = { ...process.env, ...config };

    // Get sequelize database from the module that's using this
    console.log('config.sequelize', config.sequelize);

    global.sequelize = config.sequelize;
}

const getControllers = () => {
    const controllers = require('./Controllers');

    return controllers;
}

module.exports = {
    initialize,
    getControllers,
};
