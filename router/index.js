var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var findMaps = require('./findMaps/index')
;
//url root
router.get('/', function(req,res){
    res.sendfile( path.join(__dirname, "../public/main.html"))
});

router.use('/findMaps', findMaps);

module.exports = router;


