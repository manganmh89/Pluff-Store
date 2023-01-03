//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
//const Product = require('./models/productSchema.js');
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

//const productSeed = require('./models/data.js');
const blogSeed = require('./models/blog.js');

//Seed Blog Route
app.get('/blog/seed', (req, res) =>{
    Blog.deleteMany({}, (err) =>{
        Blog.create(blogSeed, (err, data) =>{
            res.redirect('/blog');
        });
    });
});

//Index of Blog Page
app.get('/blog', (req, res) =>{
    Blog.find({}, (err, foundBlog) =>{
        res.render('blog.ejs', {blog: foundBlog});
    });
});

//New Blog
app.get('/blog/new', (req, res) =>{
    res.render('admin.ejs')
});

//Delete Blog Posts
app.delete('/blog/:id', (req, res) =>{
    Blog.findByIdAndDelete(req.params.id, (err, data) =>{
        res.redirect('/blog');
    });
});

//Update Blog (from the admin page)
app.put('/blog/:id', (req, res) =>{
    Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true,
        },
        (error, updatedProduct) =>{
            res.redirect(`/blog/${req.params.id}`)
        });
});

//Create Blog (on admin page)
app.post('/blog', (req, res) =>{
    Blog.create(req.body, (error, createdBlog) =>{
        res.redirect('/blog');
    });
});

//Edit Blog (on admin page)
app.get('/blog/:id/edit', (req, res) =>{
    Blog.findById(req.params.id, (err, foundBlog) =>{
        res.render('admin.ejs', {foundBlog})
    });
});
//Edit the blog based on the returned blog title from MongoDB
app.get('/admin/edit', (req, res) =>{
    Blog.find({}, (err, posts) =>{
        const titles = [];
        for (let title of posts){
            titles.push(blog.title)
        }
        res.render('admin.ejs', {titles});
    });
});

//Show Blog Page
app.get('/blog', (req, res) =>{
    Blog.find({}, (err, foundBlog) =>{
        res.render('blog.ejs', {blog: foundBlog});
    });
});

//App Listener
app.listen(Port, () =>{
    console.log(`Express is listening on: ${Port}`);
});
