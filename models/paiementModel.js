const mongoose = require("mongoose");

const paiementSchema = new mongoose.Schema(
  {
    modePaiement: { 
      type: String, 
      required: true, 
      enum: ["carte", "paypal", "virement"] // adapte selon tes besoins
    },
    statutPaiement: { 
      type: String, 
      required: true, 
      enum: ["en_attente", "effectué", "échoué"], // adapte selon tes besoins
      default: "en_attente"
    }
  },
  { timestamps: true }
);

const Paiement = mongoose.model("Paiement", paiementSchema);
module.exports = Paiement;
