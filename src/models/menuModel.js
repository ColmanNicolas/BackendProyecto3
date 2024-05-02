const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    state:{
        type: String, //pense hacerlo un booleano, pero son tres condiciones
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    detail:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        default: "imgPredeterminada"
    }

});

const menu = mongoose.model("menu", menuSchema);

module.exports = menu;