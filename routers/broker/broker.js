const {Admin} =require('../../models/admin');
const {Broker} =require('../../models/broker');
const express = require('express');
const router =express.Router();
const bcrypt = require('bcryptjs');
require('dotenv/config');
const jwt = require('jsonwebtoken');

// Broker login Api
  
  router.post('/login', async(req,res)=>{
  
      // check user Exist with userName
      let broker = await Broker.findOne({userName: req.body.userName});
      if(!broker)
      {
          return  res.status(200).json({success:false, message:"User Not found.", data:[], token:""});
      }
  
      if(broker && bcrypt.compareSync(req.body.password, broker.passwordHash))
      {
          const secret = process.env.secret
          const token = jwt.sign(
              {
                  brokerID: broker.id,
                  userType:broker.userType
              },
              secret,
              {
                  expiresIn:'1y', //for 1 day 1d, for 1 month 1m, for 1week 1w
              }
          )
      broker = await Broker.findOne({userName: req.body.userName}).select('-passwordHash');
      if(broker);
          res.status(200).json({success:true, message:"Logged in Successfully.", data: broker, token:token});
      }   
      else{
          res.status(200).json({success:false, message:"Password not matched.", data:[], token:""});
      }
  })

  module.exports= router;