const mongoose = require('mongoose');

exports.login = (req, res, next) => {
    [ email, password ] = req.body;
    console.log(`email: ${email}, password: ${password}`);
}

exports.signup = (req, res, next) => {
    [ email, password, firstName, lastName ] = req.body;
    console.log(`email: ${email}, password: ${password}, firstName: ${firstName}, lastName: ${lastName}`);
}