// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');

const connectMongoDB = require('./Config/mongo');
const pgsqlConnection = require('./Config/Connection');
const errorMessages = require ('./utils/ErrorMessages.js');

//const checkJwt = require('./Auth');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const routes = require('./routes/Routes'); // Import the routes

app.use(express.json());
app.use(cors());
app.use(compression());


async function startServer() {
  try {
    await connectMongoDB(); // Connect to MongoDB
    console.log('Connected to MongoDB');

    await pgsqlConnection.authenticate();
    console.log('Connected to PostgreSQL');


// Use the Swagger middleware to serve the Swagger UI and documentation, protected by Auth0 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
 app.use(routes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
} catch (error) {
  console.error('Error:', errorMessages.PE);
  console.log(error);
  process.exit(1);
}
}

// Call the startServer function to start the Express server
startServer();


