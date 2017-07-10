var express = require("express");
var app = express();
var io = require("socket.io");
var path = require("path");
var port = 1337;

//Once the page /, the main page, recieves a GET request,
//the res, responce, will send the index.html file using the current directory path
//to find said file
app.get("/", function(req,res){
   res.sendFile(path.join(__dirname+'/public/index.html'));
});


//The exrpessjs listen is being passed into Socket.io listen
var io = io.listen(app.listen(port));

//
io.sockets.on('connection', function(socket){
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});



console.log("Now listening on port: " + port);
