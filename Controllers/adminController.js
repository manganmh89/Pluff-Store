const express = require('express');
const adminRouter = express.Router();

const Product = require('../Models/productSchema.js');
const Blog = require('../Models/blogSchema.js');


adminRouter.get('/', (req, res)=>{

    res.send('root admin');
});

adminRouter.put('./edit', (req, res) =>{
    console.log[req.body.test]
    res.send("AJAX response")
});

//Admin Page
adminRouter.get('/edit', (req, res) => {
    const titles = [];
    const names = [];
    Product.find({}, (error, products) => {
        for (let product of products) {
            names.push(product.name);
        }
        Blog.find({}, (error, blogs) => {
            for (let blog of blogs) {
                titles.push(blog.title);
            }
            res.render('admin.ejs', {names, titles});
        });
    });
});

module.exports = adminRouter;