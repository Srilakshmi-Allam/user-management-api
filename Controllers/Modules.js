const Module = require('../Services/Modules');

/**
 * @swagger
 * /modules:
 *   post:
 *     summary: Create a new Module
 *     tags:
 *       - Modules
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Modules'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Modules'
 *       500:
 *         description: Internal Server Error
 * 
 * components:
 *   schemas:
 *     Modules:
 *       type: object
 *       properties:
 *         ModuleID:
 *           type: string
 *         ModuleName:
 *           type: string
 *         ModuleIcon:
 *           type: string
 *         UserGroupID:
 *           type: string
 *         ModuleActive:
 *           type: boolean
 *         ModuleOrder:
 *           type: integer
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
 * /modules:
 *   get:
 *     summary: Get all Modules.
 *     tags:
 *       - Modules
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
 *         description: Successfully fetching the Modules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Modules'
 *       '500':
 *         description: Error while fetching Modules
 *         content:
 *           application/json:
 *             example:
 *               message: Error while fetching Modules
*/

/**
 * @swagger
 * /modules/{id}:
 *   get:
 *     summary: Get a Module by its ID
 *     tags:
 *       - Modules
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the Module to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Module retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Modules'
 *       '404':
 *         description: Module not found
 *       '500':
 *         description: Error fetching Module
 *         content:
 *           application/json:
 *             example:
 *               message: Error fetching Module
 */

/**
 * @swagger
 * /modules/{id}:
 *   put:
 *     summary: Update a Module by ID
 *     tags:
 *       - Modules
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the Module to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated Module object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Modules'
 *     responses:
 *       '200':
 *         description: Module updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Modules'
 *       '404':
 *         description: Module not found
 *         content:
 *           application/json:
 *             example:
 *               message: Module not found
 *       '500':
 *         description: Error updating Module
 *         content:
 *           application/json:
 *             example:
 *               message: Error updating Module
 */

async function createModule(req, res, next) {
  try {
    const data = await Module.createModule(req.body)
    return res.status(201).json(data);
  }
  catch (err) {
    next(err)
  }
}

async function getModule(req, res, next) {
  try {
    const data = await Module.getModule(req, req.query)
    res.status(200).json(data)
  }
  catch (err) {
    next(err)
  }
}

// Controller to get a screen by its ID
async function getModuleById(req, res, next) {

  try {
    const { id } = req.params;
    const data = await Module.getModuleById(id)
    return res.status(200).json(data);
  }
  catch (err) {
    next(err)
  }
}

async function updateModule(req, res, next) {
  try {
    const data = await Module.updateModule(req.params.id, req.body);
    return res.status(200).json(data);
  }
  catch (err) {
    next(err)
  }
}

module.exports = {
  createModule,
  getModule,
  getModuleById,
  updateModule
};
