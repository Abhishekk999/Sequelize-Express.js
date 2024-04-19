import Sequelize from "sequelize";
import sequelize from "./index";

const UserMaster = sequelize.define("UserMaster", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement : true,     
        primaryKey: true, 
    },
    userName: {
        type: Sequelize.STRING(50),
        field: 'username',
        allowNull: false
    },
    displayName: {
        type: Sequelize.STRING(50),
        field:"displayname",
        allowNull: true
    },
    emailId: {
        type: Sequelize.STRING(50),
        field:"emailid",
        allowNull: false
    },
    mobileNo: {
        type: Sequelize.STRING(50),
        field:"mobileno",
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    org_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    user_org_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    createdon: {
        type: Sequelize.DATE,
        allowNull: true
    },
    createdby: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    updatedon: {
        type: Sequelize.DATE,
        allowNull: true
    },
    updatedby: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    isdeleted: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    deletedon: {
        type: Sequelize.DATE,
        allowNull: true
    },
    deletedby: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'user_master',
    schema: 'public',
    timestamps: false,
    freezeTableName: true
});

export default UserMaster;
