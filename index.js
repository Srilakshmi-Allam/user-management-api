const dotenv = require('dotenv');

const connectMongoDB = require('./Config/mongo');
const pgsqlConnection = require('./Config/Connection');

const { userGroupController,
    userController,
    screenController,
    roleController,
    RoleAccessScreenController,
    ModuleController,
    AuditController,
    AuthUpdatePassword,
} = require('./Controllers')

const initialize = async (config) => {
    // Load environment variables from .env file
    dotenv.config();

    // Override environment variables with config values
    process.env = { ...process.env, ...config };
    
    await connectMongoDB(config); // Connect to MongoDB
    await pgsqlConnection.initialize(config);
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
    AuditController,
    AuthUpdatePassword,
  };