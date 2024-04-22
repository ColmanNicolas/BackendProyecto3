const { Router } = require('express');
const { check } = require('express-validator')


const { userGet, userPost, userPut, getUser, enableUser, deleteUser } = require('../controllers/userController');
const { validatesFields } = require('../middlewares/validatesFields');
const { emailExiste } = require('../helpers/db-validator');
const { validateJWT } = require('../middlewares/validatesTokens');
const { isAdminRole } = require('../middlewares/validateRole');


const router = Router();

router.get('/users', userGet);

router.get('/users/:id', getUser)

router.post(
    '/users',
    [
        check('name', "El name es obligatorio").not().isEmpty(), 
            check('password', "El password debe tener al menos 6 caracteres y como máximo 25 caracteres").isLength({ 
            min: 6,
            max: 25
        }),
        check('email', "El email es invalido").isEmail(),
        check("email").custom(emailExiste),
        // check('role', "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
        validatesFields
    ],
    userPost
); 

router.put(
    '/users/:id',
    [
        validateJWT,
        isAdminRole,
        check('name', "El name es obligatorio").not().isEmpty(), 
        check('role', "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
        validatesFields,
    ],
    userPut
);

router.put('/users/enable/:id', enableUser)

router.delete('/users/:id', deleteUser)



module.exports = router


