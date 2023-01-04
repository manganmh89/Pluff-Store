//Dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const shopRouter = require('./Controllers/shopController');
const blogRouter = require('./Controllers/blogController');
const routeRouter = require('./Controllers/routeController');
const adminRouter = require('./Controllers/adminController');
require('dotenv').config();

//Middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.use('/public', express.static('Public'));
app.use('/public/images', express.static('Public'));
app.use('/public/videos', express.static('Public'));
app.use('/blog', blogRouter);
app.use('/products', shopRouter);
app.use('/admin', adminRouter);
app.use('/', routeRouter);

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