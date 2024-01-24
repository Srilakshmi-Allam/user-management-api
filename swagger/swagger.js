const swaggerJSDoc = require('swagger-jsdoc');
//const path = require('path');
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Exalent Episode API',
            version: '1.0.0',
            description: 'API documentation for Exalent Episode operations'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
        },
    },
    apis: ['./Controllers/Users.js',
        './Controllers/UserGroups.js',
        './Controllers/Roles.js',
        './Controllers/Modules.js',
        './Controllers/Screens.js',
        './Controllers/RoleAccessScreens.js',
        './Controllers/trial.js',
        './Controllers/AuthUpdatePassword.js',
    ] // Make sure this is an array
}


const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

