const mongoose = require("mongoose");

const abonnementSchema = new mongoose.Schema(
  {
    tarif: {
      type: Number,
      required: true,
      min: 0, // tarif ne peut pas être négatif
    },
    type: {
      type: String,
      required: true,
      enum: ["mensuel", "trimestriel", "annuel"], // tu peux changer/ajouter les types possibles
    },
    isActive: { type: Boolean, default: true }, // abonnement actif ou pas
    isDeleted: { type: Boolean, default: false }, // logique de soft delete
  },
  { timestamps: true }
);
// Création du modèle
const Abonnement = mongoose.model("Abonnement", abonnementSchema);
module.exports = Abonnement;

