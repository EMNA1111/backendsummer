const serviceInterModel = require('../models/service_interModel.js');

module.exports.getAllServiceInter = async (req, res) => {
  try {
    // logique
    const services = await serviceInterModel.find({ isDeleted: false });
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getServiceInterById = async (req, res) => {
  try {
    // logique
    const id = req.params.id;
    const service = await serviceInterModel.findById(id);

    if (!service || service.isDeleted) {
      throw new Error("Service introuvable !");
    }

    res.status(200).json({ service });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addServiceInter = async (req, res) => {
  try {
    // logique
    const { typeService, description, prix } = req.body;
    console.log("req.body", req.body);


    const newService = new serviceInterModel({  typeService, description, prix });
    const addedService = await newService.save();

    res.status(200).json(addedService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Supprimer un service intervenant par ID
module.exports.deleteServiceInterById = async (req, res) => {
  try {
    const id = req.params.id;

    // Vérifier si le service existe
    const checkIfExists = await serviceInterModel.findById(id);
    if (!checkIfExists || checkIfExists.isDeleted) {
      throw new Error("ServiceInter non trouvé !");
    }

    // Supprimer le service
    await serviceInterModel.findByIdAndDelete(id);

    res.status(200).json("ServiceInter supprimé");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.updateServiceInter = async (req, res) => {
  try {
    //logique
    const id = req.params.id;
    const { description, prix, disponibilite } = req.body;

    const updatedServiceInter = await serviceInterModel.findByIdAndUpdate(
      id,
      {
        $set: { description, prix, disponibilite },
      }
    );
    //const service = new serviceInterModel(req.body)
    res.status(200).json(updatedServiceInter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const User = require('../models/userModel.js');

module.exports.addServiceWithUser = async (req, res) => {
  try {
    const { typeService, description, prix, disponibilite, userID } = req.body;

    // Vérifier que l'utilisateur existe
    const user = await User.findById(userID);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Créer le nouveau service
    const newService = new serviceInterModel({
      typeService,
      description,
      prix,
      disponibilite
    });

    const savedService = await newService.save();

    // Ajouter le service à l'utilisateur
    await User.findByIdAndUpdate(userID, {
      $push: { services: savedService._id } // Assurez-vous que 'services' existe dans userSchema
    });

    // Réponse au client
    res.status(201).json({
      success: true,
      message: "Service créé avec succès",
      data: savedService
    });

  } catch (error) {
    console.error("Erreur lors de la création du service:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Erreur lors de la création du service",
      error: error.message
    });
  }
};