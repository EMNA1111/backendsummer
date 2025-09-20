const Reclamation = require('../models/reclamationModel.js');


module.exports.getAllReclamations = async (req, res) => {
  try {
    const reclamations = await Reclamation.find({ isDeleted: false });
    res.status(200).json({ reclamations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/*module.exports.addReclamation = async (req, res) => {
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
};*/


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
// Récupérer une réclamation par ID
module.exports.getReclamationById = async (req, res) => {
  try {
    const id = req.params.id;

    const reclamation = await Reclamation.findById(id);

    if (!reclamation) {
      return res.status(404).json({ message: "Réclamation non trouvée" });
    }

    res.status(200).json({ reclamation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.updateReclamation = async (req, res) => {
  try {
    //logique
    const id = req.params.id;
    const { statut } = req.body;
    const updatedReclamation = await Reclamation.findByIdAndUpdate(id, {
      $set: { statut },
    });
    //const reclamation = new reclamationModel(req.body)
    res.status(200).json(updatedReclamation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const User = require('../models/userModel.js');

module.exports.addReclamationWithUser = async (req, res) => {
  try {
    const { description, userID } = req.body;

    // Vérifier que l'utilisateur existe
    const user = await User.findById(userID);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Créer la nouvelle réclamation
    const newReclamation = new Reclamation({
      description,
      user: userID
    });

    const savedReclamation = await newReclamation.save();

    // Ajouter la réclamation à l'utilisateur
    await User.findByIdAndUpdate(userID, {
      $push: { reclamations: savedReclamation._id }
    });

    res.status(201).json({
      success: true,
      message: "Réclamation créée avec succès",
      data: savedReclamation
    });

  } catch (error) {
    console.error("Erreur lors de la création de la réclamation:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Erreur lors de la création de la réclamation",
      error: error.message
    });
  }
};








