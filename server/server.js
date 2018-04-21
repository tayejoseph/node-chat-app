//note in index.html we must add this     <script src = "/socket.io/socket.io.js"></script>

const path = require('path'); //note this is a built in module so you don't need to download it
const http = require('http'); //no need to install it, it is a node module
const express = require("express");//this help us to create an http server
const socketIO = require("socket.io"); //this connect our server to our ui

const { generateMessage, generateLocationMessage} = require("./utils/message");
const publicPath = path.join(__dirname, "../public"); //this provide a path that is directly to the public folder
const port = process.env.PORT || 3000; //this make if we are using heroku it will check the port heroku provides
const app = express(); //we are creating our app
const server = http.createServer(app);
const io = socketIO(server);//connect a server to the app


app.use(express.static(publicPath)); //this is used to add the file in the public path into our app, this link dirctly to index.html

io.on("connection", (socket) => {//this let u register an event listener
console.log("NEw user connected");

//this send message sepecifically for the newuser
socket.emit('newMessage', generateMessage('Admin', "welcome to the chat app"));

//this allert all users that a new user just joined execept the new user
socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined"));



//THIS IS RECEIVES DATA FROM THE CLIENT
socket.on("createMessage", (message, callback) => {
console.log('createdMessage', message);
//AFTER RECEIVER DATA FROM THE CLIENT 
//THIS BROADCAST THE MESSAGE RECIEVED FROM THE CLIENT TO CLIENTS CONNECTED
io.emit('newMessage', generateMessage(message.from, message.text));
    callback("this is from the server");//this active the callback function sent by the client
});

socket.on('createLocationMessage', (coords) => {
//THIS SEND THE LOCATION TO ALL USERS CONNECTED WHEN A USER CLICK THE LOCATION BUTTON
io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
});


socket.on('disconnect', () => {//this runs when a socket is disconnected
console.log("User was disconnected")
})


})




server.listen(port, () => {
    console.log(`Server is up on ${port} 3000`)
})