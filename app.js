var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var detail = require('./routes/detail');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/detail', detail);

//TODO スキーマ定義、mongoDB接続

//-------------------API--------------------------
//TODO 今は固定のjson返してるけどあとあとDBからもってくる

var tasks = [
      {
        id: '1', title: 'タイトル', content: '内容', status:'0', date:'2018-08-21 10:51'
      },
      {
        id: '2', title: 'タイトル2', content: '内容2', status:'1', date:'2018-08-21 13:51'
      },
      {
        id: '3', title: 'タイトル3', content: '内容3', status:'0', date:'2018-08-21 17:51'
      }
]

// GET todo
//一覧
app.get('/todo', function(req, res, next) {
  res.json(tasks);
  res.header('Content-Type', 'application/json; charset=utf-8')
});
// POST todo/
// todoをつくる
app.post('/todo', function(req, res, next) {
  var param = {"値":"POSTメソッドのリクエストを受け付けました","bodyの値":req.body.card};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});
// GET todo/:id
// そのIDのtodoをみる 
app.get('/todo/:id', function (req, res, next) {
  var param = {"content":req.params.id};      // レスポンスで返す値。JSON形式。
  res.header('Content-Type', 'application/json; charset=utf-8')  // 「レスポンスはJSON形式で返すよ」の意味
  res.send(param);                                               // 「レスポンス送るよ」の意味
});
// PUT todo/:id
// 編集
app.put('/todo/:id', function(req, res, next) {
  var param = {"値":"編集します"};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});
// DELETE todo/:id
// 削除
app.delete('/todo/:id', function(req, res, next) {
  var param = {"値":"削除しました"};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});


//-------------------APIここまで-----------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;

