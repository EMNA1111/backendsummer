const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const uploadfile = require('../middlewares/uploadFile')
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUserById/:id',userController.getUserById );
router.post('/addClient',userController.addClient );
router.post('/addadmin',userController.addadmin );
router.delete('/DeleteUserById/:id',userController.DeleteUserById );
router.get('/getOrderUsersByAge',userController.getOrderUsersByAge );
router.get('/getUserByAge/:age',userController.getUserByAge );
router.get('/getUserByAgeBetweenXAndY',userController.getUserByAgeBetweenXAndY );
router.get('/searchUsersByUsername',userController.searchUsersByName );
router.post('/addClientWithFile',uploadfile.single("image_User"),userController.addClientWithFile );
module.exports = router;



