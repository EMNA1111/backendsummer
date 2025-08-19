const mongoose = require("mongoose");

const serviceInterSchema = new mongoose.Schema(
  {
    typeService: {  // Exemple: "Ménage", "Babysitting", "Aide aux personnes âgées"
      type: String,
      
    },
    description: {  // Exemple: "2h de ménage complet", "Garde enfant de 3 ans"
      type: String,
      
    },
    prix: {   // Tarif horaire ou forfait
      type: Number,
      required: true,
    },
    disponibilite: {   // Exemple: "Lundi au Vendredi, 8h-18h"
      type: String,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceInter", serviceInterSchema);

