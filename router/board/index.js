var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')


router.get('/', function(req, res) {
    if (req.cookies.user){
        res.render('board.ejs', {cookie : req.cookies.user});
    }
    else{
        res.render('board.ejs', {cookie: "false"});
    }
})


module.exports = router;
