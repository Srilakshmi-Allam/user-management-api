const Screen = require('../Services/Screens');
const User = require('../Models/Users')

/**
 * @swagger
 * /screens:
 *   post:
 *     summary: Create a new Screen
 *     tags:
 *       - Screens
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Screens'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screens'
 *       500:
 *         description: Internal Server Error
 * 
 * components:
 *   schemas:
 *     Screens:
 *       type: object
 *       properties:
 *         ScreenID:
 *           type: string
 *         ScreenName:
 *           type: string
 *         ScreenURL:
 *           type: string
 *         ScreenActive:
 *           type: boolean
 *         ScreenOrder:
 *           type: integer
 *         ModuleID:
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
 * /screensPagination:
 *   get:
 *     summary: Get all Screens.
 *     tags:
 *       - Screens
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
 *         description: Successfully fetching the Screens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Screens'
 *       '500':
 *         description: Error while fetching Screens
 *         content:
 *           application/json:
 *             example:
 *               message: Error while fetching Screens
*/

/**
 * @swagger
 * /screens:
 *   get:
 *     summary: Get all Screens.
 *     tags:
 *       - Screens
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetching the Screens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Screens'
 *       '500':
 *         description: Error while fetching Screens
 *         content:
 *           application/json:
 *             example:
 *               message: Error while fetching Screens
*/

/**
 * @swagger
 * /screens/{id}:
 *   get:
 *     summary: Get a Screens by its ID
 *     tags:
 *       - Screens
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the Screens to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Screens retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screens'
 *       '404':
 *         description: Screens not found
 *       '500':
 *         description: Error fetching Screens
 *         content:
 *           application/json:
 *             example:
 *               message: Error fetching Screens
 */

/**
 * @swagger
 * /userScreens/{userEmail}:
 *   get:
 *     summary: Get all screens displayed to the user ordered by module and screen
 *     tags:
 *       - UserScreens by modules and screens
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userEmail
 *         description: Email of the Screens to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Screens retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screens'
 *       '404':
 *         description: Screens not found
 *       '500':
 *         description: Error fetching Screens
 *         content:
 *           application/json:
 *             example:
 *               message: Error fetching Screens
 */

/**
 * @swagger
 * /screens/{id}:
 *   put:
 *     summary: Update a Screens by ID
 *     tags:
 *       - Screens
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the Screens to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated Screens object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Screens'
 *     responses:
 *       '200':
 *         description: Screens updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screens'
 *       '404':
 *         description: Screen not found
 *         content:
 *           application/json:
 *             example:
 *               message: Screen not found
 *       '500':
 *         description: Error updating Screen
 *         content:
 *           application/json:
 *             example:
 *               message: Error updating Screen
 */

async function createScreen(req, res, next) {
  try {
    const data = await Screen.createScreen(req.body)
    return res.status(201).json(data);
  }
  catch (err) {
    next(err)
  }
}

async function getScreenPagination(req, res, next) {
  try {
    const data = await Screen.getScreenPagination(req, req.query)
    res.status(200).json(data)
  }
  catch (err) {
    next(err)
  }
}

async function getScreen(req, res, next) {
  try {
    const { ScreenID } = req.query;
    const data = await Screen.getScreen(ScreenID)
    res.status(200).json(data)
  }
  catch (err) {
    next(err)
  }
}

// Controller to get a screen by its ID
async function getScreenById(req, res, next) {

  try {
    const { id } = req.params;
    const data = await Screen.getScreenById(id)
    return res.status(200).json(data);
  }
  catch (err) {
    next(err)
  }
}

async function getUserScreens(req, res, next) {

  try {
    const { userEmail } = req.params;
    const data = await Screen.getUserScreens(userEmail)
    return res.status(200).json(data);
  }
  catch (err) {
    next(err)
  }
}

async function updateScreen(req, res, next) {
  try {
    const data = await Screen.updateScreen(req.params.id, req.body);

    return res.status(200).json(data);
  }
  catch (err) {
    next(err)
  }
}

module.exports = {
  getScreenPagination,
  createScreen,
  getScreen,
  getScreenById,
  getUserScreens,
  updateScreen,
};
