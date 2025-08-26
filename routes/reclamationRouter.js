const express = require('express');
const router = express.Router();
const reclamationController = require('../controllers/reclamationController.js');


router.get('/getAllReclamations', reclamationController.getAllReclamations);
//router.post('/addReclamation', reclamationController.addReclamation);
router.delete('/deleteReclamationById/:id', reclamationController.deleteReclamationById);
router.get("/getReclamationById/:id", reclamationController.getReclamationById);
router.put("/updateReclamation/:id", reclamationController.updateReclamation);
// Ajouter une réclamation avec un utilisateur
router.post("/addReclamationWithUser", reclamationController.addReclamationWithUser);



module.exports = router;
