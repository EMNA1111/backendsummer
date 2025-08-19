const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Récupérer toutes les réservations
router.get('/getAllReservations', reservationController.getAllReservations);

// Ajouter une réservation
router.post('/addReservation', reservationController.addReservation);

// Supprimer une réservation par ID
router.delete('/deleteReservationById/:id', reservationController.deleteReservationById);

module.exports = router;
