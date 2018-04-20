const path = require('path'); //note this is a built in module so you don't need to download it
const express = require("express");
const publicPath = path.join(__dirname, "../public"); //this provide a path that is directly to the public folder

const port = process.env.PORT || 3000; //this make if we are using heroku it will check the port heroku provides
const app = express(); //we are creating our app

app.use(express.static(publicPath)); //this is used to add the file in the public path into our app, this link dirctly to index.html

app.listen(port, () => {
    console.log(`Server is up on ${port} 3000`)
})