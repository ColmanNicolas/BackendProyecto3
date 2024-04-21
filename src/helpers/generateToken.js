const jwt = require('jsonwebtoken');

const generateJWT = (id = '') => {
    return new Promise( (resolve, reject) => {
        const payload = { id };
        jwt.sign( 
            payload, 
            process.env.SECRET, 
            {
                expiresIn: "4h",
            }, 
            (error, token) => {
             if (error) {
                console.log(error);
                reject('No se pudo general el token');
            } else {
                resolve(token);
            }
        })

    });
};

module.exports = { generateJWT };