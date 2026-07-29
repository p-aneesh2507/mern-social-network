const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    bio: {
    type: String,
    default: ""
},

    password: {
        type: String,
        required: true
    },

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    profilePicture: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);