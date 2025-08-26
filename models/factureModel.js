const mongoose = require("mongoose");

const factureSchema = new mongoose.Schema(
  {
    nomClient: {
      type: String,
      required: true,
    },
    montant: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    paiement: { type: mongoose.Schema.Types.ObjectId, ref: "Paiement", required: true },
  },
  { timestamps: true }
);


const Facture = mongoose.model("Facture", factureSchema);
module.exports = Facture;
