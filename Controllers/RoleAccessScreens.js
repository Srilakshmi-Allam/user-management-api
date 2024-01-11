const RoleAccessScreen = require('../Services/RoleAccessScreens');
const Role = require('../Models/Roles')
const Screen = require('../Models/Screens')
const errorMessages = require('../utils/ErrorMessages');

/**
 * @swagger
 * /roleAccessScreens:
 *   post:
 *     summary: Create Role Access Screens
 *     tags:
 *       - Role Access Screens
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleAccessScreens'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleAccessScreens'
 *       500:
 *         description: Internal Server Error
 * 
 * components:
 *   schemas:
 *     RoleAccessScreens:
 *       type: object
 *       properties:
 *         RoleAccessScreenID:
 *           type: string
 *         RoleID:
 *           type: string
 *         ScreenID:
 *           type: string
 */

/**
 * @swagger
 * /roleAccessScreens:
 *   get:
 *     summary: Get all role access screens.
 *     tags:
 *       - Role Access Screens
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
 *     responses:
 *       '200':
 *         description: Successfully fetching the Role Access Screen
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoleAccessScreens'
 *       '500':
 *         description: Error while fetching Role Access Screen
 *         content:
 *           application/json:
 *             example:
 *               message: Error while fetching Role Access Screen
*/

/**
 * @swagger
 * /roleAccessScreens/{id}:
 *   get:
 *     summary: Get a Role Access Screen by its ID
 *     tags:
 *       - Role Access Screens
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the Role Access Screen to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Role Access Screen retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleAccessScreens'
 *       '404':
 *         description: Role Access Screen not found
 *       '500':
 *         description: Error fetching Role Access Screen
 *         content:
 *           application/json:
 *             example:
 *               message: Error fetching Role Access Screen
 */

/**
 * @swagger
 * /roleAccessScreens/{id}:
 *   put:
 *     summary: Update a Role Access Screen by ID
 *     tags:
 *       - Role Access Screens
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the Role Access Screen to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated Role Access Screen object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleAccessScreens'
 *     responses:
 *       '200':
 *         description: Role Access Screen updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleAccessScreens'
 *       '404':
 *         description: Role Access Screen not found
 *         content:
 *           application/json:
 *             example:
 *               message: Role Access Screen not found
 *       '500':
 *         description: Error updating Role Access Screen
 *         content:
 *           application/json:
 *             example:
 *               message: Error updating Role Access Screen
 */

/**
 * @swagger
 * /roleAccessScreens:
 *   delete:
 *     summary: Delete role access screens by their IDs
 *     tags:
 *       - Role Access Screens
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Array of Role Access Screen IDs to delete
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *           example:
 *             ids: ["Id1", "Id2"]
 *     responses:
 *       '200':
 *         description: Role access screens deleted successfully
 *         content:
 *           application/json:
 *             example: Role access screens deleted successfully
 *       '404':
 *         description: Role Access Screen not found
 *         content:
 *           application/json:
 *             example:
 *               message: Role Access Screen not found
 *       '500':
 *         description: Error deleting Role Access Screen
 *         content:
 *           application/json:
 *             example:
 *               message: Error deleting Role Access Screen
 */

async function createRoleAccessScreen(req, res, next) {
  try {
    const data = await RoleAccessScreen.createRoleAccessScreen(req.body)
    return res.status(201).json(data);
  }
  catch (err) {
    next(err)
  }
}

async function getRoleAccessScreen(req, res, next) {
  try {
    const { page, pageSize, RoleAccessScreenID } = req.query;
    const data = await RoleAccessScreen.getRoleAccessScreens(RoleAccessScreenID, page, pageSize)
    res.status(200).json(data)
  }
  catch (err) {
    next(err)
  }
}

// Controller to get a screen by its ID
async function getRoleAccessScreenById(req, res, next) {
  
  try {
    const { id } = req.params;
    const data = await RoleAccessScreen.getRoleAccessScreens(id)
    return res.status(200).json(data);
  }
  catch (err) {
    next(err)
  }
}

async function updateRoleAccessScreen(req, res, next) {
  try {
    const data = await RoleAccessScreen.updateRoleAccessScreen(req.params.id, req.body);

    return res.status(200).json(data);
  }
  catch (err) {
    next(err)
  }
}

async function deleteRoleAccessScreen(req, res, next) {
  try {
    const { id } = req.params;
    const result = await RoleAccessScreen.deleteRoleAccessScreens(req.body.ids);
    return res.status(204).send(); 
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createRoleAccessScreen,
  getRoleAccessScreen,
  getRoleAccessScreenById,
    updateRoleAccessScreen,
    deleteRoleAccessScreen
};
