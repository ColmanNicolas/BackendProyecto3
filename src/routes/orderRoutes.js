const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// Obtener todas las órdenes
router.get('/order', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener una orden específica por su ID
router.get('/order/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Orden no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva orden
router.post('/order', async (req, res) => {
    const { orderId, userId, items, totalPrice, status } = req.body;
    const order = new Order({
        orderId,
        userId,
        items,
        totalPrice,
        status
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar una orden existente
router.put('/order/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (order) {
            order.status = req.body.status || order.status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Orden no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar una orden existente
/*en teoria no vamos a eliminar ordenes, en todo caso se deberia pasar a status CANCELADA
router.delete('/:orderId', async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (order) {
            await order.remove();
            res.json({ message: 'Orden eliminada' });
        } else {
            res.status(404).json({ message: 'Orden no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
*/

module.exports = router;