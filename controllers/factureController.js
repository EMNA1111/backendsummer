const Facture = require('../models/factureModel.js');

// Récupérer toutes les factures
module.exports.getAllFacture = async (req, res) => {
  try {
    const factures = await Facture.find({ isDeleted: false });
    res.status(200).json({ factures });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter une facture
module.exports.addFacture = async (req, res) => {
  try {
    const { nomClient, montant } = req.body;

    if (!nomClient || montant == null) {
      throw new Error("nomClient et montant sont requis !");
    }

    const newFacture = new Facture({ nomClient, montant });
    const addedFacture = await newFacture.save();

    res.status(201).json(addedFacture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une facture par ID
module.exports.deleteFactureById = async (req, res) => {
  try {
    const id = req.params.id;

    const checkIfExists = await Facture.findById(id);
    if (!checkIfExists || checkIfExists.isDeleted) {
      throw new Error("Facture non trouvée !");
    }

    await Facture.findByIdAndDelete(id);

    res.status(200).json("Facture supprimée");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
