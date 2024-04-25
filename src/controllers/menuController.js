const Menu = require('../models/menuModel')
const menuService = require('../services/menuService');

const getAllMenu = async (request, response) => {
    try {
        const menu = await menuService.getAllMenu();
        response.json(menu);
    }   catch (error) {
        response.status(500).json({ error: error.message });
    }
};

const createNewMenu = async (request, response) => {
    try {
        const { name, state, price, detail, category } = request.body;
        const menu = await Menu.create({ name, state, price, detail, category });
        response.status(201).json(menu);
    }   catch(error) {
        response.status(500).json({ error: error.message });
    }
};

const getOneMenu = async (request, response) => {


    try {
        const id = request.params.id;
        console.log(id);
        const menu = await Menu.findById(id);
        if (!menu) {
            return response.status(404).json({ message: "Menu no encontrado"});
        }
        response.json(menu);
    }   catch(error) {
        response.status(500).json({ error: error.message });
    }
};

const putUpdateMenu = async (request, response) => {
    try {
        const id = request.params.id;
        const { name, state, price, detail, category } = request.body;
        const menu = await Menu.findByIdAndUpdate(id, {name, state, price, detail, category}, { new: true });
        if (!menu) {
            return response.status(404).json({ msg: "Menu no encontrado" });
        }
        response.status(200).json({ msg:'menu modificado',menu});
    }   catch (error) {
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
        response.status(200).json({ msg: "Menu Eliminado"});
    }   catch (error) {
        response.status(500).json({ msg: "error.message"});
    }
};
const filtrarMenus = async(req,res) =>{
    try {
        const { filtro } = req.params;
        console.log("recibo filtro:",filtro);
        const menu = await Menu.find({ category: filtro }); 
        if(!menu){
        return res.status(400).json({ message: "no se encontraron ordenes para este filtro" });
        }
        res.status(200).json({ message:'pedidos filtradas', menu});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { 
    getAllMenu, 
    createNewMenu, 
    getOneMenu,
    putUpdateMenu,
    deleteMenu,
    filtrarMenus    
};