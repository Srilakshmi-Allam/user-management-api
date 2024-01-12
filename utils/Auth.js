// auth.js
require('dotenv').config();
const { expressjwt: jwt } = require('express-jwt');
const errorMessages = require('./ErrorMessages');
const CustomError = require('../utils/CustomError');

const jwksRsa = require('jwks-rsa');

const authConfig = {
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUDIENCE,// Set this to the identifier of your API in Auth0
};

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 15,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256'],
  // handleErrors: false,
});


// const customErrorHandler = (err, req, res, next) => {
//   if (!req.key) {
//     // No access key found, provide a custom error message
//     const customErrorMessage = 'No access key found';
//     console.error('No access key found:', customErrorMessage);
//     res.status(401).json({ error: customErrorMessage });
//   } else if (err && err.name === 'UnauthorizedError') {
//     // Invalid token provided, provide a custom error message
//     const customErrorMessage = 'Invalid token';
//     console.error('Invalid token:', customErrorMessage);
//     res.status(401).json({ error: customErrorMessage });
//   } else {
//     next(err);
//   }
// };

const customErrorHandler = async (err, req, res, next) => {

  if (err.name === 'UnauthorizedError') {
    if (err.message === 'No authorization token was found') {
      // No token found
      return res.status(401).json({ error: errorMessages.NAT });
    }
    // JWT validation error, possibly due to an invalid or expired token
    return res.status(401).json({ error: errorMessages.IT });
  }

  if (err instanceof CustomError) {
    // Handle the error response directly within the route handler
    return res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    // Handle other types of errors
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = customErrorHandler;


module.exports = {
  checkJwt,
  customErrorHandler, // Export the custom error handler for use in your routes
};