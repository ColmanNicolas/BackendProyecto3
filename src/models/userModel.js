const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "La propiedad name es obligatoria"],
        },
        email:{
            type: String,
            required: [true, "La propiedad email es obligatoria"],
            unique: true
        },
        password:{
            type: String,
            required: [true, "El password es obligatorio"],
        },
        role:{
            type: String,
            required: [true, "El rol es obligatorio"],
            enum: ["ADMIN_ROLE", "USER_ROLE"]
        },
        status:{
            type: Boolean,
            default: false
        }
    }
)

const User = mongoose.model("User", userSchema);

module.exports = User