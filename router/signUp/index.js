var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')

// DATABASE setting
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'asdf1234',
	port: '3306',
	database: 'study_db'
});

connection.connect();

router.get('/', function (req, res) {
	res.render('signUp.ejs');
})

router.post('/', async function (req, res, next) {
	var id = req.body.id;
	var email = req.body.email;
	var password = req.body.password;
	var cpassword = req.body.cpassword;

	if (password !== cpassword) res.send("비밀번호를 다시 확인해주세요"); // 비밀번호 확인 에러

	var query = "SELECT userid, password, email FROM member where userid='" + id + "';"; // 중복 처리하기위한 쿼리
	var rows = await connection.query(query);

	if (rows[0] == undefined) { // sql 제대로 연결되고 중복이 없는 경우
		var query = " insert into member (userid, password, email) values ('" + id + "','" + password + "','" + email + "');";
		var rows = await connection.query(query); // 쿼리 실행 
	} else { 
		// 이미 있음 
		resultcode = 100;
	}


})
module.exports = router;