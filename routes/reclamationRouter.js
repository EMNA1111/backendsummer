const express = require('express');
const router = express.Router();
const reclamationController = require('../controllers/reclamationController.js');


router.get('/getAllReclamations', reclamationController.getAllReclamations);
router.post('/addReclamation', reclamationController.addReclamation);
router.delete('/deleteReclamationById/:id', reclamationController.deleteReclamationById);

module.exports = router;
