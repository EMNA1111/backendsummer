const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');


router.get('/getAllReservations', reservationController.getAllReservations);


router.post('/addReservation', reservationController.addReservation);


router.delete('/deleteReservationById/:id', reservationController.deleteReservationById);

module.exports = router;
