import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    dishes: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalPrice : {
        type : Number,
        required : true
    }
},
    { timestamps: true }
)

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)

export default Order
