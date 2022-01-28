var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var request = require('request')
var cheerio = require('cheerio')

const authKey = "1d070a748c594769afd68d31bcb3c6ff";
const phaUrls = "https://openapi.gg.go.kr/AnimalPharmacy";
const hosUrls = "https://openapi.gg.go.kr/Animalhosptl";
const city = 41270;


router.get('/', (req, res) => {
	var pRes = res;
	var d = {};
	const option = {
		KEY: authKey,
		Type: "json",
		pIndex: "1",
		pSize: '100',
		SIGUN_CD: city
	}
	request.get({
		uri: phaUrls,
		qs: option,
	}, function (err, res, body) {
		phaData = JSON.parse(body) //json으로 파싱
		let logt = {};
		let lat = {};
		let name = {};
		for (let i = 0; i < phaData.AnimalPharmacy[1].row.length; i++) {
			logt[i] = phaData.AnimalPharmacy[1].row[i].REFINE_WGS84_LOGT
			lat[i] = phaData.AnimalPharmacy[1].row[i].REFINE_WGS84_LAT
			name[i] = phaData.AnimalPharmacy[1].row[i].BIZPLC_NM
		}
		let data = {
			logt: logt,
			lat: lat,
			name: name
		}
		d = {
			logt: logt,
			lat: lat,
			name: name
		}
		console.log(d)
		pRes.render('findmap.ejs', data);
	})
	console.log(d)
})



module.exports = router;