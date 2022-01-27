var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var request = require('request')
var cheerio = require('cheerio')

const authKey = "1d070a748c594769afd68d31bcb3c6ff";
const city = 41270;

router.get('/', function(req, res) {
	res.render('findmap.ejs');
})

const resPharmacy = function(authKey){  // 동물약국 좌표 받아오기
	var urls = "https://openapi.gg.go.kr/AnimalPharmacy";
	const option = {
		KEY:authKey,
		Type: "json",
		pIndex: "1",
		pSize: '100',
		SIGUN_CD: city
	}
	request.get({
		uri: urls,
		qs :option,
	}, function(err, res, body) {
		let json = JSON.parse(body) //json으로 파싱
	})
}

const resHospital = function(authKey){ // 동물병원 좌표 받아오기 
	let urls = "https://openapi.gg.go.kr/Animalhosptl";
	const option = {
		KEY:authKey,
		Type: "json",
		pIndex: "1",
		pSize: '100',
		SIGUN_CD: city
	}
	request.get({
		uri: urls,
		qs :option,
	}, function(err, res, body) {
		let json = JSON.parse(body) //json으로 파싱
	})
}

module.exports = router;
