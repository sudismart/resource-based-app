var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.all('/*', function(req, res, next) {
    res.sendFile('index.html', { root: __dirname+'/public' });
});

var port = 7005;

var server = app.listen(process.env.PORT || port, function(){
    console.log("Listening on "+port);
});
