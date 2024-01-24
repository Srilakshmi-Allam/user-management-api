const { DataTypes } = require('sequelize');
const Module = require('../Models/Modules');

const Screen = global.sequelize.define('Screen', {
    ScreenID: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: 'screen_id', // Map to the new column name in the database
    },
    ScreenName: {
        type: DataTypes.STRING,
        field: 'screen_name', // Map to the new column name in the database
    },
    ScreenURL: {
        type: DataTypes.STRING,
        field: 'screen_url', // Map to the new column name in the database
    },
    ScreenActive: {
        type: DataTypes.BOOLEAN,
        field: 'screen_active', // Map to the new column name in the database
    },
    ScreenOrder: {
        type: DataTypes.INTEGER,
        field: 'screen_order', // Map to the new column name in the database
    },
    ModuleID: {
        type: DataTypes.STRING,
        references: {
            model: Module,
            key: 'ModuleID',
        },
        field: 'module_id', // Map to the new column name in the database
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
    tableName: 'screens', // Alias the table name with snake_case
});

Screen.belongsTo(Module, { foreignKey: 'ModuleID' });

module.exports = Screen;
