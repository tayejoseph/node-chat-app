const socket = io(); //this creates our connection

socket.on('connect', function () {
    console.log("connected to server");
})

socket.on("disconnect", function () {//this runs when ever the server goes down
    console.log("disconnected from server")
});

//LISTENING TO A CUSTOM EVENT
socket.on('newMessage', function (message) {
    console.log("newMessage", message);
    let li = $("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li)
});




//jquery event listener for the form
$('#message-form').on('submit', function(e){
    e.preventDefault();
    //The is used to emit a message to the server
    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function(){//this func is called in server.js (with callback()) as an asknowledgement that the server recieved the message

    });
});