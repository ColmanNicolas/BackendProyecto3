const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        items: {
            type: [Object],
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        paid: {
            type: Boolean,
            default:false,
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
