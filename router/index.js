var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var findMaps = require('./findMaps/index')
var board = require('./board/index')
;
//url root
router.get('/', function(req,res){
    res.sendfile( path.join(__dirname, "../public/main.html"))
});

router.use('/findMaps', findMaps);
router.use('/board', board);

module.exports = router;


