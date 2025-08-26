const express = require('express');
const router = express.Router();
const abonnementController = require('../controllers/abonnementController');


router.get('/getAllAbonnements', abonnementController.getAllAbonnements);


router.post('/addAbonnement', abonnementController.addAbonnement);


router.delete('/deleteAbonnementById/:id', abonnementController.deleteAbonnementById);

router.get("/getAbonnementById/:id", abonnementController.getAbonnementById);
router.put("/updateAbonnement/:id", abonnementController.updateAbonnement);
// Ajouter un abonnement avec un utilisateur
router.post("/addAbonnementWithUser", abonnementController.addAbonnementWithUser);

module.exports = router;
