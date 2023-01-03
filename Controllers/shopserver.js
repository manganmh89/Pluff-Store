//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/productSchema.js');
//const Blog = require('./models/blogSchema.js')
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
//const blogSeed = require('./models/blog.js');

//Seed Product Route
app.get('/products/seed', (req, res) =>{
    Product.deleteMany({}, (err) =>{
        Product.create(productSeed, (err, data) =>{
            res.redirect('/products');
        });
    });
});

//Index of Products
app.get('/products', (req, res) =>{
    Product.find({}, (err, foundProduct) =>{
        res.render('index.ejs', {products: foundProduct});
    });
});
//New Product
app.get('/products/new', (req, res) =>{
    res.render('new.ejs');
});

//Delete Products
app.delete('/products/:id', (req, res) =>{
    Product.findByIdAndDelete(req.params.id, (err, data) =>{
        res.redirect('/products');
    });
});

//Update Products (on admin page)
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
//Create Product(on admin page)
app.post('/products', (req, res)=>{
    Product.create(req.body, (error, createdProduct) =>{
        res.redirect('/products');
    });
});

//Edit Product (on admin page)
app.get('/products/:id/edit', (req, res) =>{
    Product.findById(req.params.id, (err, foundProduct) =>{
        // console.log(foundProduct);
        res.render("edit.ejs", {product: foundProduct});
    });
});
//Edit the item based on the returned product ID from MongoDB
app.get('/admin/edit', (req, res)=>{
    Product.find({}, (err, products) =>{
        const names = [];
        for (let product of products){
        names.push(product.name)
        }
        res.render('admin.ejs', {names});
    });
});

//Show Products page
app.get('/products/:id', (req, res)=>{
    Product.findById(req.params.id, (err, product) =>{
        res.render('show.ejs', {product});
    });
});

//Show 'About Me' from Shop page
app.get('/aboutme', (req, res) =>{
    res.render('aboutMe.ejs');
});
//Show 'Admin Page' from Shop page
app.get('/admin', (req, res) =>{
    res.render('admin.ejs');
});

//App Listener
app.listen(Port, () =>{
    console.log(`Express is listening on: ${Port}`);
});