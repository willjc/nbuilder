 var os=require('os');
 //var clientip = socket.handshake.address;//获取用户ip
 //console.log(clientip);
 var clientip = '127.0.0.1';
 var getip = require('getip');
 getip(os,function(localiparr){
    console.log(localiparr);
   if(localiparr.indexOf(clientip)<0){
        console.log(localiparr.indexOf(clientip));
   }else{
        console.log(2);
    }
 });
//console.log(iptable);