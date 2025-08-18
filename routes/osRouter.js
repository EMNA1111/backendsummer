var express = require('express');
var router = express.Router();
const os = require('os')
/* GET home page. */
router.get('/getosInformation', function(req, res, next) {
    try{
       const osInformation = {
        hostname : os.hostname(),
        platform : os.platform(),
        type : os.type(),
        release : os.release()
       }
       console.log(osInformation)

       res.status(200).json("getosInformation")
    }catch(erreur){
        res.status(500).json({message:error.message})
    }
 
});

module.exports = router;
