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
// Récupérer une facture par ID
module.exports.getFactureById = async (req, res) => {
  try {
    const id = req.params.id;

    const facture = await Facture.findById(id); // 👈 utilise bien "factureModel"

    if (!facture) {
      return res.status(404).json({ message: "Facture non trouvée" });
    }

    res.status(200).json({ facture });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Récupérer les factures triées par montant (ordre croissant)
module.exports.getOrderFactureByMontant = async (req, res) => {
  try {
    
    const factureList = await Facture.find({ isDeleted: false }).sort({ montant: 1 });

    res.status(200).json({ factureList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.updateFacture = async (req, res) => {
  try {
    //logique
    const id = req.params.id;
    const { nomClient, montant } = req.body;
    const updatedFacture = await Facture.findByIdAndUpdate(id, {
      $set: { nomClient, montant },
    });
    //const facture = new factureModel(req.body)
    res.status(200).json(updatedFacture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
