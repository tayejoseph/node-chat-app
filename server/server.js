//note in index.html we must add this     <script src = "/socket.io/socket.io.js"></script>

const path = require('path'); //note this is a built in module so you don't need to download it
const http = require('http'); //no need to install it, it is a node module
const express = require("express");//this help us to create an http server
const publicPath = path.join(__dirname, "../public"); //this provide a path that is directly to the public folder
const socketIO = require("socket.io"); //this connect our server to our ui
const port = process.env.PORT || 3000; //this make if we are using heroku it will check the port heroku provides
const app = express(); //we are creating our app
const server = http.createServer(app);
const io = socketIO(server);//connect a server to the app


app.use(express.static(publicPath)); //this is used to add the file in the public path into our app, this link dirctly to index.html

io.on("connection", (socket) => {//this let u register an event listener
console.log("NEw user connected");


//THIS SEND DATA TO THE CLIENT
socket.emit("newMessage", {//what ever u write here is what u want to send to the client
from: "John",
text: "see u then",
createdAt: 123
});//this is used to create an event which is listened to in index.js


//THIS IS RECEIVES DATA FROM THE CLIENT
socket.on("createMessage", (message) => {
console.log(message)
})

socket.on('disconnect', () => {//this runs when a socket is disconnected
console.log("User was disconnected")
})


})




server.listen(port, () => {
    console.log(`Server is up on ${port} 3000`)
})