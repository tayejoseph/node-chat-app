const socket = io(); //this creates our connection

socket.on('connect', function () {
    console.log("connected to server");

//this sends data to the client
    socket.emit("createMessage", {
        from: "adsd",
        text: "dafd"
    });

});

socket.on("disconnect", function () {//this runs when ever the server goes down
    console.log("disconnected from server")
});

//LISTENING TO A CUSTOM EVENT
socket.on('newMessage', function (message) {
    console.log("newMessage", message);
});