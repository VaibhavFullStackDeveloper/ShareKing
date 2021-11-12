const {Admin} =require('../../models/admin');
const {User} =require('../../models/user');
const express = require('express');
const router =express.Router();
const bcrypt = require('bcryptjs');
require('dotenv/config');
const decodedToken = require('../../helpers/decodeToken');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// User login Api

router.post('/login', async(req,res)=>{

    // check user Exist with userName
    let user = await User.findOne({userName: req.body.userName});
    if(!user)
    {
        return  res.status(200).json({success:false, message:"User Not found.", data:[], token:""});
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash))
    {
        const secret = process.env.secret
        const token = jwt.sign(
            {
                userID: user.id,
                userType:user.userType
            },
            secret,
            {
                expiresIn:'1y', //for 1 day 1d, for 1 month 1m, for 1week 1w
            }
        )
	user = await User.findOne({userName: req.body.userName}).select('-passwordHash');
    if(user);
        res.status(200).json({success:true, message:"Logged in Successfully.", data: user, token:token});
    }   
    else{
        res.status(200).json({success:false, message:"Password not matched.", data:[], token:""});
    }
})
  module.exports= router;