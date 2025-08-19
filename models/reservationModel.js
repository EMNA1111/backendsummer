const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    statutReservation: { 
      type: String, 
      enum: ["en_attente", "confirmée", "annulée"], 
      default: "en_attente" 
    },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
