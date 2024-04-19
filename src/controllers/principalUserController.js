const bcryptjs = require('bcryptjs')
const mongoose = require("mongoose");

const PrincipalUser = require('../models/principalUserModel');

const getPrincipalUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            message: 'El id del usuario no es válido'
        })
    }
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        })
    }
    res.status(200).json({
        message: `Obtuviste un usuario llamado ${user.name}`,
        user
    })
}
const getPrincipalUserList = async (req, res) => {
    try {
        const allUsers = await PrincipalUser.find();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const postPrincipalUser = async (req, res) => {
    try {
        const { name, businessName, email, password, country, city } = req.body;
        const user = new PrincipalUser({ name, businessName, email, password, country, city });
        user.role = "SERVICE_USER_ROLE";
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        await user.save();
        res.status(201).json({ msg: "Usuario creado", user });
    } catch (error) {
        res.status(400).json({ msg: "ocurrio un error al crear el usuarioooo" ,error });
    }
}
const putPrincipalUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, password, email, ...rest } = req.body;
        console.log(rest);
        if (password) {
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync(password, salt);
        }
        const user = await PrincipalUser.findByIdAndUpdate(id, rest, { new: true });
        res.status(200).json({ msg: "Usuario modificado", user });
    } catch (error) {
        res.status(400).json({ msg: "Ocurrio un error al modificar",error});

    }
}
const deletePrincipalUser = async (req, res) => {
    const { id } = req.params;
    const { ...rest } = req.body;

    rest.status = !rest.status;

    try {
        const user = await PrincipalUser.findByIdAndUpdate(id, rest, { new: true });

        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        res.status(200).json({ msg: "El status del usuario se modificó ", user });
    } catch (error) {
        res.status(400).json({ msg: "Ocurrió un error al intentar dar de baja al usuario" });
    }
}
const borrarUsuario = async(req,res)=>{
    const { id } = req.params;
    await PrincipalUser.findByIdAndDelete(id);
    res.status(200).json({msg:"todo ok ya"});
}

module.exports = {
    getPrincipalUser,
    getPrincipalUserList,
    postPrincipalUser,
    putPrincipalUser,
    deletePrincipalUser,
    borrarUsuario,
}