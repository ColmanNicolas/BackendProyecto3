const bcryptjs = require('bcryptjs')
const { generarJWT } = require("../helpers/generarJWT");
const mongoose = require("mongoose");


const PrincipalUser = require('../models/principalUserModel');

const principalLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await PrincipalUser.findOne({ email })
        if(!user){
            return res.status(400),json({msg:" email o password incorrectos"})
        }
        if(user.status){
            return res.status(400),json({msg:" email o password incorrectos"})
        }
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400),json({msg:" password incorrectos"})
        }
    
        const token = await generarJWT(user.id);
        res.status(200).json({msg:"login ok", user, token})

    } catch (error) {
        res.status(400).json({msg:"login fallido"})
        
    }
}

const principalRegister = async (req, res) => {
    try {
        const { name, businessName, email, password, country, city } = req.body;
        const user = new PrincipalUser({ name, businessName, email, password, country, city });
        user.role = "SERVICE_USER_ROLE";
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        await user.save();
        res.status(201).json({ msg: "Usuario creado", user });
    } catch (error) {
        res.status(400).json({ msg: "ocurrio un error al crear el usuario" ,error });
    }
}

module.exports ={
    principalRegister,
    principalLogin
}