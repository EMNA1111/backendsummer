const express = require('express');
const router = express.Router();
const serviceInterController = require('../controllers/service_interController');

router.get('/getAllServiceInter', serviceInterController.getAllServiceInter);
router.get('/getServiceInterById/:id', serviceInterController.getServiceInterById);
router.post('/addServiceInter', serviceInterController.addServiceInter);
router.delete('/deleteServiceInterById/:id', serviceInterController.deleteServiceInterById);
router.put("/updateServiceInter/:id", serviceInterController.updateServiceInter);
// Ajouter un service avec un utilisateur
router.post("/addServiceWithUser",serviceInterController.addServiceWithUser);
module.exports = router;
