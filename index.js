const dotenv = require('dotenv');

const initialize = async (config) => {
    if (!config || !config.sequelize) {
        throw new Error('Config variable with sequelize property is required');
    }
    // Load environment variables from .env file
    dotenv.config();

    // Override environment variables with config values
    process.env = { ...process.env, ...config };

    // Get sequelize database from the module that's using this

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
