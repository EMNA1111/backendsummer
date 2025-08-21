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
