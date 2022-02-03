var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var findMaps = require('./findMaps/index');
var board = require('./board/index');
var signUp = require('./signUp/index')

//url root
router.get('/', function(req,res){
    res.render('main.ejs');
});

router.use('/findMaps', findMaps);
router.use('/board', board);
router.use('/signUp', signUp);

module.exports = router;


