const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Port = 3000;

require('dotenv').config();

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static('public'));

//Mount Middleware

const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;
mongoose.connect(DATABSE_URI);
const db = mongoose.connection;

//Index
//New
//Delete
//Update
//Create
//Edit
//Show

//App Listener
app.listen(Port, () =>{
    console.log(`Express is listening on: ${Port}`);
});