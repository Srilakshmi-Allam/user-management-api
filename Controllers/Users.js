const User = require("../Services/Users");

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new User
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Internal Server Error
 *
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         UserID:
 *           type: string
 *         UserEmail:
 *           type: string
 *         FirstName:
 *           type: string
 *         LastName:
 *           type: string
 *         UserHomePage:
 *           type: string
 *         AccountLocked:
 *           type: boolean
 *         RequirePasswordChange:
 *           type: boolean
 *         UserGroupID:
 *           type: string
 *         RoleID:
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
 * /users:
 *   get:
 *     summary: Get all Users.
 *     tags:
 *       - Users
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
 *         description: Successfully fetching the Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 *       '500':
 *         description: Error while fetching Users
 *         content:
 *           application/json:
 *             example:
 *               message: Error while fetching Users
 */

/**
 * @swagger
 * /usersById/{id}:
 *   get:
 *     summary: Get a Users by its ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the Users to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       '404':
 *         description: Users not found
 *       '500':
 *         description: Error fetching Users
 *         content:
 *           application/json:
 *             example:
 *               message: Error fetching Users
 */

/**
 * @swagger
 * /usersByEmail/{email}:
 *   get:
 *     summary: Get a Users by its email
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         description: email of the Users to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       '404':
 *         description: Users not found
 *       '500':
 *         description: Error fetching Users
 *         content:
 *           application/json:
 *             example:
 *               message: Error fetching Users
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a Users by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id of the Users to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated Users object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: User not found
 *       '500':
 *         description: Error updating User
 *         content:
 *           application/json:
 *             example:
 *               message: Error updating User
 */

async function createUser(req, res, next) {
  try {
    const data = await User.createUser(req.body);
    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    const data = await User.getUser(req, req.query);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

// Controller to get a screen by its ID
async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    const data = await User.getUserById(id);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function getUserByEmail(req, res, next) {
  try {
    const { email } = req.params;
    const data = await User.getUserByEmail(email);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function updateUsers(req, res, next) {
  try {
    const data = await User.updateUser(req.params.id, req.body);

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function getUserCountChanges(req, res, next) {
  try {
    const data = await User.getUserCountChanges();
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

async function getUserPieChanges(req, res, next) {
  try {
    const data = await User.getUserPieChanges();
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUsers,
  getUserCountChanges,
  getUserPieChanges,
};
