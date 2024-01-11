// auth0AccessToken.js
const axios = require('axios');

async function getAuth0AccessToken() {
    try {
      const auth0ClientId = process.env.AUTH0_CLIENT_ID;
      const auth0ClientSecret = process.env.AUTH0_CLIENT_SECRET;
      const auth0TokenUrl = process.env.AUTH0_TOKEN_URL;
  
      const response = await axios.post(
        auth0TokenUrl,
        {
          grant_type: 'client_credentials',
          client_id: auth0ClientId,
          client_secret: auth0ClientSecret,
          audience: process.env.AUTH0_MANAGEMENT_API_AUDIENCE
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        return response.data.access_token;
      } else {
        throw new Error(`Failed to retrieve Auth0 Access Token: ${response.data.error}`);
      }
    } catch (error) {
      throw error;
    }
  }

module.exports = { getAuth0AccessToken };
