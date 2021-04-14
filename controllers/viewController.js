


exports.getHomePage = async function(req,res,next){
    if( req.user ){
        res.status(200).render('home',{data:1, user:req.user} );
    }else{
        res.status(200).render('home',{data:2, user:{}} );
    }
}

exports.getLoginPage = async function(req, res, next){
    res.status(200).render('login' );
}

exports.getSignupPage = async function(req, res, next){
    res.status(200).render('signup' );
}

exports.getSignupPage = async function(req,res,next ){
    res.status(200).render('signup' );
}

exports.getDashboardPage = async function(req, res, next ){
    if( req.user ){
        res.status(200).render('dashboard',{data:1, user:req.user} );
    }else{
        res.status(200).render('utility/error',{data:2, user:{}} );
    }
}

exports.getAddCardPage = async function( req, res, next){
    if( req.user ){
        res.status(200).render('addcard',{data:1, user:req.user} );
    }else{
        res.status(200).render('utility/error',{data:2, user:{}} );
    }
}

exports.getViewCardPage = async function( req, res, next){
    if( req.user ){
        res.status(200).render('allcard',{data:1, user:req.user} );
    }else{
        res.status(200).render('utility/error',{data:2, user:{}} );
    }
}

exports.getErrorPage = async function(req, res, next ){
    res.render('utility/error');
}

exports.getAboutPage = async function(req, res, next ){
    if( req.user ){
        res.status(200).render('about',{data:1, user:req.user} );
    }else{
        res.status(200).render('about',{data:2, user:{}} );
    }
}