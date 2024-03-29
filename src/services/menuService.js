const menu = require("../models/menuModel");

getAllMenu = async () => {
    try { 
        return await menu.find();
    } catch (error) {
        throw error;
    }
};

module.exports = { getAllMenu };