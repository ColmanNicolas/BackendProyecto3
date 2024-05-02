const Menu = require('../models/menuModel')
const menuService = require('../services/menuService');

const getAllMenu = async (request, response) => {
    try {
        const menu = await menuService.getAllMenu();
        response.json(menu);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

const createNewMenu = async (request, response) => {
    try {
        const { name, state, price, detail, category, image } = request.body;
        const menu = await Menu.create({ name, state, price, detail, category, image });
        response.status(201).json(menu);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

const getOneMenu = async (request, response) => {


    try {
        const id = request.params.id;
        const menu = await Menu.findById(id);
        if (!menu) {
            return response.status(404).json({ message: "Menu no encontrado" });
        }
        response.json(menu);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

const putUpdateMenu = async (request, response) => {
    try {
        const id = request.params.id;
        const menuData = request.body;
        const menu = await Menu.findByIdAndUpdate(id, menuData, { new: true });
        if (!menu) {
            return response.status(404).json({ msg: "Menu no encontrado" });
        }
        response.status(200).json({ msg: 'menu modificado', menu });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

const deleteMenu = async (request, response) => {
    try {
        const id = request.params.id;
        const menu = await Menu.findByIdAndDelete(id);
        if (!menu) {
            return response.status(404).json({ msg: "Menu no encontrado" });
        }
        response.status(200).json({ msg: "Menu Eliminado" });
    } catch (error) {
        response.status(500).json({ msg: "error.message" });
    }
};
const filtrarMenus = async (req, res) => {
    try {
        const { filtro } = req.params;
        const menu = await Menu.find({ category: filtro });
        if (!menu) {
            return res.status(400).json({ message: "no se encontraron ordenes para este filtro" });
        }
        res.status(200).json({ message: 'pedidos filtradas', menu });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const searchMenus = async (req, res) => {
    try {
        const { query } = req.params;
        const menus = await Menu.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { detail: { $regex: query, $options: 'i' } },
            ]
        });
        if (menus.length === 0) {
            return res.status(400).json({ message: 'No se encontraron menus que coincidan con la búsqueda.',menus:{} });
        }
        return res.status(200).json({ message: 'menus encontrados:', menus });
    } catch (error) {
        console.error('Error al buscar menus:', error.message);
        return res.status(500).json({ error: 'Hubo un error al buscar menus.' });
    }
};


module.exports = {
    getAllMenu,
    createNewMenu,
    getOneMenu,
    putUpdateMenu,
    deleteMenu,
    filtrarMenus,
    searchMenus
};