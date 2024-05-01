const bcryptjs = require('bcryptjs')
const { generarJWT } = require("../helpers/generarJWT");
const mongoose = require("mongoose");


const PrincipalUser = require('../models/principalUserModel');
const User = require('../models/userModel');

const principalLogin = async (req, res) => {
    try {
        const { principalEmail, password } = req.body;
        console.log(principalEmail, password);
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
        res.status(201).json({ msg: "Usuario creado", user });
    } catch (error) {
        res.status(400).json({ msg: "ocurrio un error al crear el usuario", error });
    }
}
const generateServiceAdmin = async (req, res) => {
    try {
        const { name, principalEmail, password, role, serviceType } = req.body;
        console.log(req.body);
        const userPrincipalExiste = await PrincipalUser.findOne({ principalEmail })
        const userExiste = await User.findOne({ email: principalEmail })

        console.log(userExiste, "y tambien ", userPrincipalExiste);
        //si ya esta registrado el email, controlo si es un ADMIN_ROLE
        if (userExiste && userPrincipalExiste) {
            try {
                if (userExiste.role === "ADMIN_ROLE") {
                    await User.findByIdAndUpdate(userExiste.id, { status: !userPrincipalExiste.status }, { new: true });
                    return res.status(200).json({
                        message: `El usuario con de email '${principalEmail}' cambio de estado exitosamente`
                    });
                } else {
                    return res.status(400).json({ message: 'Hubo un error en la operacion, email ya registrado como cliente' });
                }
            } catch (error) {
                console.error('Error al habilitar usuario:', error.message);
                return res.status(500).json({ message: 'Hubo un error al habilitar el usuario( aqui 5)' });
            }
        }
        else if (!userExiste) {
            const user = await User.create({ name, email: principalEmail, password, role: "ADMIN_ROLE", status: true, serviceType });
            return res.status(201).json({ message: 'Usuario admin exitosamente', user });
        }
        else {
            console.log("NO PUDE HACER NADA");
        }
    }
    catch (error) {
        console.error('Error al agregar usuario:', error.message);
        return res.status(500).json({ error: 'Hubo un error al agregar el usuario' });
    }
}

module.exports = {
    principalRegister,
    principalLogin,
    generateServiceAdmin
}