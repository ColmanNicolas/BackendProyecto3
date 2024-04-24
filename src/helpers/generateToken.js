const jwt = require('jsonwebtoken');

const generateJWT = (id = '') => {
    const payload = { id };
    return jwt.sign(
        payload,
        process.env.SECRET,
        {
            expiresIn: "4h",
        }
    );
};

module.exports = { generateJWT };



// const jwt = require('jsonwebtoken');

// const generateJWT = (id = '') => {
//     return new Promise( (resolve, reject) => {
//         const payload = { id };
//         jwt.sign( 
//             payload, 
//             process.env.SECRET, 
//             {
//                 expiresIn: "4h",
//             }, 
//             (error, token) => {
//              if (error) {
//                 console.log(error);
//                 reject('No se pudo generar el token');
//             } else {
//                 resolve(token);
//             }
//         })

//     });
// };

// module.exports = { generateJWT };