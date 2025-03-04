import { DataTypes } from "sequelize";
import sequelize from "../../db/db.config.js";

const User = sequelize.define("user", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true, 
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contact: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    address: { 
        type: DataTypes.STRING,
        allowNull: true, // Admin might not have an address
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("User", "Host", "Admin"),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Active", "Suspended"),
        defaultValue: "Active",
    },
   
}, {
    timestamps: true,
});

sequelize.sync()
    .then(() => console.log("User table created or updated"))
    .catch(error => console.log("Error:", error));

export default User;
