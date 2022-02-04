var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')
var crypto = require('crypto');
const salt = crypto.randomBytes(128).toString('base64');

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

	if (password !== cpassword) res.send("비밀번호가 일치하지 않습니다."); // 비밀번호 확인 에러
	else {
		const hashPassword = crypto.createHash('sha512').update(password + salt).digest('hex');
		console.log(hashPassword)
		var query = "SELECT userid, password, email FROM member where userid='" + id + "';"; // 중복 처리하기위한 쿼리
		var rows = await connection.query(query);

		if (rows[0] == undefined) { // sql 제대로 연결되고 중복이 없는 경우
			var sql = {
				email: email,
				userid: id,
				password: hashPassword,
				salt : salt
			};
			// create query 
			var query = connection.query('insert into member set ?', sql, function (err, rows) {
				if (err) throw err;
				else res.redirect('/signUp');
			});
		} else {
			// 이미 있음 
			resultcode = 100;
		}
	}

})
module.exports = router;