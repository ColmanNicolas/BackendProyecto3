const bcryptjs = require('bcryptjs')
const { generarJWT } = require("../helpers/generarJWT");
const mongoose = require("mongoose");


const PrincipalUser = require('../models/principalUserModel');
const User = require('../models/userModel');

const principalLogin = async (req, res) => {
    try {
        const { principalEmail, password } = req.body;
        const user = await PrincipalUser.findOne({ principalEmail })
        if (!user) {
            return res.status(400).json({ messageError: 'User / password incorrecto (no existe)' })
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ messageError: 'User / password incorrecto (pass)' })
        }

        const token = await generarJWT(user.id);
        res.status(200).json({ msg: "login ok", user, token })

    } catch (error) {
        res.status(400).json({ messageError: "login fallido, error inesperado del servidor", error })

    }
}

const principalRegister = async (req, res) => {
    try {
        const { name, businessName, principalEmail, password, country, city } = req.body;
        const user = new PrincipalUser({ name, businessName, principalEmail, password, country, city });
        user.role = "SERVICE_USER_ROLE";

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        await user.save();
        res.status(201).json({ msg: `Usuario Registro, ya puede iniciar sesion desde ${principalEmail}`, user });
    } catch (error) {
        return  res.status(500).json({ msg: "Ocurrió un error al registrar el usuario", error });
    }
}


const generateServiceAdmin = async (req, res) => {
    try {
        const { name, principalEmail, password, role, serviceType } = req.body;

        const userPrincipalExiste = await PrincipalUser.findOne({ principalEmail });
        const userExiste = await User.findOne({ email: principalEmail });

        if (userExiste && userPrincipalExiste) {
            if (userExiste.role === "ADMIN_ROLE") {
                await User.findByIdAndUpdate(userExiste.id, { status: !userPrincipalExiste.status }, { new: true });
                return res.status(200).json({
                    msg: `El usuario con email '${principalEmail}' cambió de estado exitosamente`
                });
            } else {
                await User.findByIdAndUpdate(userExiste.id, { name, email: principalEmail, password, role: "ADMIN_ROLE", status: true, serviceType }, { new: true });
                return res.status(201).json({ msg: `Servicio habilitado para ${principalEmail}` });
            }
        } 
        
        if (!userExiste) {
            const user = await User.create({ name, email: principalEmail, password, role: "ADMIN_ROLE", status: true, serviceType });
            return res.status(201).json({ msg: 'Usuario admin creado exitosamente', user });
        }
        
        return res.status(400).json({ msg: "No se pudo realizar ninguna acción con los datos proporcionados" });

    } catch (error) {
        console.error('Error al habilitar usuario:', error.msg);
        return res.status(500).json({ error: 'Hubo un error al habilitar el usuario' });
    }
}


module.exports = {
    principalRegister,
    principalLogin,
    generateServiceAdmin
}