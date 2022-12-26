const mongoose = require('mongoose')
const { Schema } = mongoose;

const blogSchema = new Schema ({
    title: {
        type:String,
        required: true
    }, 
    date: {
        type: String,
        required: true
    },
    content: {
        type: Number,
        required: true,
    },
    image: {
        type: Number,
        required: true,
    },
})
module.exports = mongoose.model('Blog', blogSchema)