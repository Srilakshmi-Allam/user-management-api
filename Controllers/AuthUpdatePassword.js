const axios = require('axios');
const { getAuth0AccessToken } = require('../utils/CreateUserAccessToken'); // Adjust the path to the auth0AccessToken file
const generateRandomPassword = require('../utils/PasswordGenerator');

/**
 * @swagger
 * /updatePassword/{email}/{newPassword}:
 *   put:
 *     summary: Update a user password
 *     tags:
 *       - Password
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: enter users email to update password
 *         schema:
 *           type: string
 *       - in: path
 *         name: newPassword
 *         required: true
 *         description: enter new password 
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Password and metadata updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Password and metadata updated successfully
 *       '400':
 *         description: Bad request, invalid input
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid input
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: User not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */

/**
 * @swagger
 * /resetPassword/{email}:
 *   put:
 *     summary: Reset email for a user to change password
 *     tags:
 *       - Password
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: enter users email 
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Password and metadata updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Password and metadata updated successfully
 *       '400':
 *         description: Bad request, invalid input
 *         content:
 *           application/json:
 *             example:
 *               message: Invalid input
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: User not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: Internal server error
 */


async function updatePassword(req, res) {
  try {
    const { email, newPassword } = req.params; // Assuming the request body contains email, newPassword, and metadataValue

    // Get the Auth0 Access Token
    const accessToken = await getAuth0AccessToken();

    // Fetch the user by email
    const usersResponse = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users-by-email`,
      {
        params: {
          email: email,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (usersResponse.data.length === 0) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = usersResponse.data[0].user_id;

    // Update the user's password using the Auth0 Management API
    await axios.patch(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`,
      {
        password: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Update the user's metadata (assuming 'metadataKey' is the key for the metadata you want to update)
    await axios.patch(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`,
      {
        user_metadata: {
          Color: newPassword,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log('Password and metadata updated successfully');
    return res.status(200).json({ message: 'Password and metadata updated successfully' });
  } catch (error) {
    console.error('Error updating password and metadata:', error.response.data);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


async function resetPassword(req, res) {
  try {
    const { email } = req.params; // Get the user's email from the route params

    // Generate a random password for the user
    const newPassword = generateRandomPassword();

    // Get the Auth0 Access Token
    const auth0AccessToken = await getAuth0AccessToken();

    // Fetch the user by email
    const usersResponse = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users-by-email`,
      {
        params: {
          email: email,
        },
        headers: {
          Authorization: `Bearer ${auth0AccessToken}`,
        },
      }
    );

    if (usersResponse.data.length === 0) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = usersResponse.data[0].user_id;

    // Update the user's password using the Auth0 Management API
    const updateUserPasswordResponse = await axios.patch(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`,
      {
        password: newPassword,
        user_metadata: {
          Color: newPassword,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${auth0AccessToken}`,
        },
      }
    );

    // Check if the password update was successful
    if (updateUserPasswordResponse.status === 200) {
        const auth0Response = await axios.post(
          `https://${process.env.AUTH0_DOMAIN}/dbconnections/change_password`,
          {
            email:email,
            connection: 'Username-Password-Authentication',
          },
          {
            headers: {
              Authorization: `Bearer ${auth0AccessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (auth0Response.status === 201) {
          console.log('Email sent Successfully');
        }

        return res.status(200).json({ message: 'Password reset email sent successfully.' });

    } else {
      // Handle the case where password update in Auth0 failed
      console.error(
        'Failed to update password in Auth0:',
        updateUserPasswordResponse.data
      );
      return res
        .status(updateUserPasswordResponse.status)
        .json(updateUserPasswordResponse.data);
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ error: 'Failed to reset password.' });
  }
}


module.exports = { updatePassword,
  resetPassword };

