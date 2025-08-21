const express = require('express');
const router = express.Router();
const factureController = require('../controllers/factureController.js');


router.get('/getAllFacture', factureController.getAllFacture);
router.post('/addFacture', factureController.addFacture);
router.delete('/deleteFactureById/:id', factureController.deleteFactureById);

module.exports = router;
