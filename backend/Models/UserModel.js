const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    uname: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    hintQuestion: {
        type: Schema.Types.String,
        required: true
    },
    hintAnswer: {
        type: Schema.Types.String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;