require('dotenv').config()
const { Sequelize } = require('sequelize');



const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.AZURE_PG_SERVER,
  port: process.env.AZURE_PG_PORT,
  username: process.env.AZURE_PG_USER,
  password: process.env.AZURE_PG_PASSWORD,
  database: process.env.AZURE_PG_DATABASE,
  schema: process.env.AZURE_PG_SCHEMA_NAME,
  dialectOptions: {
    ssl: {
      require: true, // Use SSL
      rejectUnauthorized: false // Disable checking certificate
    }
  }
});

/**
 * SQL server database intialization
 
 const sequelize = new Sequelize(process.env.AZURE_SQL_DATABASE, process.env.AZURE_SQL_USER, process.env.AZURE_SQL_PASSWORD, {
  host: process.env.AZURE_SQL_SERVER,
  port: process.env.AZURE_SQL_PORT,
  dialect: 'mssql',
  dialectOptions: {
      options: {
          encrypt: true,
      }
  },

});

*/

/** 
 * Test the database connection
 
 (async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
 */



module.exports = sequelize;

