const express = require('express');
const shopRouter = express.Router();
const Product = require('../Models/productSchema.js');
const productSeed = require('../Models/data.js');


//Seed Product Route
shopRouter.get('/seed', (req, res) =>{
    Product.deleteMany({}, (err) =>{
        Product.create(productSeed, (err, data) =>{
            res.redirect('/products');
        });
    });
});

//Index of Products
shopRouter.get('/', (req, res) =>{
    Product.find({}, (err, foundProduct) =>{
        res.render('index.ejs', {products: foundProduct});
    });
});

//New Product
shopRouter.get('/new', (req, res) =>{
    res.render('admin.ejs');
});

//Delete Products
shopRouter.delete('/:id', (req, res) =>{
    Product.findByIdAndDelete(req.params.id, (err, data) =>{
        res.redirect('/products');
    });
});

//Update Products (on admin page)
shopRouter.put('/:id', (req, res) =>{
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

shopRouter.post('/:id/buy', (req, res) =>{
    Product.findByIdAndUpdate(
        req.params.id,
        {$inc: {qty:-1}}, 
        () => {
            res.redirect(`/products/${req.params.id}`)
        });
});

//Create Product(on admin page)
shopRouter.post('/', (req, res)=>{
    Product.create(req.body, (error, createdProduct) =>{
        res.redirect('/products');
    });
});

//Edit Product (on admin page)
shopRouter.get('/:id/edit', (req, res) =>{
    Product.findById(req.params.id, (err, foundProduct) =>{
        res.render('edit.ejs', {product: foundProduct});
    });
});

//Edit the item based on the returned product ID from MongoDB
shopRouter.get('/edit', (req, res)=>{
    Product.find({}, (err, products) =>{
        const names = [];
        for (let product of products){
        names.push(product.name)
        } console.log(names);
        res.render('admin.ejs', {names});
    });
});

//Show Products page
shopRouter.get('/:id', (req, res)=>{
    Product.findById(req.params.id, (err, product) =>{
        res.render('show.ejs', {product});
    });
});

module.exports = shopRouter;

