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
    const user = await PrincipalUser.findById(id)
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
        const { name, businessName, principalEmail, password, country, city } = req.body;
        const user = new PrincipalUser({ name, businessName, principalEmail, password, country, city });
        user.role = "SERVICE_USER_ROLE";
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        await user.save();
        res.status(201).json({ msg: "Usuario creado", user });
    } catch (error) {
        res.status(400).json({ msg: "ocurrio un error al crear el usuarioooo", error });
    }
}
const putPrincipalUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, password, principalEmail, ...rest } = req.body;
        console.log(rest);
        if (password) {
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync(password, salt);
        }
        const user = await PrincipalUser.findByIdAndUpdate(id, rest, { new: true });
        res.status(200).json({ msg: "Usuario modificado", user });
    } catch (error) {
        res.status(400).json({ msg: "Ocurrio un error al modificar", error });

    }
}
const enablePrincipalUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await PrincipalUser.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        console.log("habilito user");
        user.status = true;

        await PrincipalUser.findByIdAndUpdate(id, user, { new: true });
        res.status(200).json({ msg: "El status del usuario se habilitó ", user });
    } catch (error) {
        res.status(400).json({ msg: "Ocurrió un error ", error });
    }
}
const disablePrincipalUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await PrincipalUser.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        user.status = false;

        await PrincipalUser.findByIdAndUpdate(id, user, { new: true });
        console.log("llego aqui");
        res.status(200).json({ msg: "El status del usuario se deshabilita ", user });
    } catch (error) {
        res.status(400).json({ msg: "Ocurrió un error ", error });
    }
}
const userPayDone = async (req, res) => {
    const { typeService } = req.body;
    const { id } = req.params;
    try {

        const user = await PrincipalUser.findByIdAndUpdate(id, { paid: true, serviceType: typeService }, { new: true });
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        res.status(200).json({ msg: "El pago del usuario se actualizó ", user });
    } catch (error) {
        res.status(400).json({ msg: "Ocurrió un error ", error });
    }
}
const borrarUsuario = async (req, res) => {
    const { id } = req.params;
    await PrincipalUser.findByIdAndDelete(id);
    res.status(200).json({ msg: "todo ok ya" });
}
const getFilterStatusUser = async (req, res) => {
    const { status } = req.params;
    try {
        const filteredUsers = await PrincipalUser.find({ status: status === 'true' });
        if (!filteredUsers) {
            return res.status(400).json({ msg: "no se encontro coincidencia" });
        }
        res.status(200).json({ msg: "Usuarios filtrados por habilitacion", filteredUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getFilterPaidUser = async (req, res) => {
    const { paid } = req.params;
    console.log(paid);

    try {
        const filteredUsers = await PrincipalUser.find({ paid: paid === 'true' });
        if (!filteredUsers) {
            return res.status(400).json({ msg: "no se encontro coincidencia" });
        }
        res.status(200).json({ msg: "Usuarios filtrados por Pago", filteredUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getPrincipalUser,
    getPrincipalUserList,
    getFilterStatusUser,
    getFilterPaidUser,
    postPrincipalUser,
    putPrincipalUser,
    enablePrincipalUser,
    disablePrincipalUser,
    userPayDone,
    borrarUsuario,
}