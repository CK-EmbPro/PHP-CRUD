const express = require('express');
const router = express.Router()
const session = require('express-session')
const User= require('../models/users')
const multer= require('multer');
const fs= require('fs')


//Image upload plugin

var storage= multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads')   
    },

    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})

var upload = multer({
    storage: storage
}).single("image")

router.post('/add', upload, (req, res)=>{
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    currentyear: req.body.currentyear,
    image: req.file.filename
    

  });

  user.save()
  .then(()=>{
   
    req.session.message= {
        type: 'success',
        message: 'User Added successfully'
    }

    res.redirect('/')
  })
  .catch((err)=>{
    console.log("Error: "+err) 
  })
})

router.get('/', (req, res)=>{
    User.find()
    .then((users)=>{
        res.render('index', {title:"Home Page", users: users})
    })
    .catch((err)=>{
        res.json(err.message)
    })
}
)

router.get('/edit/:id',upload,(req,res)=>{
    let {id}= req.params
    User.findById(id)
    .then((user)=>{
        res.render("edit_user", {title:"Edit User", user: user})
    })
    .catch((err)=>{
        res.redirect('/')
    })
})

router.get('/add', (req, res)=>{
    res.render("addUser", {title: "AddUser"});
})

router.post('/update/:id',upload, (req, res)=>{
    let {id}= req.params
    let new_image = '';

    if(req.file){
        new_image= req.file.filename;
   
fs.unlinkSync('./uploads/'+req.body.old_name)

        
}else{
    new_image= req.body.old_name;
}

    User.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        currentYear: req.body.currentyear,
        image: new_image
    })
    .then(()=>{
        req.session.message= {
            type: 'success',
            message: "User updated successfully"
        }

        res.redirect('/')
    })
    .catch((err)=>{
      res.json({message: err.message, type: "danger"})  
    })
})

router.get('/delete/:id', (req,res)=>{
    let {id}=req.params

    User.findByIdAndRemove(id)
    .then((result)=>{
        req.session.message= {
            type: "info",
            message: "User deleted successfully"
        }
        if(result.image){
            fs.unlinkSync('./uploads/'+result.image)
        }

        res.redirect('/')
    })
    .catch((err)=>{
        res.json({message: err.message, type: "danger"})
    })
})

module.exports = router;