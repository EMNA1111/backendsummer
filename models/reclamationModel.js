const mongoose = require("mongoose");

const reclamationSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    statut: {   
      type: String,
      enum: ["en_attente", "traitée", "résolue"],
      default: "en_attente",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Reclamation = mongoose.model("Reclamation", reclamationSchema);
module.exports = Reclamation;
