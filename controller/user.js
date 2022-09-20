const User = require('../models/user.js')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.signup = async(req,res,next)=>{
    try{
    const {name,email,password} = req.body
 
    const saltround=10;
bcrypt.hash(password,saltround,async(err,hash)=>{
    await User.create({name,email, password:hash })
    res.status(201).json({message:'User Successfully Created'})
    })}
    catch(err)
    {
        res.status(500).json({message:'Something went wrong'})
}
}
function generateAccessToken(id){
    return jwt.sign({userid:id},'asdf1234');
}

exports.login=async (req,res,next)=>{
    try{
    const {email,password}=req.body
const user=await User.findAll({where:{email}})
if(user.length>0){
bcrypt.compare(password,user[0].password,(err,result)=>{
    if(err){
        throw new Error('Something went wrong') 
    }
    if(result===true){
        return res.status(200).json({success:true,message:"user successfully logged in", token:generateAccessToken(user[0].id)})
    }
    else{
        return res.status(400).json({success:false,message:"password is incorrect"})
    }
})
   
}

}


catch(err){
res.status(500).json({Message:err,success:false})
}}