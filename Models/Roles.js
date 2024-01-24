const { DataTypes } = require('sequelize');
const UserGroup = require('../Models/UserGroups');
const RoleAccessScreen = require('../Models/RoleAccessScreens');

const Role = global.sequelize.define('Role', {
  RoleID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    field: 'role_id', // Map to the new column name in the database
  },
  UserGroupID: {
    type: DataTypes.STRING,
    references: {
      model: UserGroup,
      key: 'UserGroupID',
    },
    field: 'user_group_id', // Map to the new column name in the database
  },
  RoleName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'role_name', // Map to the new column name in the database
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
  tableName: 'roles', // Alias the table name with snake_case
});

Role.belongsTo(UserGroup, { foreignKey: 'UserGroupID' });
Role.hasMany(RoleAccessScreen, { foreignKey: 'RoleID' });

module.exports = Role;
