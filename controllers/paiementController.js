const Paiement = require('../models/paiementModel.js');

// Récupérer tous les paiements
module.exports.getAllPaiements = async (req, res) => {
  try {
    const paiements = await Paiement.find();
    res.status(200).json({ paiements });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un paiement
module.exports.addPaiement = async (req, res) => {
  try {
    const { modePaiement, statutPaiement } = req.body;
    console.log("req.body", req.body);

    const paiement = new Paiement({ modePaiement, statutPaiement });
    const addedPaiement = await paiement.save();

    res.status(200).json(addedPaiement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un paiement par ID
module.exports.deletePaiementById = async (req, res) => {
  try {
    const id = req.params.id;
    const checkIfExists = await Paiement.findById(id);

    if (!checkIfExists) {
      throw new Error("Paiement non trouvé !");
    }

    await Paiement.findByIdAndDelete(id);
    res.status(200).json("Paiement supprimé");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
