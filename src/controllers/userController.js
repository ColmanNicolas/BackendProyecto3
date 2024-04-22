const bcryptjs = require('bcryptjs')
const mongoose = require("mongoose");

const User = require('../models/userModel')

const userGet = async (req, res) => {
  try {
    const { limit = 10, from = 0 } = req.query;
    const [users, total] = await Promise.all([
      User.find({})
        .skip(Number(from))
        .limit(Number(limit)),
      User.countDocuments()
    ]);
    if (users.length > 0) {
      return res.status(200).json({
        message: 'Usuarios retornados con éxito',
        total,
        users
      });
    } else {
      return res.status(204).json({
        message: 'No hay usuarios',
        data: []
      });
    }
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
    return res.status(500).json({
      error: 'Hubo un error al obtener los usuarios'
    });
  }
};
const getFilterUser = async (req, res) => {
  const { status } = req.params;
  try {
    const filteredUsers = await User.find({ status: status === ':true' });
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'El id del usuario no es válido'
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }
    return res.status(200).json({
      message: `Obtuviste un usuario llamado ${user.name}`,
      user
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error.message);
    return res.status(500).json({
      error: 'Hubo un error al obtener el usuario'
    });
  }
};

const userPost = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const user = await User.create({ name, email, password: hashedPassword, role });
    return res.status(201).json({ message: 'Usuario agregado exitosamente', user });
  } catch (error) {
    console.error('Error al agregar usuario:', error.message);
    return res.status(500).json({ error: 'Hubo un error al agregar el usuario' });
  }
};

const userPut = async (req, res) => {
  try {
    const userAuth = req.userAuth;
    console.log(userAuth)
    const { id } = req.params;
    const { password, email, ...rest } = req.body;
    if (password) {
      const salt = bcryptjs.genSaltSync();
      rest.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, rest, { new: true });
    return res.json(user);
  } catch (error) {
    console.error('Error al actualizar usuario:', error.message);
    return res.status(500).json({ error: 'Hubo un error al actualizar el usuario' });
  }
};

const enableUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'El id de usuario no es válido'
      });
    }
    const user = await User.findByIdAndUpdate(id, { status: true }, { new: true });

    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }
    return res.status(200).json({
      message: `El usuario con el nombre '${user.name}' fue habilitado exitosamente`
    });
  } catch (error) {
    console.error('Error al habilitar usuario:', error.message);
    return res.status(500).json({ message: 'Hubo un error al habilitar el usuario' });
  }
}
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'El id de usuario no es válido'
      });
    }
    const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });
    if (!user) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }
    return res.status(200).json({
      message: `El usuario con el nombre '${user.name}' fue desactivado exitosamente`
    });
  } catch (error) {
    console.error('Error al desactivar usuario:', error.message);
    return res.status(500).json({ message: 'Hubo un error al desactivar el usuario' });
  }
};


module.exports = { userGet, userPost, userPut, getUser, deleteUser, enableUser, getFilterUser }
