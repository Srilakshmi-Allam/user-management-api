const Role = require('../Services/Roles');
const errorMessages = require('../utils/ErrorMessages');

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new Role
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Roles'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Roles'
 *       500:
 *         description: Internal Server Error
 * 
 * components:
 *   schemas:
 *     Roles:
 *       type: object
 *       properties:
 *         RoleID:
 *           type: string
 *         RoleName:
 *           type: string
 *         UserGroupID:
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
 * /roles:
 *   get:
 *     summary: Get all Roles.
 *     tags:
 *       - Roles
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
 *         description: Successfully fetching the Roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Roles'
 *       '500':
 *         description: Error while fetching Roles
 *         content:
 *           application/json:
 *             example:
 *               message: Error while fetching Roles
*/

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get a Roles by its ID
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the Roles to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Roles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Roles'
 *       '404':
 *         description: Roles not found
 *       '500':
 *         description: Error fetching Roles
 *         content:
 *           application/json:
 *             example:
 *               message: Error fetching Roles
 */

/**
 * @swagger
 * /rolesWithModulesAndScreens/{roleId}:
 *   get:
 *     summary: Get a role with modules and screens by RoleID
 *     tags:
 *       - Role with modules and screens based on RoleID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         description: ID of the role to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Roles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Roles'
 *       '404':
 *         description: Roles not found
 *       '500':
 *         description: Error fetching Roles
 *         content:
 *           application/json:
 *             example:
 *               message: Error fetching Roles
 */

/**
 * @swagger
 * /roleByUserGroup/{userGroupId}:
 *   get:
 *     summary:  Get roles by UserGroupID
 *     tags:
 *       - Role by UserGroup
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userGroupId
 *         description: ID of the UserGroup to retrieve roles for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Roles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Roles'
 *       '404':
 *         description: No roles found for the specified UserGroupID
 *       '500':
 *         description: Error fetching Roles
 *         content:
 *           application/json:
 *             example:
 *               message: Error fetching Roles
 */

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update a Roles by ID
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the Roles to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated Roles object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Roles'
 *     responses:
 *       '200':
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Roles'
 *       '404':
 *         description: Role not found
 *         content:
 *           application/json:
 *             example:
 *               message: Role not found
 *       '500':
 *         description: Error updating Role
 *         content:
 *           application/json:
 *             example:
 *               message: Error updating Role
 */

async function createRole(req, res, next) {
  try {
    const data = await Role.createRole(req.body)
    return res.status(201).json(data);
  }
  catch (err) {
    next(err)
  }
}

async function getRoles(req, res, next) {
  try {
    const data = await Role.getRole(req, req.query)
    res.status(200).json(data)
  }
  catch (err) {
    next(err)
  }
}

// Controller to get a screen by its ID
async function getRoleById(req, res, next) {

  try {
    const { id } = req.params;
    const data = await Role.getRole(id)
    return res.status(200).json(data);
  }
  catch (err) {
    next(err)
  }
}

async function getAllRolesWithModulesScreensWithID(req, res, next) {

  try {
    const { roleId } = req.params;
    const data = await Role.getAllRolesWithModulesScreensWithID(roleId)
    return res.status(200).json(data);
  }
  catch (err) {
    next(err)
  }
}

async function getRoleByUserGroup(req, res, next) {

  try {
    const { userGroupId } = req.params;
    const data = await Role.getRoleByUserGroup(userGroupId)
    return res.status(200).json(data);
  }
  catch (err) {
    next(err)
  }
}

async function updateRole(req, res, next) {
  try {
    const data = await Role.updateRole(req.params.id, req.body);

    return res.status(200).json(data);
  }
  catch (err) {
    next(err)
  }
}


module.exports = {
  createRole,
  getRoles,
  getRoleById,
  getAllRolesWithModulesScreensWithID,
  getRoleByUserGroup,
  updateRole
};
