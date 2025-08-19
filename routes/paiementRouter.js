const express = require('express');
const router = express.Router();
const paiementController = require('../controllers/paiementController');

// Récupérer tous les paiements
router.get('/getAllPaiements', paiementController.getAllPaiements);

// Ajouter un paiement
router.post('/addPaiement', paiementController.addPaiement);

// Supprimer un paiement par ID
router.delete('/deletePaiementById/:id', paiementController.deletePaiementById);

module.exports = router;
