const Categorie = require('../models/categorieModel.js');

// Récupérer toutes les catégories
module.exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.find({ isDeleted: false });
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter une catégorie
module.exports.addCategorie = async (req, res) => {
  try {
    const { typeIntervenant, description } = req.body;

    if (!typeIntervenant || !description) {
      throw new Error("typeIntervenant et description sont requis !");
    }

    const newCategorie = new Categorie({ typeIntervenant, description });
    const addedCategorie = await newCategorie.save();

    res.status(201).json(addedCategorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une catégorie par ID
module.exports.deleteCategorieById = async (req, res) => {
  try {
    const id = req.params.id;

    const checkIfExists = await Categorie.findById(id);
    if (!checkIfExists || checkIfExists.isDeleted) {
      throw new Error("Catégorie non trouvée !");
    }

    await Categorie.findByIdAndDelete(id);
    res.status(200).json("Catégorie supprimée");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.updateCategorie = async (req, res) => {
  try {
    //logique
    const id = req.params.id;
    const { description } = req.body;
    const updatedCategorie = await Categorie.findByIdAndUpdate(id, {
      $set: { description },
    });
    //const categorie = new categorieModel(req.body)
    res.status(200).json(updatedCategorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const User = require("../models/userModel");

module.exports.addCategorieWithUser = async (req, res) => {
  try {
    const { typeIntervenant, description, userID } = req.body;

    // Vérifier que l'utilisateur existe
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
        error: "Utilisateur non trouvé",
      });
    }

    // Créer la catégorie
    const newCategorie = new Categorie({
      typeIntervenant,
      description,
      user: userID
    });

    const savedCategorie = await newCategorie.save();

    // Ajouter la catégorie à l'utilisateur
    user.categories.push(savedCategorie._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Catégorie créée avec succès",
      data: savedCategorie
    });

  } catch (error) {
    console.error("Erreur lors de la création de la catégorie:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Erreur lors de la création de la catégorie",
      error: error.message
    });
  }
};
