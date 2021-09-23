const {Admin} =require('../models/admin');
const express = require('express');
const router =express.Router();
const bcrypt = require('bcryptjs');
require('dotenv/config');
const gettoken = require('../helpers/getIdFromToken');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Get All Admin Api

 router.get(`/`, async (req,res)=>{
   
    const bearerToken=gettoken(req.headers['authorization']);
    console.log('decoded',bearerToken)
   // console.log('decoded',decoded.adminID);

     const adminList = await Admin.find().select('-passwordHash');
     if(!adminList){
         res.status(500).json({success: false})
     }
      res.send(adminList);
    
  })
 
// To Get Admin by ID

router.get(`/:id`, async (req,res)=>{
    const bearerToken=gettoken(req.headers['authorization']);
    console.log('decoded',bearerToken.adminID)

    const admin = await Admin.findById(req.params.id);
    if(!admin){
        res.status(500).json({message: 'Admin Not Found.'})
    }
     res.status(200).send(admin);
 })

  // To register new Admin

  router.post(`/`, async (req,res)=>{
   const oldadmin = await Admin.findOne({email: req.body.email})
    if(oldadmin)
    {
        return res.status(404).json({success:false, message:"The User with same email already exist.", data:[]});
    }

    let admin = new Admin({
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        userName : req.body.userName,
        email: req.body.email,
        passwordHash : bcrypt.hashSync(req.body.password, 10) ,
    })
   
    admin = await admin.save();
    if(!admin)
    return res.status(404).json({success:true, message:"Admin not registered.", data: admin});
    res.json({success:true, message:"Admin registered successfully.", data: admin});

})

// Admin login Api

router.post('/login', async(req,res)=>{

    // check admin Exist with emailID
    let admin = await Admin.findOne({email: req.body.email});
    if(!admin)
    {
        return  res.status(200).json({success:false, message:"Admin Not found.", data:[], token:""});
    }

    if(admin && bcrypt.compareSync(req.body.password, admin.passwordHash))
    {
        const secret = process.env.secret
        const token = jwt.sign(
            {
                adminID: admin.id,
                isAdmin: admin.isAdmin
            },
            secret,
            {
                expiresIn:'1d', //for 1 day 1d, for 1 month 1m, for 1week 1w

            }
        )
	admin = await Admin.findOne({email: req.body.email}).select('-passwordHash');
    if(admin);
        res.status(200).json({success:true, message:"Logged in Successfully.", data: admin, token:token});
    }   
    else{
        res.status(200).json({success:false, message:"Password not matched.", data:[], token:""});
    }
})


// Update Admin Details by id

router.put('/:id', async (req,res) =>{

    if(!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(400).json({success:false, message:"Invalid Admin Id", data:[]});
    }

    const admin = await Admin.findByIdAndUpdate(req.params.id,
        {
            firstName : req.body.firstName,
            lastName: req.body.lastName,
            userName : req.body.userName,
        },
        {
            new:true
        }
    )
        if(!admin)
        return res.status(404).json({success:false, message:"Data updation failed", data:[]});
        res.json({success:true, message:"Data updated successfully.", data: admin});
 })


   
// To Delete Admin

 router.delete('/:id', (req,res)=>{
    Admin.findByIdAndRemove(req.params.id).then(admin=>{
        if(admin){
            return res.status(200).json({success:true, message: 'Admin deleted successfully'})
        }
        else{
            return res.status(404).json({success:false, message: 'Admin not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success :false, error : err})
    })
   })
  

   // To Add New Users

   



 module.exports= router;