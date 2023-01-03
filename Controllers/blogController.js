const express = require('express');
const blogRouter = express.Router();
const Blog = require('../Models/blogSchema');
const blogSeed = require('../Models/blog.js');


//Seed Blog Route
blogRouter.get('/seed', (req, res) =>{
    Blog.deleteMany({}, (err) =>{
        Blog.create(blogSeed, (err, data) =>{
            res.redirect('/blog');
        });
    });
});

//New Blog
blogRouter.get('/new', (req, res) =>{
    res.render('admin.ejs')
});

//Delete Blog Posts
blogRouter.delete('/:id', (req, res) =>{
    Blog.findByIdAndDelete(req.params.id, (err, data) =>{
        res.redirect('/blog');
    });
});

//Update (on admin page)
blogRouter.put('/:id', (req, res) =>{
    Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true,
        },
        (error, updatedBlog) =>{
            res.redirect(`/blog/${req.params.id}`)
        });
});

//Create Blog (on admin page)
blogRouter.post('/', (req, res) =>{
    Blog.create(req.body, (error, createdBlog) =>{
        res.redirect('/blog');
    });
});

//Edit Blog (on admin page)
blogRouter.get('/:id/edit', (req, res) =>{
    Blog.findById(req.params.id, (err, foundBlog) =>{
        res.render('admin.ejs', {foundBlog})
    })
})

//Index of Blog Page
blogRouter.get('/', (req, res) =>{
    Blog.find({}, (err, foundBlog) =>{
        res.render('blog.ejs', {blog: foundBlog});
    });
});
module.exports = blogRouter;
