const User = require("../models/userModel")

const emailExiste = async (email = "") => {
    const existeEmail = await User.findOne({email});
    if (emailExiste) {
        throw new Error (`El correo: ${email} ya existe `)
    }
}

module.exports = {emailExiste}