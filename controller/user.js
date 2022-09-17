const User = require('../models/user.js')


exports.signup = (req,res,next)=>{
    const {name,email,password} = req.body
    
    User.create({name,email,password})
    .then(res.status(201).json({message:'User Successfully Created'}))
    .catch(err=>res.status(500).json({message:'Something went wrong'}))
}