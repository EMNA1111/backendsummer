const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');


router.get('/getAllReservations', reservationController.getAllReservations);


router.post('/addReservation', reservationController.addReservation);


router.delete('/deleteReservationById/:id', reservationController.deleteReservationById);
router.put("/updateReservation/:id", reservationController.updateReservation);
// Ajouter une réservation avec un utilisateur
router.post("/addReservationWithUser", reservationController.addReservationWithUser);


module.exports = router;
