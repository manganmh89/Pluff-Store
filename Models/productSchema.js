const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema ({
    name: {
        type:String,
        required: true
    },
    description: {
        type:String,
        required: true
    }, 
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
})
module.exports = mongoose.model('Product', productSchema)