const {Admin} =require('../../models/admin');
const {User} =require('../../models/user');
const {Broker} =require('../../models/broker');
const {userFunds} = require('../../models/userFunds');
const express = require('express');
const router =express.Router();
const bcrypt = require('bcryptjs');
require('dotenv/config');
const decodedToken = require('../../helpers/decodeToken');

 // To Add New User

  router.post(`/add-user`, async (req,res)=>{
    const token=req.headers['authorization'];
    if(!token)
    return res.status(200).json({success:false, message:"Token not Found.", data:[]});
    const bearerToken=decodedToken(token);
if(bearerToken.userType!='admin')
{
    return res.status(200).json({success:false, message:"You are not authorized user.", data:[]});
}
const adminId=bearerToken.adminID;

const admin = await Admin.findById(adminId);
if(!admin)
return res.status(200).send('Invalid Admin Id.'); 

const olduser = await User.findOne({userName: req.body.userName})
 if(olduser)
 {
     return res.status(200).json({success:false, message:"The User with same username already exist.", data:[]});
 }
 let user = new User({
     admin: adminId,
     name : req.body.name,
     mobile : req.body.mobile,
     userName: req.body.userName,
     creditLimit : req.body.creditLimit,
     passwordHash : bcrypt.hashSync(req.body.password, 10) ,
     city : req.body.city,
     config : {
        orderBetweenHighLow : req.body.config.orderBetweenHighLow,
        bidAsk : req.body.config.bidAsk,
        unitInstedLots : req.body.config.unitInstedLots,
        accountStatus : req.body.config.accountStatus,
        autoCloseActiveTrades : req.body.config.autoCloseActiveTrades,
        notifyClientForLoss : req.body.config.notifyClientForLoss,
     },
     mcxFutures : {
         trading : req.body.mcxFutures.trading,
         minSingleTrade : req.body.mcxFutures.minSingleTrade,
         maxSingleTrade : req.body.mcxFutures.maxSingleTrade,
         maxScript : req.body.mcxFutures.maxScript,
         maxCommodity : req.body.mcxFutures.maxCommodity,
         brokerageType : req.body.mcxFutures.brokerageType,
         brokerage : req.body.mcxFutures.brokerage,
         exposureType : req.body.mcxFutures.exposureType,
         intradayExposure : req.body.mcxFutures.intradayExposure,
         holdingExposure : req.body.mcxFutures.holdingExposure,
     },
     equityFutures : {
         trading : req.body.equityFutures.trading,
         brokerageType : req.body.equityFutures.brokerageType,
         brokerage : req.body.equityFutures.brokerage,
         minSingleTrade : req.body.equityFutures.minSingleTrade,
         maxSingleTrade : req.body.equityFutures.maxSingleTrade,
         minSingleTradeIndex : req.body.equityFutures.minSingleTradeIndex,
         maxSingleTradeIndex : req.body.equityFutures.maxSingleTradeIndex,
         maxScript : req.body.equityFutures.maxScript,
         maxScriptIndex : req.body.equityFutures.maxScriptIndex,
         maxSizeAllEquity : req.body.equityFutures.maxSizeAllEquity,
         maxSizeIndex : req.body.equityFutures.maxSizeIndex,
         intradayExposure : req.body.equityFutures.intradayExposure,
         holdingExposure : req.body.equityFutures.holdingExposure,
     },
     other : {
        notes : req.body.other.notes,
        transactionPassword : bcrypt.hashSync(req.body.other.transactionPassword, 10) ,
     },
     broker : req.body.broker
 })
console.log("limit",req.body.creditLimit);
 user = await user.save();
 if(!user)
 return res.status(200).json({success:true, message:"User not registered.", data: {}});
 res.json({success:true, message:"User registered successfully.", data:{id : user.id}});
}) 


// Get All admin users

router.get('/get/all-user/', async (req,res)=>{
const token=req.headers['authorization'];
if(!token)
return res.status(200).json({success:false, message:"Token not Found.", data:[]});
const bearerToken=decodedToken(token);
if(bearerToken.userType!='admin')
{
    return res.status(200).json({success:false, message:"You are not authorized user.", data:[]});
}
const adminId=bearerToken.adminID;
let filter={}
if(adminId)
{
 filter ={admin: adminId }
}
 const userList = await User.find({ filter }).select('-passwordHash -config -other -mcxFutures -mcxExposureLotWise -equityFutures');
 if(!userList){
     res.status(500).json({success: false})
 }

  res.status(200).json({success:true, message:"All UsersList.", data:userList});

})



// Get user by id

router.get('/get/user/:id', async (req,res)=>{
const token=req.headers['authorization'];
if(!token)
return res.status(200).json({success:false, message:"Token not Found.", data:[]});
const bearerToken=decodedToken(token);
if(bearerToken.userType!='admin')
{
    return res.status(200).json({success:false, message:"You are not authorized user.", data:[]});
}
 const user = await User.findById(req.params.id).select('-passwordHash');
 if(!user){
     res.status(500).json({success: false, message:"No User Found.", data:[]})
 }
 res.status(200).json({success:true, message:"User Data.", data:user});

})

// Update User Data

