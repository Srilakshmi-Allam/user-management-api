const UserGroup = require('../Services/UserGroups');
const errorMessages = require('../utils/ErrorMessages');

/**
 * @swagger
 * /userGroups:
 *   post:
 *     summary: Create a new User Group
 *     tags:
 *       - User Groups
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserGroups'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserGroups'
 *       500:
 *         description: Internal Server Error
 * 
 * components:
 *   schemas:
 *     UserGroups:
 *       type: object
 *       properties:
 *         UserGroupID:
 *           type: string
 *         UserGroupName:
 *           type: string
 *         CreatedBy:
 *           type: string
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *         UpdatedBy:
 *           type: string
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /userGroupsPagination:
 *   get:
 *     summary: Get all User Groups.
 *     tags:
 *       - User Groups
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination.
 *         schema:
 *           type: integer
 *       - name: pageSize
 *         in: query
 *         description: Number of items per page.
 *         schema:
 *           type: integer
 *       - name: searchFilters
 *         in: query
 *         description: Search Filters to filters the members.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully fetching the User Groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserGroups'
 *       '500':
 *         description: Error while fetching User Groups
 *         content:
 *           application/json:
 *             example:
 *               message: Error while fetching User Groups
*/

/**
 * @swagger
 * /userGroups:
 *   get:
 *     summary: Get all User Groups.
 *     tags:
 *       - User Groups
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetching the User Groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserGroups'
 *       '500':
 *         description: Error while fetching User Groups
 *         content:
 *           application/json:
 *             example:
 *               message: Error while fetching User Groups
*/

/**
 * @swagger
 * /userGroups/{id}:
 *   get:
 *     summary: Get a User Groups by its ID
 *     tags:
 *       - User Groups
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the User Groups to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User Groups retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserGroups'
 *       '404':
 *         description: User Groups not found
 *       '500':
 *         description: Error fetching User Groups
 *         content:
 *           application/json:
 *             example:
 *               message: Error fetching User Groups
 */

/**
 * @swagger
 * /userGroups/{id}:
 *   put:
 *     summary: Update a User Groups by ID
 *     tags:
 *       - User Groups
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the User Groups to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated User Groups object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserGroups'
 *     responses:
 *       '200':
 *         description: User Group updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserGroups'
 *       '404':
 *         description: User Group not found
 *         content:
 *           application/json:
 *             example:
 *               message: User Group not found
 *       '500':
 *         description: Error updating User Group
 *         content:
 *           application/json:
 *             example:
 *               message: Error updating User Group
 */

async function createUserGroup(req, res, next) {
  try {
    const data = await UserGroup.createUserGroup(req.body)
    return res.status(201).json(data);
  }
  catch (err) {
    next(err)
  }
}


async function getUserGroupPagination(req, res, next) {
  try {
    const data = await UserGroup.getUserGroupPagination(req, req.query)
    res.status(200).json(data)
  }
  catch (err) {
    next(err)
  }
}

async function getUserGroups(req, res, next) {
  try {
    const { UserGroupID } = req.query;
    const data = await UserGroup.getUserGroup(UserGroupID)
    res.status(200).json(data)
  }
  catch (err) {
    next(err)
  }
}

// Controller to get a screen by its ID
async function getUserGroupById(req, res, next) {

  try {
    const { id } = req.params;
    const data = await UserGroup.getUserGroupById(id)


    if (!data) {
      return res.status(404).json({ message: errorMessages.TPNF });
    }
    return res.status(200).json(data);
  }
  catch (err) {
    next(err)
  }
}

async function updateUserGroups(req, res, next) {
  try {
    const data = await UserGroup.updateUserGroup(req.params.id, req.body);

    if (!data) {
      return res.status(404).json({ message: 'User Group not found' });
    }

    return res.status(200).json(data);
  }
  catch (err) {
    next(err)
  }
}




module.exports = {
  getUserGroupPagination,
  createUserGroup,
  getUserGroups,
  getUserGroupById,
  updateUserGroups
};
