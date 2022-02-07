var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')
var crypto = require('crypto');
const salt = crypto.randomBytes(128).toString('base64');



router.get('/', function (req, res) {
	console.log("get ajax")
	res.render('signUp.ejs');
})

module.exports = router;