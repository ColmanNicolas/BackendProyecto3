const bcryptjs = require('bcryptjs')
const mongoose = require ("mongoose");

const User = require('../models/userModel')

const userGet = async (req = request, res = response) => {
    const { limit = 10, from = 0 } = req.query
    const [users, total] = await Promise.all([
      User.find({})
        .skip(Number(from))
        .limit(Number(limit)),
    //   User.count()
    ])
    if (users) {
      return res.status(200).json({
        message: 'Usuarios retornados con éxito',
        total,
        users
      })
    }
    res.status(204).json({
      message: 'No hay usuarios',
      data: []
    })
    res.json('obtuviste los usuarios')
};

const getUser = async (req, res) => {
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

  const userPost = async (req = request, res = response) => {
    const { name, email, password, role } = req.body;
    try {
        const user = new User({ name, email, password, role });
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);
        await user.save();
        res.status(201).json({ msg: 'Usuario agregado exitosamente', user });
    } catch (error) {
        console.error('Error al agregar usuario:', error.message);
        res.status(500).json({ error: 'Hubo un error al agregar el usuario' });
    }
};

const userPut = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, email, ...rest } = req.body;
    if (password) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, rest, { new: true });
    res.json(user)
};


const deleteUser = async (req, res) => {
    const { id } = req.params;
    
    try {
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
  
      res.status(200).json({
        message: `El usuario con el nombre '${user.name}' fue desactivado exitosamente`
      });
    } catch (error) {
      console.error('Error al desactivar usuario:', error.message);
      res.status(500).json({
        message: 'Hubo un error al desactivar el usuario'
      });
    }
  };


module.exports = { userGet, userPost, userPut, getUser, deleteUser }
