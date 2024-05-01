const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderNumber: {
            type: Number,
            required: true,
            unique: true,
            default: 1
        },
        userId: {
            type: [Object],
            required: true,
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
            default: false,
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
