const mongoose = require('mongoose');

const Schema = new mongoose.Schema;

const userSchema = new  Schema({
    email: {
        type: String,
        unique: true,
    },
    firstName: {
        type: String
    },
    lastName:  {
        type: String
    },
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;