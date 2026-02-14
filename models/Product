const mongoose= require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,

    },
    price: {
        type: Number,
         required: true 
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    inStock: {
      type: Boolean,
      default: true
    },
    

},{timestamps: true
});