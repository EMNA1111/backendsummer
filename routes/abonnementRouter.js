const express = require('express');
const router = express.Router();
const abonnementController = require('../controllers/abonnementController');

// Récupérer tous les abonnements
router.get('/getAllAbonnements', abonnementController.getAllAbonnements);

// Ajouter un abonnement
router.post('/addAbonnement', abonnementController.addAbonnement);

// Supprimer un abonnement par ID
router.delete('/deleteAbonnementById/:id', abonnementController.deleteAbonnementById);

module.exports = router;
