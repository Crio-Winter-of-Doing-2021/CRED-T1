const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {promisify} = require("util");
const User = require("../models/userModel");
const sendMail = require("../utils/email");
// mongoose.Types.ObjectId  req.user._id.toString()
var store_temp_tokens = []

const signToken = function(id){
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRES_IN});
}

const createsendToken = function(user, statusCode, res){
    const token = signToken(user._id);
    cookieOptions = { expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN *24*60*60*1000) , https : true};
    res.cookie('jwt', token, cookieOptions);
    // res.cookie('userId', user._id, cookieOptions);

    // console.log(user._id);   

    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data : user
    })
}


exports.addUser = async function( req, res, next ){
    try{
        var token;
        try{
            token = crypto.randomBytes(32).toString('hex');
        }catch(err){
            console.log(err);
            return;
        }

        store_temp_tokens.push(crypto.createHash('sha256').update(token).digest('hex'));

        const newUser = await User.create({
            username : req.body.username,
            name : req.body.name,
            email : req.body.email,
            gender : req.body.gender,
            password : req.body.password,
        })

        const verificationURL = `https://${req.get('host')}/api/verify/${token}/${newUser._id}`;
        console.log(verificationURL);
        // try{
        //     await sendMail({
        //         email : req.body.email,
        //         subject : 'email verification link expires in 20 minutes',
        //         message : `Click the link below to verify your email and signup to GeekPal account ${verificationURL}`
        //     })
    
        //     res.status(200).json({
        //         status: 'success',
        //         message: 'Verification link send to email, Wait for verification now'
        //     });
        // }catch(err){
            
        
        //     res.status(400).json({
        //         status : "fail",
        //         message : "Something went wrong"
        //     })
        // }
        var up = await User.findByIdAndUpdate({_id:newUser._id}, {active:true});
            const token_new = signToken(newUser._id);
            cookieOptions = { expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN *24*60*60*1000) , http : true};
            res.cookie('jwt', token_new, cookieOptions);

            // res.redirect('/dashboard')
        res.status(200).json({
            status: 'success',
            message: 'Account Created'
        });
    }catch(err){
        console.log( err );
        res.status(400).json({
            status : "fail"
        })
    }

    res.end();
}


exports.verifyUser = async function( req, res, next ){
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const userId = req.params.id;

    try{
        if( store_temp_tokens.includes(hashedToken) ){
            var up = await User.findByIdAndUpdate({_id:userId}, {active:true});
            const token = signToken(userId);
            cookieOptions = { expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN *24*60*60*1000) , http : true};
            res.cookie('jwt', token, cookieOptions);

            res.redirect('/dashboard')
            // res.status(200).json({
            //     status : "success"
            // })
        }else{
            res.status(404).json({
                status: "fail"
            })
        }
        
        return;
    }catch(err){
        console.log(err);

        res.status(403).json({
            status: "fail"
        })
        return;
    }
    return;
    
} 


exports.login = async function( req, res, next ){
    const {email,password} = req.body;

    if( !email || !password ) {
        res.status(400).json({
            status : "fail"
        })
        return;
    }

    try{
        var ourUser = await User.findOne({email}).select('+password').select('+active');
        if( !ourUser ){
            res.status(400).json({
                status : "fail"
            })
            return;
        }else{
            if(await ourUser.correctPassword(password, ourUser.password)){
                if( ourUser.active ){
                    createsendToken( ourUser, 200, res);
                }else{
                    res.status(404).json({
                        status : "fail"
                    })
                }
                
            }else{
                res.status(404).json({
                    status : "fail"
                })
            }
            // if( ourUser.active ){
            //     createsendToken( ourUser, 200, res);
            // }else{
            //     res.status(404).json({
            //         status : "fail"
            //     })
            // }
            return;
        }
    }catch(err){
        res.status(400).json({
            status : "fail"
        })
        return;
    }

}


exports.logout = async function(req, res, next){
    res.cookie('jwt', '', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
      });

    res.redirect('/');
    return;
}


exports.isLoggedIn = async function( req, res, next ){
    if(req.cookies.jwt){
        // console.log(req.cookies.jwt)
        let token = req.cookies.jwt
        if(!token){
            req.user = undefined;
            next();
        }
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(decoded.id).select('+active');
        if(!currentUser){
            req.user = undefined;
            next();
        }
        // if (currentUser.changedPasswordAfter(decoded.iat)) {
        //     req.user = undefined;
        //     next();
        // }
        
        if(!currentUser){
            req.user = undefined;
            next();
        }else{
            if( !currentUser.active ){
                req.user = undefined;
                next();
            }else{
                req.user = currentUser;
                next();
            }
            
        }
    }else{
        req.user = undefined;
        next();
    }

    
}

exports.check = async function( req, res, next ){
    // console.log(req.user);
    if( req.user ){
        res.status(200).json({
            status : "success",
            message : req.user
        })
    }else{  
        res.status(404).json({
            status : "fail",
            message : "not logged in"
        })
    }
}