var Datastore = require('nedb');
var db = new Datastore({ filename: 'data/user', autoload: true });




    db.find({},function(error,resa){
        console.log(resa);

    });
$html = $("<div class='win_box'><ul class='title'><li class='close' id='_close'>关闭</li></ul></div><div class='win'></div>");
