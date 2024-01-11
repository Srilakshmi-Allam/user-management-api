const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Connection');

const UserGroup = sequelize.define('UserGroup', {
  UserGroupID: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    field: 'user_group_id', // Map to the new column name in the database
  },
  UserGroupName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'user_group_name', // Map to the new column name in the database
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
  tableName: 'user_groups', // Alias the table name with snake_case
});

module.exports = UserGroup;
