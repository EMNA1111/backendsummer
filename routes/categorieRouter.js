const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController.js');


router.get('/getAllCategories', categorieController.getAllCategories);
router.post('/addCategorie', categorieController.addCategorie);
router.delete('/deleteCategorieById/:id', categorieController.deleteCategorieById);

module.exports = router;
