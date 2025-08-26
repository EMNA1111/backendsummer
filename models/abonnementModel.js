const mongoose = require("mongoose");


const abonnementSchema = new mongoose.Schema(
  {
    tarif: {
      type: Number,
      required: true,
      

    },
    type: {
      type: String,
      required: true,
      enum: ["mensuel", "trimestriel", "annuel"], 
    },
    isActive: { type: Boolean, default: true }, 
    isDeleted: { type: Boolean, default: false }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  },
  { timestamps: true }
);

const Abonnement = mongoose.model("Abonnement", abonnementSchema);
module.exports = Abonnement;

