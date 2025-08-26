const mongoose = require("mongoose");

const paiementSchema = new mongoose.Schema(
  {
    modePaiement: {
      type: String,
      required: true,
      enum: ["carte", "paypal", "virement"]
    },
    statutPaiement: {
      type: String,
      required: true,
      enum: ["en_attente", "effectué", "échoué"],
      default: "en_attente"
    },
    factures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Facture" }]
  },
  { timestamps: true }
);

const Paiement = mongoose.model("Paiement", paiementSchema);
module.exports = Paiement;
