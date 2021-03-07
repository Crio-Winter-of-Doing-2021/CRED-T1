const mongoose = require('mongoose');

const Schema = new mongoose.Schema;

const cardsSchema = new Schema({
    cardNo: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        ref: 'Users',
    },
    cardName: {
        type: String,
    },
    cardVendor: {
        type: String,
    },
    expiryDateMonth: {
        type: String,
    },
    expiryDateYear: {
        type: String,
    },
    outstanding: {
        type: Number,
    },
});

const Cards = mongoose.model('Cards', cardsSchema);

module.exports = Cards;