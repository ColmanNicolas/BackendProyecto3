const mongoose = require('mongoose');

const principalUserModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        unique:true,
    },
    businessName: {
        type: String,
        required: [true, "BusinessName is required"],
        unique:true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    cuit: {
        type: Number,
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ["ADMIN_ROLE", "SERVICE_USER_ROLE"],
    },
    country: {
        type: String,
        required: [true, "Country is required"],
    },
    city: {
        type: String,
        required: [true, "City is required"],
    },
    service: {
        type: String,
        enum: ["STANDARD_SERVICE", "MENUAPP_SERVICE", "SELF_MANAGEMENT_SERVICE"],
    },
    paid: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Boolean,
        default: false,
    },
});

principalUserModelSchema.methods.toJSON = function () {
    const { __v, _id, ...principalUser } = this.toObject();
    const parsePrincipalUser = {
        id: _id,
        ...principalUser,
    };
    return parsePrincipalUser;
};

const principalUserModel = mongoose.model("principalUser", principalUserModelSchema);
module.exports = principalUserModel;

