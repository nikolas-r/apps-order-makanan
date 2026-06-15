import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
},
    { timestamps: true }
)

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product