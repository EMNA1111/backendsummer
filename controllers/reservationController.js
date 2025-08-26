const Reservation = require('../models/reservationModel.js');

// Récupérer toutes les réservations
module.exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json({ reservations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter une réservation
module.exports.addReservation = async (req, res) => {
  try {
    const { statutReservation, isBlocked } = req.body;
    console.log("req.body", req.body);

    const reservation = new Reservation({ statutReservation, isBlocked });
    const addedReservation = await reservation.save();

    res.status(200).json(addedReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer une réservation par ID
module.exports.deleteReservationById = async (req, res) => {
  try {
    const id = req.params.id;
    const checkIfExists = await Reservation.findById(id);

    if (!checkIfExists) {
      throw new Error("Réservation non trouvée !");
    }

    await Reservation.findByIdAndDelete(id);
    res.status(200).json("Réservation supprimée");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports.updateReservation = async (req, res) => {
  try {
    //logique
    const id = req.params.id;
    const { statutReservation } = req.body;
    const updatedReservation = await Reservation.findByIdAndUpdate(id, {
      $set: { statutReservation },
    });
    //const reservation = new reservationModel(req.body)
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const User = require("../models/userModel.js");

module.exports.addReservationWithUser = async (req, res) => {
  try {
    const { statutReservation, userID } = req.body;

    // Vérifier que l'utilisateur existe
    const user = await User.findById(userID);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Créer la nouvelle réservation
    const newReservation = new Reservation({
      statutReservation,
      user: userID
    });

    const savedReservation = await newReservation.save();

    // Ajouter la réservation à l'utilisateur
    await User.findByIdAndUpdate(userID, {
      $push: { reservations: savedReservation._id }
    });

    // Réponse au client
    res.status(201).json({
      success: true,
      message: "Réservation créée avec succès",
      data: savedReservation
    });

  } catch (error) {
    console.error("Erreur lors de la création de la réservation:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Erreur lors de la création de la réservation",
      error: error.message
    });
  }
};
