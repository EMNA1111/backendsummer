const mongoose = require("mongoose");

const categorieSchema = new mongoose.Schema(
  {
    typeIntervenant: {  
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Categorie = mongoose.model("Categorie", categorieSchema);
module.exports = Categorie;
