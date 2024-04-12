const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            unique: true,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        items: {
            type: [String],
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['PENDIENTE', 'EN_PROCESO', 'COMPLETADA', 'CANCELADA'],
            default: 'PENDIENTE'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
