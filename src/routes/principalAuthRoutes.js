const { Router } = require('express');
const { check } = require('express-validator')


const {
    principalLogin,
    principalRegister
    } = require('../controllers/principalAuthController');

const { validatesFields } = require('../middlewares/validatesFields');
const { emailExiste } = require('../helpers/db-validator');

const router = Router();

router.post("/principal-auth/login",principalLogin);
router.post("/principal-auth/register",principalRegister);

module.exports = router;