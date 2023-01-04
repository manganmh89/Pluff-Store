const express = require('express');
const blogRouter = express.Router();
const Blog = require('../Models/blogSchema.js');
const blogSeed = require('../Models/blog.js');


//Seed Blog Route
blogRouter.get('/seed', (req, res) =>{
    Blog.deleteMany({}, (err) =>{
        Blog.create(blogSeed, (err, data) =>{
            res.redirect('/blog');
        });
    });
});

//Index of Blog Page
blogRouter.get('/', (req, res) =>{
    Blog.find({}, (err, blog) =>{
        // console.log(err);
        // console.log(blog);
        res.render('blog.ejs', {blog});
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

//Update Blog (on admin page)
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
    });
});

//Edit the blog based on the returned blog ID from MongoDB
blogRouter.get('/edit', (req, res) =>{
    Blog.find({}, (err, products) =>{
        const titles = [];
        for (let blog of blogs){
            titles.push(blog.title)
        } console.log(titles);
        res.render('admin.ejs', {titles});
    });
});

//Show Blog page
blogRouter.get('/:id', (req, res) =>{
    Blog.findById(req.params.id, (err, blog) =>{
        res.render('showBlog.ejs', {blog});
    });
});

module.exports = blogRouter;
