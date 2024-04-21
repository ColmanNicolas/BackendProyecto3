const { Router } = require('express');
const { check } = require('express-validator')


const {
    getPrincipalUser,
    getPrincipalUserList,
    postPrincipalUser,
    putPrincipalUser,
    enablePrincipalUser,
    disablePrincipalUser,
    borrarUsuario } = require('../controllers/principalUserController');

const { validatesFields } = require('../middlewares/validatesFields');
const { emailExiste } = require('../helpers/db-validator');

const router = Router();


router.get('/principalUsers/:id', getPrincipalUser);
router.get('/principalUsers', getPrincipalUserList);
router.post('/principalUsers', postPrincipalUser);
router.put('/principalUsers/:id', putPrincipalUser);
router.put('/principalUsers/enable/:id', enablePrincipalUser);
router.put('/principalUsers/disable/:id', disablePrincipalUser);
router.delete('/principalUsers/borrar/:id', borrarUsuario);

module.exports = router;