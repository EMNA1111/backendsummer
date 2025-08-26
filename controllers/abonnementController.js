const Abonnement = require('../models/abonnementModel.js');

// Récupérer tous les abonnements
module.exports.getAllAbonnements = async (req, res) => {
  try {
    const abonnements = await Abonnement.find();
    res.status(200).json({ abonnements });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un abonnement
module.exports.addAbonnement = async (req, res) => {
  try {
    const { tarif, type } = req.body;
    console.log("req.body", req.body);

    const abonnement = new Abonnement({ tarif, type });
    const addedAbonnement = await abonnement.save();

    res.status(200).json(addedAbonnement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Supprimer un abonnement par ID
module.exports.deleteAbonnementById = async (req, res) => {
  try {
    const id = req.params.id;
    const checkIfExists = await Abonnement.findById(id);

    if (!checkIfExists) {
      throw new Error("Abonnement non trouvé !");
    }

    await Abonnement.findByIdAndDelete(id);
    res.status(200).json("Abonnement supprimé");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAbonnementById = async (req, res) => {
  try {
    const id = req.params.id; // récupération de l'id dans l'URL

    const abonnement = await Abonnement.findById(id);

    if (!abonnement) {
      return res.status(404).json({ message: "Abonnement non trouvé" });
    }

    res.status(200).json({ abonnement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.updateAbonnement = async (req, res) => {
  try {
    //logique
    const id = req.params.id;
    const { tarif, type } = req.body;
    const updatedAbonnement = await Abonnement.findByIdAndUpdate(id, {
      $set: { tarif, type },
    });
    //const abonnement = new abonnementModel(req.body)
    res.status(200).json(updatedAbonnement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const User = require("../models/userModel.js");

module.exports.addAbonnementWithUser = async (req, res) => {
  try {
    const { tarif, type, userID } = req.body;

    // Vérifier que l'utilisateur existe
    const user = await User.findById(userID);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Créer le nouvel abonnement
    const newAbonnement = new Abonnement({
      tarif,
      type,
      user: userID
    });

    const savedAbonnement = await newAbonnement.save();

    // Ajouter l'abonnement à l'utilisateur
    await User.findByIdAndUpdate(userID, {
      $push: { abonnements: savedAbonnement._id }
    });

    // Réponse au client
    res.status(201).json({
      success: true,
      message: "Abonnement créé avec succès",
      data: savedAbonnement
    });

  } catch (error) {
    console.error("Erreur lors de la création de l'abonnement:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Erreur lors de la création de l'abonnement",
      error: error.message
    });
  }
};
