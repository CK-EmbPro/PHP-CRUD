const express = require('express')
const dotenv= require('dotenv')

dotenv.config()

const port = process.env.PORT 
const dbUrl = process.env.dbUrl

module.exports={
    port , dbUrl
}