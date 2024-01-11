const fs = require('fs');
const swaggerSpec = require('./swagger'); // Import the swaggerConfig.js file

const outputPath = './swagger.json'; // Specify the path where the Swagger JSON file will be saved

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));

console.log(`Swagger JSON file generated at ${outputPath}`);
