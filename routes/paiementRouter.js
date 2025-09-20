const express = require('express');
const router = express.Router();
const paiementController = require('../controllers/paiementController');


router.get('/getAllPaiements', paiementController.getAllPaiements);
router.post('/addPaiement', paiementController.addPaiement);
router.delete('/deletePaiementById/:id', paiementController.deletePaiementById);
router.put("/updatePaiement/:id", paiementController.updatePaiement);
router.post("/addPaiementToFacture", paiementController.addPaiementToFacture);
router.post("/addPaiementWithClient", paiementController.addPaiementWithClient);
module.exports = router;
