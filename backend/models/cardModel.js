const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const cardSchema = new mongoose.Schema({
    number : {
        type : String,
        required : [true, "Card number required"]
    },
    expiry : {
        type : String,
        required : [true, "expiry required"]
    },
    name : {
        type : String,
        required : [true, "name required"]
    },
    userId : {
        type : String
    }
})

const Card = mongoose.Model('Card',cardSchema);

module.exports = Card;