const express = require('express');
const router = express.Router();
const abonnementController = require('../controllers/abonnementController');


router.get('/getAllAbonnements', abonnementController.getAllAbonnements);


router.post('/addAbonnement', abonnementController.addAbonnement);


router.delete('/deleteAbonnementById/:id', abonnementController.deleteAbonnementById);

module.exports = router;
