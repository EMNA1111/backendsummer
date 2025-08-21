const Reclamation = require('../models/reclamationModel.js');


module.exports.getAllReclamations = async (req, res) => {
  try {
    const reclamations = await Reclamation.find({ isDeleted: false });
    res.status(200).json({ reclamations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.addReclamation = async (req, res) => {
  try {
    const { description, statut } = req.body;

    if (!description) {
      throw new Error("La description est requise !");
    }

    const newReclamation = new Reclamation({ description, statut });
    const addedReclamation = await newReclamation.save();

    res.status(201).json(addedReclamation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.deleteReclamationById = async (req, res) => {
  try {
    const id = req.params.id;

    const checkIfExists = await Reclamation.findById(id);
    if (!checkIfExists || checkIfExists.isDeleted) {
      throw new Error("Réclamation non trouvée !");
    }

    await Reclamation.findByIdAndDelete(id);
    res.status(200).json("Réclamation supprimée");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



