var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
const cookieParser = require('cookie-parser')
var router = require('./routes/router');

var port = process.env.PORT || 9999;
var app = express();

// app.get('/', function (req, res) {
  // res.send('<h1>你好，这是我们的第一个nodejs项目</h1>');
// });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
    secret: 'fuckupig',
    cookie: {maxAge: 3600000},
    resave: true,
    saveUninitialized: true,
}));

//app.get('/', function(req, res, next){
//    var sess = req.session;
//    var loginUser = sess.user;
//    var isLogined = !!loginUser;
//
//    res.render('index', {
//        isLogined: isLogined,
//        name: loginUser || ''
//    });
//});

app.use(router);

app.listen(port, () => {
    console.log(`devServer start on port:${ port}`);
});