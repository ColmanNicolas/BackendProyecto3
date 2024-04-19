const { Router } = require('express');
const { check } = require('express-validator')


const {
    getPrincipalUser,
    getPrincipalUserList,
    postPrincipalUser,
    putPrincipalUser,
    deletePrincipalUser,
    borrarUsuario } = require('../controllers/principalUserController');

const { validatesFields } = require('../middlewares/validatesFields');
const { emailExiste } = require('../helpers/db-validator');

const router = Router();


router.get('/principalUsers/:id', getPrincipalUser);
router.get('/principalUsers', getPrincipalUserList);
router.post('/principalUsers', postPrincipalUser);
router.put('/principalUsers/:id', putPrincipalUser);
router.delete('/principalUsers/:id', deletePrincipalUser);
router.delete('/principalUsers/borrar/:id', borrarUsuario);

module.exports = router;