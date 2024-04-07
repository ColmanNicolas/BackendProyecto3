const { Router } = require ('express');
const { check } = require('express-validator');

const login = require('../controllers/authController');
const { validatesFields } = require('../middlewares/validatesFields');

const router = Router();

router.post(
    '/auth/login', 
    [check('email', 'El email es invalido').isEmail(), check('password', 'El password es obligatorio').not().isEmpty(), 
    validatesFields],
    login
);

module.exports = router;