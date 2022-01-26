var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');


//url root
router.get('/', function(req,res){
    res.sendfile( path.join(__dirname, "../public/main.html"))
});


module.exports = router;


