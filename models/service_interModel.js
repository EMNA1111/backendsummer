const mongoose = require("mongoose");

const serviceInterSchema = new mongoose.Schema(
  {
    typeService: {  
      type: String,  
    },
    description: {  
      type: String,
      
    },
    prix: {  
      type: Number,
      required: true,
    },
    disponibilite: {   
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
     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceInter", serviceInterSchema);

