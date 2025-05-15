import { DataTypes } from "sequelize";
import sequelize from "../../db/db.config.js";
import Booking from "./bookingVehicleModls.js";

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  booking_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Booking, key: "id" },
  },

  paid_by_type: {
    type: DataTypes.ENUM("User", "Host"),
    allowNull: false,
  },

  paid_by_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Online",
  },

  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  admin_commission: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
  },

  final_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  payment_status: {
    type: DataTypes.ENUM("Pending", "Completed", "Failed"),
    defaultValue: "Pending",
  },

  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Only keep necessary relationship
Booking.hasMany(Payment, { foreignKey: "booking_id", onDelete: "CASCADE" });
Payment.belongsTo(Booking, { foreignKey: "booking_id" });

export default Payment;
