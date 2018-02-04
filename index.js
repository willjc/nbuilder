var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sd = require('silly-datetime');
var os = require('os');
var getip = require('getip');
var Datastore = require('nedb');
var db = new Datastore({ filename: 'data/user', autoload: true });
app.set("view engine", "ejs");
app.use(express.static('public'));

app.get('/', function (req, res) {

    db.find({},function(error,resa){

        res.render('index', { "arr": resa });
    });


  // res.send('<h1>Hello world</h1>');
});
app.get('/index.html', function (req, res) {
  res.render('index', { "arr": '123' });
  // res.send('<h1>Hello world</h1>');
});
app.get('/chat', function (req, res) {
  res.render('chat');
});
app.get('/stuimg.html', function (req, res) {
  res.render('stuimg');
});
app.get('/new_sai.html', function (req, res) {
  res.render('new_sai');
});
app.get('/xianzhuang.html', function (req, res) {
  res.render('xianzhuang');
});
app.get('/history.html', function (req, res) {
  res.render('history');
});
app.get('/login', function (req, res) {
  res.render('login');
});
app.get('/addstu.html', function (req, res) {
  res.render('addstu');
});



io.on('connection', function (socket) {
  var clientip = socket.handshake.address;//获取用户ip
  //console.log(clientip);
  //var clientip = '127.0.0.1';
  // var getip = require('getip');
  // getip(os,function(localiparr){
  //   if(localiparr.indexOf(clientip)<0){

  //   }else{
      
  //   }
  // });
  db.find({clientip:clientip},function(error,res){
     // console.log(res);
      if(res.length ==0){
        var inserdata = { clientip: clientip, today: Date.now()};
        db.insert(inserdata, function (err, resa) {
          console.log(resa);
          if(resa.length!=0){
              console.log('插入成功');
              io.emit('newconnect', resa);
          }
        });
      }
      
  });
  

  socket.on('disconnect', function(){
   // console.log(clientip);
     // db.find({clientip:clientip},function());
    db.find({clientip:clientip},function(err,resb){
        var cid=resb[0]._id;
        db.remove({_id:cid},function(errora,rees){
               console.log(rees);
                io.emit('discon',{cid:cid});

        });

    });

   // console.log('user disconnected');
  });
  
  socket.on('chat-message', function (data) {//接收用户发送的消息
    timea = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    var resu = { data: data, time: timea }
    //console.log(data);
    io.emit('emit-chat-content', resu);//发送给所有的用户
  });
  //io.emit('a new user come in');
});
// getip(function(data){
//   console.log(data);
// });
//console.log(iptable);
//console.log(getip);
// var localipa = '';
// getip(os, function (localip) {
//   localipa = localip;
// });


http.listen(3000, '0.0.0.0', function () {
  console.log('5');
});