router.put(`/update-user/:id`, async (req,res)=>{
    const token=req.headers['authorization'];
    if(!token)
    return res.status(200).json({success:false, message:"Token not Found.", data:[]});
    const bearerToken=decodedToken(token);
if(bearerToken.userType!='admin')
{
    return res.status(200).json({success:false, message:"You are not authorized user.", data:[]});
}
const adminId=bearerToken.adminID;

const admin = await Admin.findById(adminId);
if(!admin)
return res.status(200).send('Invalid Admin Id.'); 

const user = await User.findByIdAndUpdate(req.params.id,
    {
     name : req.body.name,
     mobile : req.body.mobile,
     userName: req.body.userName,
     creditLimit : req.body.creditLimit,
     city : req.body.city,
     config : {
        orderBetweenHighLow : req.body.config.orderBetweenHighLow,
        bidAsk : req.body.config.bidAsk,
        unitInstedLots : req.body.config.unitInstedLots,
        accountStatus : req.body.config.accountStatus,
        autoCloseActiveTrades : req.body.config.autoCloseActiveTrades,
        notifyClientForLoss : req.body.config.notifyClientForLoss,
     },
     mcxFutures : {
         trading : req.body.mcxFutures.trading,
         minSingleTrade : req.body.mcxFutures.minSingleTrade,
         maxSingleTrade : req.body.mcxFutures.maxSingleTrade,
         maxScript : req.body.mcxFutures.maxScript,
         maxCommodity : req.body.mcxFutures.maxCommodity,
         brokerageType : req.body.mcxFutures.brokerageType,
         brokerage : req.body.mcxFutures.brokerage,
         exposureType : req.body.mcxFutures.exposureType,
         intradayExposure : req.body.mcxFutures.intradayExposure,
         holdingExposure : req.body.mcxFutures.holdingExposure,
     },
     equityFutures : {
         trading : req.body.equityFutures.trading,
         brokerageType : req.body.equityFutures.brokerageType,
         brokerage : req.body.equityFutures.brokerage,
         minSingleTrade : req.body.equityFutures.minSingleTrade,
         maxSingleTrade : req.body.equityFutures.maxSingleTrade,
         minSingleTradeIndex : req.body.equityFutures.minSingleTradeIndex,
         maxSingleTradeIndex : req.body.equityFutures.maxSingleTradeIndex,
         maxScript : req.body.equityFutures.maxScript,
         maxScriptIndex : req.body.equityFutures.maxScriptIndex,
         maxSizeAllEquity : req.body.equityFutures.maxSizeAllEquity,
         maxSizeIndex : req.body.equityFutures.maxSizeIndex,
         intradayExposure : req.body.equityFutures.intradayExposure,
         holdingExposure : req.body.equityFutures.holdingExposure,
     },
     other : {
        notes : req.body.other.notes,
        transactionPassword : bcrypt.hashSync(req.body.other.transactionPassword, 10) ,
     },
     broker : req.body.broker
 },
 {
     new:true
 }
)  
if(!user)
return res.status(200).json({success:true, message:"User not Updated.", data: {}});
res.json({success:true, message:"User Updated successfully.", data:{ id : user.id}});
}) 

   // To Delete Broker By Id

   router.delete('/remove-user/:id', (req,res)=>{
    User.findByIdAndRemove(req.params.id).then(user=>{
        if(user){
            return res.status(200).json({success:true, message: 'Broker deleted successfully'})
        }
        else{
            return res.status(404).json({success:false, message: 'User not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success :false, error : err})
    })
   })

// Create User Funds 

router.post(`/get/user-funds`, async (req,res)=>{
const token=req.headers['authorization'];
if(!token)
return res.status(200).json({success:false, message:"Token not Found.", data:[]});
const bearerToken=decodedToken(token);
if(bearerToken.userType!='admin')
{
    return res.status(200).json({success:false, message:"You are not authorized user.", data:[]});
}
const adminId=bearerToken.adminID;
if(!bcrypt.compareSync(req.body.transactionPassword, admin.transactionPassword))
        {
         return   res.status(200).json({success: false, message : "Transaction passwrod Not matched."});
        }
let funds = new userFunds({
    user : req.body.user,
    funds : req.body.funds,
    notes : req.body.notes,
    createdBy : adminId
})

funds = await funds.save();

if(!funds)
return res.status(404).json({success:false, message:"Funds not Created.", data:{}});


res.status(200).json({success:true, message:"Funds Created Successfully.", data:funds});
})

// Get All User funds Created by admin

router.get('/get/user-funds', async (req,res)=>{
const token=req.headers['authorization'];
if(!token)
return res.status(200).json({success:false, message:"Token not Found.", data:[]});
const bearerToken=decodedToken(token);
if(bearerToken.userType!='admin')
{
    return res.status(200).json({success:false, message:"You are not authorized user.", data:[]});
}
const adminId=bearerToken.adminID;
let filter={}
if(adminId)
{
 filter ={admin: adminId }
}
 const fundsList = await userFunds.find(filter).populate('user');
 if(!fundsList){
     res.status(500).json({success: false, message:"All broker list.", data:[]})
 }
 res.status(200).json({success:true, message:"All broker list.", data:fundsList});

})

// Get User fund details by id

router.get('/get/user-funds/:id', async (req,res)=>{
    const token=req.headers['authorization'];
    if(!token)
    return res.status(200).json({success:false, message:"Token not Found.", data:[]});
    const bearerToken=decodedToken(token);
    if(bearerToken.userType!='admin')
    {
        return res.status(200).json({success:false, message:"You are not authorized user.", data:[]});
    }
    const adminId=bearerToken.adminID;
    let filter={}
    if(adminId)
    {
     filter ={admin: adminId , _id : req.params.id}
    }
     const fund = await userFunds.find(filter).populate('user');
     if(!fund){
         res.status(500).json({success: false, message:"No Broker Found.", data:{}})
     }
     res.status(200).json({success:true, message:"Fund Data.", data:fund});
    })

module.exports= router;