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
	var pharmacyDatas = [];
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
		for (let i=0; i<json.AnimalPharmacy[1].row.length; i++){
			pharmacyDatas.push([json.AnimalPharmacy[1].row[i].REFINE_WGS84_LOGT, json.AnimalPharmacy[1].row[i].REFINE_WGS84_LAT])
		}
		return pharmacyDatas
	})
}

const resHospital = function(authKey){ // 동물병원 좌표 받아오기 
	let urls = "https://openapi.gg.go.kr/Animalhosptl";
	var hospitalDatas = [];
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
		for (let i=0; i<json.Animalhosptl[1].row.length; i++){
			hospitalDatas.push([json.Animalhosptl[1].row[i].REFINE_WGS84_LOGT, json.Animalhosptl[1].row[i].REFINE_WGS84_LAT])
		}
		return hospitalDatas
	})
	
}
module.exports = router;
