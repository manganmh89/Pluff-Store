//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/productSchema.js');
const Blog = require('./models/blogSchema.js')
const Port = 3000;
require('dotenv').config();

//Middleware

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static('public'));
app.use('/public/images', express.static('public'));
app.use('/public/videos', express.static('public'));


const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;
mongoose.connect(DATABASE_URI);
const db = mongoose.connection;
db.on('error', (err)=>console.log('error occurred with MongoDB: ' + err.message));
db.on('connected', ()=>console.log(`successful connection to MongoDB on ${db.host}:${db.port}`));

const productSeed = require('./models/data.js');
const blogSeed = require('./models/blog.js');

//New Product
app.get('/products/new', (req, res) =>{
    res.render('new.ejs');
});

//New Blog
app.get('/blog/new', (req, res) =>{
    res.render('admin.ejs')
})

//Delete Products
app.delete('/products/:id', (req, res) =>{
    Product.findByIdAndDelete(req.params.id, (err, data) =>{
        res.redirect('/products');
    });
});

//Delete Blog Posts
app.delete('/blog/:id', (req, res) =>{
    Blog.findByIdAndDelete(req.params.id, (err, data) =>{
        res.redirect('/blog');
    })
})