const mongoose = require("mongoose");

const Statement = require("../models/statementModel");

exports.addStatement = async function(req,res,next){
    try{
        if( !req.user ){
            res.status(403).json({
                status : "fail",
                message : "not authenticated"
            })
            return;
        }else{
            if( !req.body.cardId || !req.body.type || !req.body.amount || !req.body.vendor || !req.body.category ){
                res.status(406).json({
                    status : "fail",
                    message : "Inadequate Information"
                })
                return;
            }
            const up = await Statement.create({
                cardId : req.body.cardId,
                amount : req.body.amount,
                type : req.body.type,
                vendor : req.body.vendor,
                category : req.body.category,
                date : Date.now()
            })

            res.status(200).json({
                status : "success",
                message : up
            })
        }
    }catch(err){
        res.status(400).json({
            status : "fail",
            message : "Internal server error"
        })
    }
}

exports.getDebitStatement = async function( req, res, next ){
    try{
        if( !req.user ){
            res.status(403).json({
                status : "fail",
                message : "not authenticated"
            })
            return;
        }else{
            const query = await Statement.aggregate([
                {$match : {cardId : req.params.cardId, type : "debit"}}
            ])

            res.status(200).json({
                status : "success",
                message : query
            })
        }
    }catch(err){
        res.status(400).json({
            status : "fail",
            message : "Internal Server Error"
        })
    }
}

exports.getCreditStatement = async function( req, res, next ){
    try{
        if( !req.user ){
            res.status(403).json({
                status : "fail",
                message : "not authenticated"
            })
            return;
        }else{
            const query = await Statement.aggregate([
                {$match : {cardId : req.params.cardId, type : "credit"}}
            ])

            res.status(200).json({
                status : "success",
                message : query
            })
        }
    }catch(err){
        res.status(400).json({
            status : "fail",
            message : "Internal Server Error"
        })
    }
}

exports.getAllStatement = async function( req, res, next ){
    try{
        if( !req.user ){
            res.status(403).json({
                status : "fail",
                message : "not authenticated"
            })
            return;
        }else{
            const query = await Statement.aggregate([
                {$match : {cardId : req.params.cardId }}
            ])
            // console.log(query);
            res.status(200).json({
                status : "success",
                message : query
            })
        }
    }catch(err){
        res.status(400).json({
            status : "fail",
            message : "Internal Server Error"
        })
    }
}