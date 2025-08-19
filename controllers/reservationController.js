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
