const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const statementSchema = new mongoose.Schema({
    cardId : {
        type : String,
        required : [true, "card id is required"]
    },
    amount : {
        type : Number,
        required : [true, "amount required"]
    },
    type : {
        type :String,
        enum : ["debit","credit"],
        required : [true, "type of transactions required"]
    },
    vendor : {
        type : String,
        required : [true , "Vendor name required"]
    },
    category : {
        type : String,
        required : [true, "category is required"]
    },
    date : {
        type : Number
    }
})

const Statement = mongoose.model('Statement', statementSchema);

module.exports = Statement;