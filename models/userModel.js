import Sequelize from "sequelize";
import sequelize from "./index";

const UserDetail = sequelize.define("UserDetails", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    contact: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
}, {
    tableName: 'user_details',
    schema: 'public',
    timestamps: false,
    freezeTableName: true
});

export default UserDetail;
