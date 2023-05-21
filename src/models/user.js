const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

});

UserSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
