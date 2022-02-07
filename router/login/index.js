var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')
var mysql = require('mysql')
var crypto = require('crypto');
var cookies = require('cookie-parser');
const { has } = require('cheerio/lib/api/traversing')
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
    if (req.cookies.user){
        res.render('login.ejs', {cookie : req.cookies.user});
    }
    else{
        res.render('login.ejs', {cookie: "false"});
    }
})

router.post('/', function (req, res, next) {
    var id = req.body.id;
    var pw = req.body.pw;

    var query = "select salt, password from member where userid='" + id + "';"
    console.log(query);
    connection.query(query, function (err, rows){
        if(err) throw err;
        else {
            if (rows.length == 0) { // 아이디가 존재하지 않는 경우
                console.log("아이디 틀림")
                res.redirect("/login")
            }
            else {
                
                var salt = rows[0].salt;
                var password = rows[0].password;
                const hashPassword = crypto.createHash('sha512').update(pw + salt).digest('hex');
                if(password === hashPassword) {//로그인 성공
                    console.log("로그인 성공")
                    res.cookie("user", id, {
                        expires: new Date(Date.now() + 900000),
                        httpOnly: true
                    });
                    res.redirect("/")
                }
                else { //로그인 실패 (아이디는 존재하지만 비밀번호가 다름)
                    console.log("로그인 실패 비밀번호 틀림")
                    res.redirect("/login")
                }
                
            }
        }
    })
})

module.exports = router;