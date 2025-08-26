const express = require('express');
const router = express.Router();
const factureController = require('../controllers/factureController.js');


router.get('/getAllFacture', factureController.getAllFacture);
router.post('/addFacture', factureController.addFacture);
router.delete('/deleteFactureById/:id', factureController.deleteFactureById);
router.get("/getFactureById/:id", factureController.getFactureById);
router.get("/getOrderFactureByMontant", factureController.getOrderFactureByMontant);
router.put("/updateFacture/:id", factureController.updateFacture);
module.exports = router;

