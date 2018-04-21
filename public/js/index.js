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
    $('#messages').append(li);
});

//THIS LISTEN FOR AN EVENT WHICHH IS NEWLOCATIONMESSAGE
socket.on('newLocationMessage', function(message){
   const li =$('<li></li>');
   const a = $('<a target="_blank">My Current Location</a>');//target=_blank tell the browser to open a nw tab any time the link is clicked
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});

//jquery event listener for the form
$('#message-form').on('submit', function(e){
    console.log("Dsdada")
    e.preventDefault();
    const messageTextbox = $('[name=message]')
    //The is used to emit a message to the server
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function(){//this func is called in server.js (with callback()) as an asknowledgement that the server recieved the message
        messageTextbox.val()//this clear the form after the server git ur message
    });
});

const  locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    //this disable the getlocation button once u click on it so that u will not have to click on it many time
    locationButton.attr('disabled', 'disabled').text('Sending location ...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});