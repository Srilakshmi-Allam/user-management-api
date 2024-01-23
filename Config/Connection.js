const { Sequelize } = require('sequelize');

// Function to initialize Sequelize with provided process.envuration
const initialize = () => {
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
        require: true,
        rejectUnauthorized: false,
      },
    },
  });

  // Test the database connection
  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

};

module.exports = initialize;

