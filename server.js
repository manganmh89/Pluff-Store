//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/productSchema.js')
const Port = 3000;
require('dotenv').config();

//Middleware

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static('public'));

const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;
mongoose.connect(DATABASE_URI);
const db = mongoose.connection;
db.on('error', (err)=>console.log('error occurred with MongoDB: ' + err.message));
db.on('connected', ()=>console.log(`successful connection to MongoDB on ${db.host}:${db.port}`));

const productSeed = require('./models/data.js');
// const { $where } = require('./models/productSchema.js');

//Seed Route
app.get('/products/seed', (req, res) =>{
    Product.deleteMany({}, (err) =>{
        Product.create(productSeed, (err, data) =>{
            res.redirect('/products');
        });
    });
});

//Index
app.get('/products', (req, res) =>{
    Product.find({}, (err, foundProduct) =>{
        res.render('index.ejs', {products: foundProduct});
    });
});

//New
app.get('/products/new', (req, res) =>{
    res.render('new.ejs');
});

//Delete
app.delete('/products/:id', (req, res) =>{
    Product.findByIdAndDelete(req.params.id, (err, data) =>{
        res.redirect('/products');
    });
});

//Update
app.put('/products/:id', (req, res) =>{
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true,
        },
        (error, updatedProduct) =>{
            // console.log(error)
            res.redirect(`/products/${req.params.id}`)
        });
});

app.post('/products/:id/buy', (req, res) =>{
    Product.findByIdAndUpdate(
        req.params.id,
        {$inc: {qty:-1}}, 
        () => {
            res.redirect(`/products/${req.params.id}`)
        });
});

//Create
app.post('/products', (req, res)=>{
    Product.create(req.body, (error, createdProduct)=>{
        res.redirect('/products');
    });
});

//Edit
app.get('/products/:id/edit', (req, res) =>{
    Product.findById(req.params.id, (err, foundProduct) =>{
        // console.log(foundProduct);
        res.render("edit.ejs", {product: foundProduct});
    });
});

//Show
app.get('/products/:id', (req, res)=>{
    Product.findById(req.params.id, (err, product) =>{
        res.render('show.ejs', {product});
    });
});

//App Listener
app.listen(Port, () =>{
    console.log(`Express is listening on: ${Port}`);
});