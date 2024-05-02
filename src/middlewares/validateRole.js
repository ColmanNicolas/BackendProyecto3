
const isAdminRole = (req, res, next) => {
    const user = req.userAuth;
    if (!user) {
        return res.status(500).json( {msg: 'Se requiere user auth'} )
    }
    const {role} = user; 
    if (role !== "ADMIN_ROLE") {
        return res.status(401).json( {msg: 'El usuario no es ADMIN' } )
    }
    next();
};

module.exports = {isAdminRole}

