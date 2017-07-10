$(document).ready(function(){

    var messages = [];
    var socket = io.connect("http://localhost:1337");

    //When the client recieves a message
    socket.on('message', function(data){
        //Determines if the data is a messge,
        if(data.message){
            //adds message to the messages array
            messages.push(data.message);
            var html = '';
            for(var i = 0; i < messages.length - 1; i++){
                console.log(messages[i]);
                //Adds the text to a varaible html, seperated by line breaks.
                html += messages[i] + '<br />';
            }
            $('#content').html(html); 
        }else{
            console.log("There is a problem:", data);
        }
    });

    //Once the button is clicked, it will emit a send request with the message of what
    //is within the input field
    $('#button').click(function(){
        socket.emit('send', { message: $('#inputField').val()});
    });



});