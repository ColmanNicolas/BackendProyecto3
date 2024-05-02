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
        role: {
            type: String,
            enum: ["ADMIN_ROLE", "USER_ROLE", "CASHIER_ROLE", "WAITER_ROLE", "AUXILIARY_ROLE", "MANAGER_ROLE", "HR_ROLE"],
            default: "USER_ROLE"
        },
        status:{
            type: Boolean,
            default: false
        }     ,   
        idServicio:{
            type: String,
        },
        serviceType:{
            type: String,
            enum: ["SELF_MANAGEMENT", "STANDARD_SERVICE", "MENU_APP","USER_ROLE"],
            default: "USER_ROLE"
        }
    }
)

userSchema.methods.toJSON = function () {
    const {__v, _id, password, ...user} = this.toObject();
    const parseUser = {
        id: _id,
        ...user,
    }
    return parseUser;
}

const User = mongoose.model("User", userSchema);

module.exports = User