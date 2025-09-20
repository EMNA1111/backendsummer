const Paiement = require('../models/paiementModel.js');


module.exports.getAllPaiements = async (req, res) => {
  try {
    const paiements = await Paiement.find();
    res.status(200).json({ paiements });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
module.exports.updatePaiement = async (req, res) => {
  try {
    //logique
    const id = req.params.id;
    const { modePaiement } = req.body;
    const updatedPaiement = await Paiement.findByIdAndUpdate(id, {
      $set: { modePaiement },
    });
    //const paiement = new paiementModel(req.body)
    res.status(200).json(updatedPaiement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Facture = require("../models/factureModel");

module.exports.addPaiementToFacture = async (req, res) => {
  try {
    const { factureId, modePaiement, statutPaiement } = req.body; // factureId dans le body

    // Vérifier que la facture existe
    const facture = await Facture.findById(factureId);
    if (!facture) {
      return res.status(404).json({
        success: false,
        message: "Facture non trouvée"
      });
    }

    // Créer le paiement et l'associer à la facture
    const paiement = new Paiement({
      modePaiement,
      statutPaiement: statutPaiement || "en_attente",
      factures: [facture._id] // on lie la facture au paiement
    });

    const savedPaiement = await paiement.save();

    // Mettre à jour la facture pour pointer vers le paiement
    facture.paiement = savedPaiement._id;
    await facture.save();

    res.status(201).json({
      success: true,
      message: "Paiement ajouté à la facture avec succès",
      data: savedPaiement
    });

  } catch (error) {
    console.error("Erreur lors de l'ajout du paiement:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Erreur serveur",
      error: error.message
    });
  }
};

const User = require('../models/userModel.js');
module.exports.addPaiementWithClient = async (req, res) => {
  try {
    const { clientId, facturesIds, modePaiement, statutPaiement } = req.body;

    // Vérifier que le client existe et que c'est bien un client
    const client = await User.findById(clientId);
    if (!client || client.role !== "client") {
      return res.status(404).json({
        success: false,
        message: "Client non trouvé ou invalide"
      });
    }

    // Vérifier que les factures existent
    const factures = await Facture.find({ _id: { $in: facturesIds } });
    if (factures.length !== facturesIds.length) {
      return res.status(404).json({
        success: false,
        message: "Une ou plusieurs factures n'ont pas été trouvées"
      });
    }

    // Créer le paiement
    const paiement = new Paiement({
      modePaiement,
      statutPaiement: statutPaiement || "en_attente",
      factures: facturesIds,
      user: clientId
    });

    const savedPaiement = await paiement.save();

    // Ajouter le paiement au client
    await User.findByIdAndUpdate(clientId, {
      $push: { paiements: savedPaiement._id }
    });

    // Mettre à jour les factures pour pointer vers ce paiement
    await Facture.updateMany(
      { _id: { $in: facturesIds } },
      { $set: { paiement: savedPaiement._id } }
    );

    res.status(201).json({
      success: true,
      message: "Paiement créé et associé au client et aux factures",
      data: savedPaiement
    });

  } catch (error) {
    console.error("Erreur lors de la création du paiement :", error);
    res.status(500).json({
      success: false,
      message: error.message || "Erreur serveur",
      error: error.message
    });
  }
};


