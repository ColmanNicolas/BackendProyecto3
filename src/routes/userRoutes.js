const { Router } = require('express');
const { check } = require('express-validator')


const { userGet, userPost, userPut, getUser, deleteUser } = require('../controllers/userController');
const { validatesFields } = require('../middlewares/validatesFields');
const { emailExiste } = require('../helpers/db-validator');


const router = Router();

router.get('/users', userGet);

router.get('/users/:id', getUser)

router.post(
    '/users',
    [
        check('name', "El name es obligatorio").not().isEmpty(), 
            check('password', "El password tiene que tener 6 caracteres").isLength({ 
            min: 6,
        }),
        check('email', "El email es invalido").isEmail(),
        // check("email").custom(emailExiste),
        check('role', "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
        validatesFields
    ],
    userPost
); 

router.put('/users/:id', userPut);

router.delete('/users/:id', deleteUser)



module.exports = router


