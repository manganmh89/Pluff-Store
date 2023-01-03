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

// const blogServer = require ('./controllers/blogserver.js');
// const shopServer = require ('./controllers/shopserver.js');
// app.use('/blog', blogServer);
// app.use('/products', shopServer);


const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;
mongoose.connect(DATABASE_URI);
const db = mongoose.connection;
db.on('error', (err)=>console.log('error occurred with MongoDB: ' + err.message));
db.on('connected', ()=>console.log(`successful connection to MongoDB on ${db.host}:${db.port}`));

const productSeed = require('./models/data.js');
const blogSeed = require('./models/blog.js');

//Seed Product Route
app.get('/products/seed', (req, res) =>{
    Product.deleteMany({}, (err) =>{
        Product.create(productSeed, (err, data) =>{
            res.redirect('/products');
        });
    });
});
//Seed Blog Route
app.get('/blog/seed', (req, res) =>{
    Blog.deleteMany({}, (err) =>{
        Blog.create(blogSeed, (err, data) =>{
            res.redirect('/blog');
        });
    });
});

//Index
app.get('/products', (req, res) =>{
    Product.find({}, (err, foundProduct) =>{
        res.render('index.ejs', {products: foundProduct});
    });
});
//About Me Page
app.get('/aboutme', (req, res) =>{
    res.render('aboutMe.ejs');
})

//Blog Page
app.get('/blog', (req, res) =>{
    Blog.find({}, (err, foundBlog) =>{
        res.render('blog.ejs', {blog: foundBlog});
    });
});
//Admin Page
app.get('/admin', (req, res) =>{
        res.render('admin.ejs');
});

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
    });
});


//Update (on admin page)
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

//Create Blog (on admin page)
app.post('/blog', (req, res) =>{
    Blog.create(req.body, (error, createdBlog) =>{
        res.redirect('/blog');
    })
})


//Edit Product (on admin page)
app.get('/products/:id/edit', (req, res) =>{
    Product.findById(req.params.id, (err, foundProduct) =>{
        // console.log(foundProduct);
        res.render('edit.ejs', {product: foundProduct});
    });
});
//Edit the item based on the returned product ID from MongoDB
app.get('/admin', (req, res)=>{
    Product.find({}, (err, products) =>{
        const names = [];
        for (let product of products){
        names.push(product.name)
        }
        res.render('admin.ejs', {names});
    });
});

//Edit Blog (on admin page)
app.get('/blog/:id/edit', (req, res) =>{
    Blog.findById(req.params.id, (err, foundBlog) =>{
        res.render('admin.ejs', {foundBlog})
    })
})
//Edit the blog based on the returned blog title from MongoDB
// app.get('/admin/edit', (req, res) =>{
//     Blog.find({}, (err, posts) =>{
//         const titles = [];
//         for (let title of posts){
//             titles.push(blog.title)
//         }
//         res.render('admin.ejs', {titles});
//     });
// });

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