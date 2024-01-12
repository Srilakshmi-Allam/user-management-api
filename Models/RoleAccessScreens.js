const { DataTypes } = require('sequelize');
const sequelize = require('../Config/Connection');
const Role = require('../Models/Roles');
const Screen = require('../Models/Screens');

const RoleAccessScreen = sequelize.define('RoleAccessScreen', {
    RoleAccessScreenID: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: 'role_access_screen_id', // Map to the new column name in the database
    },
    RoleID: {
        type: DataTypes.STRING,
        references: {
            model: Role,
            key: 'RoleID',
        },
        field: 'role_id', // Map to the new column name in the database
    },
    ScreenID: {
        type: DataTypes.STRING,
        references: {
            model: Screen,
            key: 'ScreenID',
        },
        field: 'screen_id', // Map to the new column name in the database
    },
}, {
    timestamps: false,
    tableName: 'role_access_screens', // Alias the table name with snake_case
});

RoleAccessScreen.belongsTo(Screen, { foreignKey: 'ScreenID' });

module.exports = RoleAccessScreen;
