const express= require('express');
const bodyParser = require("body-parser");
const session= require('express-session');
const mongoose= require('./utils/dbConnection');
const router= require('./routes/routes');
const envFile=require('./config/envFile');
const sessMessage= require('./utils/middlewares/sessMessage')
  


const app = express();
const PORT = envFile.port;



//MIDDLEWARES

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use(
    session({
        secret: "my secret key",
        saveUninitialized: true, 
        resave: false

    })
)

app.use(sessMessage)

app.use(express.static("uploads"))

//TEMPLATE ENGINE
app.set("view engine", "ejs");

//Testing if the app is running in production
app.use("/", router)

app.listen(PORT, (req, res) => {
    console.log(`Listening on http://localhost:${PORT} `);
})