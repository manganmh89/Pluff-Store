const express = require('express');
const { route } = require('./shopController');
const routeRouter = express.Router();

//Edit the blog based on the returned blog title from MongoDB
routeRouter.get('/admin/edit', (req, res) =>{
    // Blog.find({}, (err, posts) =>{
    //     const titles = [];
    //     for (let title of posts){
    //         titles.push(blog.title)
    //     }
        res.render('admin.ejs');
    });
// });

//Index
routeRouter.get('/blog', (req, res) =>{
    res.render('blog.ejs');
});

routeRouter.get('/', (req, res) =>{
    res.redirect('/products');
});

//About Me Page
routeRouter.get('/aboutme', (req, res) =>{
    res.render('aboutMe.ejs');
});

module.exports = routeRouter;
