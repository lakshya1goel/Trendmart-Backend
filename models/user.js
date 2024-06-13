const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(reg);
            },
            message: "This is not a valid email id!"
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                if (value.length < 8) {
                    return false;
                }
                return true;
            },
            message: "Password should be atleast 8 characters long!"
        }
    },
    type: {
        type: String,
        default: "user"
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;