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
