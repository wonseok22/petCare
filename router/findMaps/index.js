var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var request = require('request')
var cheerio = require('cheerio')
var rp = require('request-promise')
const authKey = "1d070a748c594769afd68d31bcb3c6ff";
const phaUrls = "https://openapi.gg.go.kr/AnimalPharmacy";
const hosUrls = "https://openapi.gg.go.kr/Animalhosptl";
const city = 41270;


router.get('/', async (req, res) => {
	var data = {};
	const option = {
		KEY: authKey,
		Type: "json",
		pIndex: "1",
		pSize: '100',
		SIGUN_CD: city
	}

	
	await rp.get({ // 동물약국 데이터 받아오기
		uri: phaUrls,
		qs: option
	}, async function (err, res, body) {
		phaData = JSON.parse(body) //json으로 파싱
		let phaLogt = {};
		let phaLat = {};
		let phaName = {};
		for (let i = 0; i < phaData.AnimalPharmacy[1].row.length; i++) {
			phaLogt[i] = phaData.AnimalPharmacy[1].row[i].REFINE_WGS84_LOGT
			phaLat[i] = phaData.AnimalPharmacy[1].row[i].REFINE_WGS84_LAT
			phaName[i] = phaData.AnimalPharmacy[1].row[i].BIZPLC_NM
		}
		return new Promise(function(resolve, reject){
			resolve(
				data.phaLogt = phaLogt,
				data.phaLat = phaLat,
				data.phaName = phaName
			);
		})
	})
	await rp.get({ // 동물병원 데이터 받아오기
		uri: hosUrls,
		qs:option
	}, async function (err, res, body){
		hosData = JSON.parse(body) //json으로 파싱
		let hosLogt = {};
		let hosLat = {};
		let hosName = {};
		for (let i = 0; i < hosData.Animalhosptl[1].row.length; i++) {
			hosLogt[i] = hosData.Animalhosptl[1].row[i].REFINE_WGS84_LOGT
			hosLat[i] = hosData.Animalhosptl[1].row[i].REFINE_WGS84_LAT
			hosName[i] = hosData.Animalhosptl[1].row[i].BIZPLC_NM
		}
		return new Promise(function(resolve, reject){
			resolve(
				data.hosLogt = hosLogt,
				data.hosLat = hosLat,
				data.hosName = hosName
			);
		})
	})
	if (req.cookies.user){
		data.cookie = req.cookies.user
    }
	else {
		data.cookie = "false"
	}
	res.render('findmap.ejs', data);

})



module.exports = router;