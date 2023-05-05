const express = require('express');
const session = require('express-session');


function sessMessage(req,res , next) {
    res.locals.message= req.session.message
    delete req.session.message;

    next();

}

module.exports = sessMessage;