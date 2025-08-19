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
    const checkIfServiceExists = await ServiceInter.findById(id);
    if (!checkIfServiceExists) {
      throw new Error("ServiceInter not Found !");
    }

    // Supprimer
    await ServiceInter.findByIdAndDelete(id);

    res.status(200).json("ServiceInter deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
