<!doctype html>
<html>
  <head>
    <title>index.ejs</title>
    <script src="/socket.io/socket.io.js"></script>
  <script src="js/jquery.min.js"></script>
  </head>
  <body>
        <h1><a href="/chat">点击进入chat页面</a></h1>

       <ul id="messages">

       </ul>
       
  </body>
  <script>
      var socket=io();
      $(function () {
        var socket = io();
        socket.on('newuser',function(msg){
        $('#messages').append($('<li>').text("联机电脑"+msg.clientip+'-----'+msg._id));
      });

      });
    
    
     
      </script>
</html>

