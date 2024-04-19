import Sequelize from "sequelize";
import sequelize from "./index";

const ConfigModel = sequelize.define("ConfigModel", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    displayName: {
        type: Sequelize.STRING(50),
        field:"name",
        allowNull: false
    },
    parentId: {
        type: Sequelize.INTEGER,
        field: "parentid",
        allowNull: false
    },
    entityUrl: {
        type: Sequelize.STRING(250),
        field: "entityurl",
        allowNull: false
    },
    isActive: {
        type: Sequelize.INTEGER,
        field: "isactive",
        allowNull: false
    },
    orgId: {
        type: Sequelize.INTEGER,
        field: "orgid",
        allowNull: false
    },
    iconName: {
        type: Sequelize.STRING(250),
        field: "iconname",
        allowNull: false
    },
    displayOrder: {
        type: Sequelize.INTEGER,
        field: "displayorder",
        allowNull: false
    },
    isDeleted: {
        type: Sequelize.INTEGER,
        field: "isdeleted",
        allowNull: false
    },
}, {
    tableName: 'menuheirarcy',
    schema: 'public',
    timestamps: false,
    freezeTableName: true
});

export default ConfigModel;
