const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    statutReservation: { 
      type: String, 
      enum: ["en_attente", "confirmée", "annulée"], 
      default: "en_attente" 
    },
    isDeleted: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
