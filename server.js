//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// const Product = require('./Models/productSchema.js');
// const Blog = require('./Models/blogSchema.js');
const shopRouter = require('./Controllers/shopController');
const blogRouter = require('./Controllers/blogController');
const routeRouter = require('./Controllers/routeController');
const adminRouter = require('./Controllers/adminController');
require('dotenv').config();

//Middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.use('/Public', express.static('public'));
app.use('/Public/images', express.static('public'));
app.use('/Public/videos', express.static('public'));
app.use('/blog', blogRouter);
app.use('/products', shopRouter);
app.use('/admin', adminRouter);
app.use('/', routeRouter);
// app.use('/admin', routeRouter);

//Database Connection
const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;
mongoose.connect(DATABASE_URI);
const db = mongoose.connection;
db.on('error', (err)=>console.log('error occurred with MongoDB: ' + err.message));
db.on('connected', ()=>console.log(`successful connection to MongoDB on ${db.host}:${db.port}`));


//App Listener
app.listen(PORT, () =>{
    console.log(`Express is listening on: ${PORT}`);
});