const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// Obtener todas las órdenes
router.get('/order', async (req, res) => {
    try {
        const orders = await Order.find();
        if(!orders){
           return res.status(404).json({ message: 'Ordenes no encontrada' });
        }
        const reversedOrders = orders.reverse();
        res.json(reversedOrders);
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
    try {
        const { userId, items, totalPrice, status, createdAt } = req.body;
        const order = new Order({
            userId,
            items,
            totalPrice,
            status,
            createdAt
        });
        const newOrder = await order.save();
        res.status(201).json({ msg: "orden realizada", newOrder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar una orden existente
router.put('/order/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status , paid } = req.body;
        console.log("entro aqui", req.body);
        const updatedOrder = await Order.findByIdAndUpdate(id, { status ,paid}, { new: true });
        if (updatedOrder) {
            res.status(200).json({ message: 'Estado de pedido actualizada', updatedOrder });
        } else {
            res.status(404).json({ message: 'Orden no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});
router.get('/order/filter/:filtro', async (req, res) => { // Cambiado ":id" a ":filtro" para reflejar el parámetro esperado
    try {
        const { filtro } = req.params;

        let order;

        switch (filtro) {
            case "PAGADO":
                console.log("entro correctametne en pagado");
                order = await Order.find({ paid: true }); // Usar llaves {} para especificar el objeto de consulta
                break;
            case "NO_PAGADO":
                order = await Order.find({ paid: false }); // Usar llaves {} para especificar el objeto de consulta
                break;
            default:
                order = await Order.find({ status: filtro }); // Usar llaves {} para especificar el objeto de consulta
                break;
        }

        if (!order) { // Verificar si se encontraron órdenes
          return  res.status(404).json({ message: 'Orden no encontrada' });
        } 
        res.status(200).json({ msg: "lista de pedidos filtrada", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
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