import { DataTypes } from "sequelize";
import sequelize from "../../db/db.config.js";
import Vehicle from "./vehicleModels.js";

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  vehicle_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Vehicle, key: "id" },
  },
  booked_by_type: {
    type: DataTypes.ENUM("User", "Admin", "Host"),
    allowNull: false,
  },
  booked_by_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_status: {
    type: DataTypes.STRING,
      defaultValue: "Paid",
  },
  status: {
    type: DataTypes.ENUM("Booked"),
    defaultValue: "Booked",
  },
});

// Only define the necessary relationship
Vehicle.hasMany(Booking, { foreignKey: "vehicle_id", onDelete: "CASCADE" });
Booking.belongsTo(Vehicle, { foreignKey: "vehicle_id" });

export default Booking;
