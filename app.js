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

let tasks = [
      {
        id: '1', title: 'タイトル', content: '内容', status:'0', date:'2018-08-21 10:51'
      },
      {
        id: '2', title: 'タイトル2', content: '内容2', status:'1', date:'2018-08-21 13:51'
      },
      {
        id: '3', title: 'タイトル3', content: '内容3', status:'0', date:'2018-08-21 17:51'
      }
];

let task_id_sequense = 4;

// GET todos
//一覧
app.get('/todos', function(req, res, next) {
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.json(tasks);
});

// POST todos/
// todoをつくる
app.post('/todos', function(req, res, next) {
  //var param = {"値":"POSTメソッドのリクエストを受け付けました","bodyの値":req.body.card};
  //console.log(req.body);
  const newTask = req.body;
  newTask.id = String(task_id_sequense);
  task_id_sequense++;

  tasks.push(newTask);
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.json(newTask);
  //res.send(param);
});

// GET todos/:id
// そのIDのtodoをみる 
app.get('/todos/:id', function (req, res, next) {
  const id = req.params.id;
  let param; 
  for(i = 0; i < tasks.length; ++i) {
      if(tasks[i].id === id){
          param = tasks[i];
      }
  }
  
  res.header('Content-Type', 'application/json; charset=utf-8')  // 「レスポンスはJSON形式で返すよ」の意味
  
  res.send(param);                                               // 「レスポンス送るよ」の意味
});
// PUT todos/:id
// 編集
app.put('/todos/:id', function(req, res, next) {
  var param = {"値":"編集します"};
  res.header('Content-Type', 'application/json; charset=utf-8')
  res.send(param);
});
// DELETE todos/:id
// 削除
app.delete('/todos/:id', function(req, res, next) {
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

