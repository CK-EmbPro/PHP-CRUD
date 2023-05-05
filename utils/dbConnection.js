const express = require('express');
const mongoose = require('mongoose');
const dbUrl= require('../config/envFile').dbUrl


mongoose.connect(dbUrl,{useNewUrlParser:true, useUnifiedTopology: true});

const db= mongoose.connection
db.on('error', ()=>{
    console.log("Not successfully connected to database");
})

db.once('open', ()=>{
    console.log("Connected to database successfully");
})

module.exports= db;