const mongoose = require("mongoose");

const Card = require("../models/cardModel");

exports.addCard = async function(req, res, next ){
    if( !req.user ){
        res.status(403).json({
            status : "fail",
            message : "not authenticated"
        })
        return;
    }else{
        if( !req.body.number || !req.body.expiry || !req.body.name ){
            res.status(400).json({
                status : "fail",
                message : "Inadequate information"
            })
            return;
        }
       
        var newCard = Card.create({
            number : req.body.number,
            expiry : req.body.expiry,
            name : req.body.name,
            userId : req.user._id
        })
    }
}