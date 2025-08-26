const express = require('express');
const router = express.Router();
const paiementController = require('../controllers/paiementController');


router.get('/getAllPaiements', paiementController.getAllPaiements);


router.post('/addPaiement', paiementController.addPaiement);


router.delete('/deletePaiementById/:id', paiementController.deletePaiementById);
router.put("/updatePaiement/:id", paiementController.updatePaiement);

module.exports = router;
