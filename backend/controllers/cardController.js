const mongoose = require("mongoose");

const Card = require("../models/cardModel");

exports.addCard = async function(req, res, next ){
    try{
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
        
            var newCard = await Card.create({
                number : req.body.number,
                expiry : req.body.expiry,
                name : req.body.name,
                userId : req.user._id.toString()
            })

            res.status(200).json({
                status : "success",
                message : "Card added successfully"
            });
        }
    }catch(err){
        res.status(400).json({
            status : "fail",
            message : "Some Internal error occured"
        })
    }
}

exports.getCard = async function(req,res, next ){
    try{
        if( !req.user ){
            res.status(404).json({
                status : "fail",
                message : "Not authenticated"
            })
            return;
        }
        var result =await  Card.aggregate([
            {$match : {userId : req.user._id.toString() }}
        ]);
        res.status(200).json({
            status : "success",
            data : result
        })
    }catch(err){
        res.status(400).json({
            status : "fail",
            message : "Internal Error"
        });
    }
}