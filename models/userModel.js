const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: false,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: { type: String, require: true, minlength: 6 },
    role: { type: String, enum: ["client", "admin", "intervenant_domicile", "prof"] },
    // Relations Admin ↔ Intervenants
    intervenants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // pour Admin
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image_User: { type: String, default: "client.png" },
    cv_User: { type: String },
    age: Number,

    statu: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isBloked: { type: Boolean, default: false },
    abonnements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Abonnement" }],
    reclamations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reclamation" }],
    reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "serviceInter" }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categorie" }],
    paiements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Paiement" }],




  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const User = this;
    User.password = await bcrypt.hash(User.password, salt);
    // User.statu = false
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.statics.login = async function (email,password) {
  try {
    const user = await this.findOne({email})
    if(user){
      const auth = await bcrypt.compare(password,user.password)
      if(auth){
        // if(user.etat == false){
        //   throw new Error("compte desactive");          
        // }
        // if(user.ban == false){
        //   throw new Error("compte banned");          
        // }
        return user
      }
      throw new Error("incorrect password");      
    }
    throw new Error("incorrect email");
    
  } catch (error) {
    throw new Error("probleme login");    
  }
}

const User = mongoose.model("User", userSchema);
module.exports = User;
