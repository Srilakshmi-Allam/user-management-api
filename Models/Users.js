const { DataTypes } = require('sequelize');
const UserGroup = require('../Models/UserGroups');
const Role = require('../Models/Roles');
const RoleAccessScreen = require('../Models/RoleAccessScreens');

const User = global.sequelize.define('User', {
    UserID: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: 'user_id', // Map to the new column name in the database
    },
    UserEmail: {
        type: DataTypes.STRING,
        field: 'user_email', // Map to the new column name in the database
    },
    FirstName: {
        type: DataTypes.STRING,
        field: 'first_name', // Map to the new column name in the database
    },
    LastName: {
        type: DataTypes.STRING,
        field: 'last_name', // Map to the new column name in the database
    },
    UserHomePage: {
        type: DataTypes.STRING,
        field: 'user_home_page', // Map to the new column name in the database
    },
    AccountLocked: {
        type: DataTypes.BOOLEAN,
        field: 'account_locked', // Map to the new column name in the database
    },
    RequirePasswordChange: {
        type: DataTypes.BOOLEAN,
        field: 'require_password_change', // Map to the new column name in the database
    },
    UserGroupID: {
        type: DataTypes.STRING,
        references: {
            model: UserGroup,
            key: 'UserGroupID',
        },
        field: 'user_group_id', // Map to the new column name in the database
    },
    RoleID: {
        type: DataTypes.STRING,
        references: {
            model: Role,
            key: 'RoleID',
        },
        field: 'role_id', // Map to the new column name in the database
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    updated_by: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true,
    createdAt: 'created_at', // Map to the new column name in the database
    updatedAt: 'updated_at', // Map to the new column name in the database
    tableName: 'users', // Alias the table name with snake_case
});

User.belongsTo(UserGroup, { foreignKey: 'UserGroupID', as: 'UserGroup' });
User.belongsTo(Role, { foreignKey: 'RoleID' });
User.belongsTo(RoleAccessScreen, { foreignKey: 'RoleID', targetKey: 'RoleID' });

module.exports = User;
