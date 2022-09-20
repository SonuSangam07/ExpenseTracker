const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.authenticate = (req,res,next)=> {
    try{
const token = req.header('Authorization')
console.log(token);
const user = jwt.verify(token,'asdf1234');

console.log('hey hey hey hey hey ', user.userid)
User.findByPk(user.userid)
.then(user=>{
    console.log(user);
    req.user = user
    next()
}).catch(err=>{throw new Error(err)})
    }
catch(err){
console.log(err)
return res.status(401).json({success:false})
    }
}