import { DataTypes } from "sequelize";
import sequelize from "../../db/db.config.js";
import User from "./dataTables.js"; // Import User model

const Vehicle = sequelize.define("Vehicle", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    vehicle_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    license_plate: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    price_per_day: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },

    brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    owner_type: {
        type: DataTypes.ENUM("Admin", "Host"),
        allowNull: false,
    },

    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Pending", "Available", "Booked", "Maintenance", "Cancelled"),  
        defaultValue: "Pending",
    },
});


User.hasMany(Vehicle, { foreignKey: "owner_id"} );
Vehicle.belongsTo(User, { foreignKey: "owner_id" });

export default Vehicle;
