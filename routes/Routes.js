const express = require('express');

const { userGroupController,
    userController,
    screenController,
    roleController,
    RoleAccessScreenController,
    ModuleController,
    AuditController,
    AuthUpdatePassword,
} = require('../Controllers')


const { checkJwt, customErrorHandler } = require('../utils/Auth'); // Import the checkJwt middleware

const router = express.Router();

router.use(checkJwt)

router.put('/updatePassword/:email/:newPassword', AuthUpdatePassword.updatePassword);
router.put('/resetPassword/:email', AuthUpdatePassword.resetPassword);

router.post('/userGroups', userGroupController.createUserGroup);
router.get('/userGroups', userGroupController.getUserGroups)
router.get('/userGroupsPagination', userGroupController.getUserGroupPagination)
router.get('/userGroups/:id', userGroupController.getUserGroupById);
router.put('/userGroups/:id', userGroupController.updateUserGroups);

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers)
router.get('/usersById/:id', userController.getUserById);
router.get('/usersByEmail/:email', userController.getUserByEmail);
router.put('/users/:id', userController.updateUsers);

router.post('/screens', screenController.createScreen);
router.get('/screens', screenController.getScreen);
router.get('/screensPagination', screenController.getScreenPagination);
router.get('/screens/:id', screenController.getScreenById);
router.put('/screens/:id', screenController.updateScreen);
router.get('/userScreens/:userEmail', screenController.getUserScreens);

router.post('/roles', roleController.createRole);
router.get('/roles', roleController.getRoles);
router.get('/roles/:id', roleController.getRoleById);
router.get('/roleByUserGroup/:userGroupId', roleController.getRoleByUserGroup);
router.get('/rolesWithModulesAndScreens/:roleId', roleController.getAllRolesWithModulesScreensWithID);
router.put('/roles/:id', roleController.updateRole);

router.post('/roleAccessScreens', RoleAccessScreenController.createRoleAccessScreen);
router.get('/roleAccessScreens', RoleAccessScreenController.getRoleAccessScreen);
router.get('/roleAccessScreens/:id', RoleAccessScreenController.getRoleAccessScreenById);
router.put('/roleAccessScreens/:id', RoleAccessScreenController.updateRoleAccessScreen);
router.delete('/roleAccessScreens', RoleAccessScreenController.deleteRoleAccessScreen)

router.post('/modules', ModuleController.createModule);
router.get('/modules', ModuleController.getModule);
router.get('/modules/:id', ModuleController.getModuleById);
router.put('/modules/:id', ModuleController.updateModule);




router.post('/audit', AuditController.createAudit);


router.use(customErrorHandler);


module.exports = router;
