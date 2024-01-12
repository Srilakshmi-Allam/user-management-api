const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Connection');
const UserGroup = require('../Models/UserGroups');

const Module = sequelize.define('Module', {
    ModuleID: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: 'module_id', // Map to the new column name in the database
    },
    ModuleName: {
        type: DataTypes.STRING,
        field: 'module_name', // Map to the new column name in the database
    },
    ModuleIcon: {
        type: DataTypes.STRING,
        field: 'module_icon', // Map to the new column name in the database
    },
    UserGroupID: {
        type: DataTypes.STRING,
        references: {
            model: UserGroup,
            key: 'UserGroupID',
        },
        field: 'user_group_id', // Map to the new column name in the database
    },
    ModuleActive: {
        type: DataTypes.BOOLEAN,
        field: 'module_active', // Map to the new column name in the database
    },
    ModuleOrder: {
        type: DataTypes.INTEGER,
        field: 'module_order', // Map to the new column name in the database
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
    tableName: 'modules', // Alias the table name with snake_case
});

module.exports = Module;
