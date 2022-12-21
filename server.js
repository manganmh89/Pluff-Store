//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Port = 3000;
require('dotenv').config();

//Middleware

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static('public'));
const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;
mongoose.connect(DATABSE_URI);
const db = mongoose.connection;

//Index
app.get('/products', (req, res)=>{
    Product.find({}, (err, foundProducts) =>{
        res.render('index.ejs', {products: foundProducts});
    });
});
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