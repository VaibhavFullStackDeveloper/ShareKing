const {Admin} =require('../../models/admin');
const {User} =require('../../models/user');
const {Broker} =require('../../models/broker');
const {brokerFunds} = require('../../models/brokerFunds');
const express = require('express');
const router =express.Router();
const bcrypt = require('bcryptjs');
require('dotenv/config');
const decodedToken = require('../../helpers/decodeToken');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

/* Admin Broker Apis here  */



   // To Add New Broker

   router.post(`/add-broker`, async (req,res)=>{
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
    
    const oldbroker = await Broker.findOne({userName: req.body.userName})
     if(oldbroker)
     {
         return res.status(200).json({success:false, message:"The Broker with same username already exist.", data:[]});
     }
     let broker = new Broker({
         admin: adminId,
         firstName : req.body.firstName,
         lastName : req.body.lastName,
         userName: req.body.userName,
         creditLimit : req.body.creditLimit,
         passwordHash : bcrypt.hashSync(req.body.password, 10) ,
         userType : req.body.userType,
         maxTraders : req.body.maxTraders,
         accountStaus : req.body.accountStaus,
         config : {
            autoCloseActiveTrades : req.body.config.autoCloseActiveTrades,
            notifyClientForLoss : req.body.config.notifyClientForLoss,
            profitLossShare : req.body.config.profitLossShare,
         },
         mcxFutures : {
             trading : req.body.mcxFutures.trading,
             brokerageType : req.body.mcxFutures.brokerageType,
             intradayExposure : req.body.mcxFutures.intradayExposure,
             holdingExposure : req.body.mcxFutures.holdingExposure,
         },
         mcxExposureLotWise : {
            bulldexIntraday : req.body.mcxExposureLotWise.bulldexIntraday,
            bulldexHolding : req.body.mcxExposureLotWise.bulldexHolding,
            goldIntraday : req.body.mcxExposureLotWise.goldIntraday,
            goldHolding : req.body.mcxExposureLotWise.goldHolding,
            silverIntraday : req.body.mcxExposureLotWise.silverIntraday,
            silverHolding : req.body.mcxExposureLotWise.silverHolding,
            cruedOilIntraday : req.body.mcxExposureLotWise.cruedOilIntraday,
            cruedOilHolding : req.body.mcxExposureLotWise.cruedOilHolding,
            copperIntraday : req.body.mcxExposureLotWise.copperIntraday,
            copperHolding : req.body.mcxExposureLotWise.copperHolding,
            nickelIntraday : req.body.mcxExposureLotWise.nickelIntraday,
            nickelHolding : req.body.mcxExposureLotWise.nickelHolding,
            zincIntraday : req.body.mcxExposureLotWise.zincIntraday,
            zincHolding : req.body.mcxExposureLotWise.zincHolding,
            leadIntraday : req.body.mcxExposureLotWise.leadIntraday,
            leadHolding : req.body.mcxExposureLotWise.leadHolding,
            naturalGasIntraday : req.body.mcxExposureLotWise.naturalGasIntraday,
            naturalGasHolding : req.body.mcxExposureLotWise.naturalGasHolding,
            alluminiumIntraday : req.body.mcxExposureLotWise.alluminiumIntraday,
            alluminiumHolding : req.body.mcxExposureLotWise.alluminiumHolding,
            menthOilIntraday : req.body.mcxExposureLotWise.menthOilIntraday,
            menthOilHolding : req.body.mcxExposureLotWise.menthOilHolding,
            cottonIntraday : req.body.mcxExposureLotWise.cottonIntraday,
            cottonHolding : req.body.mcxExposureLotWise.cottonHolding,
            cpoIntraday : req.body.mcxExposureLotWise.cpoIntraday,
            cpoHolding : req.body.mcxExposureLotWise.cpoHolding,
            goldMiniIntraday : req.body.mcxExposureLotWise.goldMiniIntraday,
            goldMiniHolding : req.body.mcxExposureLotWise.goldMiniHolding,
            silverMiniIntraday : req.body.mcxExposureLotWise.silverMiniIntraday,
            silverMiniHolding : req.body.mcxExposureLotWise.silverMiniHolding,
            silverMicIntraday : req.body.mcxExposureLotWise.silverMicIntraday,
            silverMicHolding : req.body.mcxExposureLotWise.silverMicHolding,
         },
         equityFutures : {
            trading : req.body.equityFutures.trading,
            brokerage : req.body.equityFutures.trading,
            intradayExposure : req.body.equityFutures.intradayExposure,
            holdingExposure : req.body.equityFutures.holdingExposure,
            ordersAway : req.body.equityFutures.ordersAway,
         },
         transactionPassword : bcrypt.hashSync(req.body.transactionPassword, 10) ,
     })
    
     broker = await broker.save();
     if(!broker)
     return res.status(200).json({success:true, message:"User not registered.", data: {}});
     res.json({success:true, message:"Broker registered successfully.", data:{ id : broker.id}});
    }) 
    
    // Update Broker Details  
    
    
      // To Add New Broker
    
      router.put(`/update-broker/:id`, async (req,res)=>{
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
        
         const broker = await Broker.findByIdAndUpdate(req.params.id,
            {
             firstName : req.body.firstName,
             lastName : req.body.lastName,
             userName: req.body.userName,
             creditLimit : req.body.creditLimit,
             userType : req.body.userType,
             maxTraders : req.body.maxTraders,
             accountStaus : req.body.accountStaus,
             config : {
                autoCloseActiveTrades : req.body.config.autoCloseActiveTrades,
                notifyClientForLoss : req.body.config.notifyClientForLoss,
                profitLossShare : req.body.config.profitLossShare,
             },
             mcxFutures : {
                 trading : req.body.mcxFutures.trading,
                 brokerageType : req.body.mcxFutures.brokerageType,
                 intradayExposure : req.body.mcxFutures.intradayExposure,
                 holdingExposure : req.body.mcxFutures.holdingExposure,
                 minSingleTrade : req.body.mcxFutures.minSingleTrade,
                 maxSingleTrade : req.body.mcxFutures.maxSingleTrade,
                 brokerage : req.body.mcxFutures.brokerage,
                 maxAllowedOverall : req.body.mcxFutures.maxAllowedOverall,
                 maxAllowedPerScript : req.body.mcxFutures.maxAllowedPerScript,
    
             },
             mcxExposureLotWise : {
                bulldexIntraday : req.body.mcxExposureLotWise.bulldexIntraday,
                bulldexHolding : req.body.mcxExposureLotWise.bulldexHolding,
                goldIntraday : req.body.mcxExposureLotWise.goldIntraday,
                goldHolding : req.body.mcxExposureLotWise.goldHolding,
                silverIntraday : req.body.mcxExposureLotWise.silverIntraday,
                silverHolding : req.body.mcxExposureLotWise.silverHolding,
                cruedOilIntraday : req.body.mcxExposureLotWise.cruedOilIntraday,
                cruedOilHolding : req.body.mcxExposureLotWise.cruedOilHolding,
                copperIntraday : req.body.mcxExposureLotWise.copperIntraday,
                copperHolding : req.body.mcxExposureLotWise.copperHolding,
                nickelIntraday : req.body.mcxExposureLotWise.nickelIntraday,
                nickelHolding : req.body.mcxExposureLotWise.nickelHolding,
                zincIntraday : req.body.mcxExposureLotWise.zincIntraday,
                zincHolding : req.body.mcxExposureLotWise.zincHolding,
                leadIntraday : req.body.mcxExposureLotWise.leadIntraday,
                leadHolding : req.body.mcxExposureLotWise.leadHolding,
                naturalGasIntraday : req.body.mcxExposureLotWise.naturalGasIntraday,
                naturalGasHolding : req.body.mcxExposureLotWise.naturalGasHolding,
                alluminiumIntraday : req.body.mcxExposureLotWise.alluminiumIntraday,
                alluminiumHolding : req.body.mcxExposureLotWise.alluminiumHolding,
                menthOilIntraday : req.body.mcxExposureLotWise.menthOilIntraday,
                menthOilHolding : req.body.mcxExposureLotWise.menthOilHolding,
                cottonIntraday : req.body.mcxExposureLotWise.cottonIntraday,
                cottonHolding : req.body.mcxExposureLotWise.cottonHolding,
                cpoIntraday : req.body.mcxExposureLotWise.cpoIntraday,
                cpoHolding : req.body.mcxExposureLotWise.cpoHolding,
                goldMiniIntraday : req.body.mcxExposureLotWise.goldMiniIntraday,
                goldMiniHolding : req.body.mcxExposureLotWise.goldMiniHolding,
                silverMiniIntraday : req.body.mcxExposureLotWise.silverMiniIntraday,
                silverMiniHolding : req.body.mcxExposureLotWise.silverMiniHolding,
                silverMicIntraday : req.body.mcxExposureLotWise.silverMicIntraday,
                silverMicHolding : req.body.mcxExposureLotWise.silverMicHolding,
             },
             equityFutures : {
                trading : req.body.equityFutures.trading,
                brokerage : req.body.equityFutures.trading,
                intradayExposure : req.body.equityFutures.intradayExposure,
                holdingExposure : req.body.equityFutures.holdingExposure,
                ordersAway : req.body.equityFutures.ordersAway,
                minTradeEquityFuture : req.body.equityFutures.ordersAway,
                maxTradeEquityFuture : req.body.equityFutures.ordersAway,
                minTradeEquityFutureIndex : req.body.equityFutures.ordersAway,
                maxTradeEquityFutureIndex : req.body.equityFutures.ordersAway,
                maxLotSizeScript : req.body.equityFutures.ordersAway,
                maxLotSizeScriptIndex : req.body.equityFutures.ordersAway,
                maxOverallScript : req.body.equityFutures.ordersAway,
                maxOverallIndex : req.body.equityFutures.ordersAway,
             },
             transactionPassword : bcrypt.hashSync(req.body.transactionPassword, 10) ,
         },
            {
                new:true
            }
        )  
        if(!broker)
         return res.status(200).json({success:true, message:"User not registered.", data: {}});
         res.json({success:true, message:"Broker registered successfully.", data:{ id : broker.id}});
        }) 
    
    // To Delete Broker By Id

 router.delete('/remove-broker/:id', (req,res)=>{
    Broker.findByIdAndRemove(req.params.id).then(broker=>{
        if(broker){
            return res.status(200).json({success:true, message: 'Broker deleted successfully'})
        }
        else{
            return res.status(404).json({success:false, message: 'User not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success :false, error : err})
    })
   })
    
    
    // Get All admin broker
    
    router.get('/get/all-broker/', async (req,res)=>{
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
     const brokerList = await Broker.find(filter).select('-passwordHash -config -mcxFutures -mcxExposureLotWise -equityFutures');
     if(!brokerList){
         res.status(500).json({success: false, message:"All broker list.", data:[]})
     }
     res.status(200).json({success:true, message:"All broker list.", data:brokerList});
    
    })
    
    // Get broker by id
    
    router.get('/get/broker/:id', async (req,res)=>{
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
         const broker = await Broker.find(filter).select('-passwordHash -mcxFutures -mcxExposureLotWise -equityFutures -config');
         if(!broker){
             res.status(500).json({success: false, message:"No Broker Found.", data:[]})
         }
         res.status(200).json({success:true, message:"Broker Data.", data:broker});
        
        })
    
    
    // Create User Funds 
    
    router.post(`/broker-funds`, async (req,res)=>{
        const token=req.headers['authorization'];
        if(!token)
        return res.status(200).json({success:false, message:"Token not Found.", data:[]});
        const bearerToken=decodedToken(token);
        if(bearerToken.userType!='admin')
        {
            return res.status(200).json({success:false, message:"You are not authorized user.", data:[]});
        }
        const adminId=bearerToken.adminID;
        let admin = await Admin.findById(adminId);
        if(!bcrypt.compareSync(req.body.transactionPassword, admin.transactionPassword))
        {
         return   res.status(200).json({success: false, message : "Transaction passwrod Not matched."});
        }
        let funds = new brokerFunds({
            broker : req.body.broker,
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
    
    router.get('/get/broker-funds', async (req,res)=>{
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
         const fundsList = await brokerFunds.find(filter).populate('user');
         if(!fundsList){
             res.status(500).json({success: false, message:"All broker list.", data:[]})
         }
         res.status(200).json({success:true, message:"All broker list.", data:fundsList});
        
        })
        
        // Get User fund details by id
        
       router.get('/get/broker-funds/:id', async (req,res)=>{
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
             const fund = await brokerFunds.find(filter).populate('user');
             if(!fund){
                 res.status(500).json({success: false, message:"No Funds Found.", data:{}})
             }
             res.status(200).json({success:true, message:"Fund Data.", data:fund});
            })



// Get All broker users

 router.get('/get/all-user/:id', async (req,res)=>{
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
    filter ={broker : req.params.id}
    console.log(filter)
    }
     const userList = await User.find(filter).select('-passwordHash -config -other -mcxFutures -mcxExposureLotWise -equityFutures');;
     if(!userList){
         res.status(500).json({success: false})
     }

      res.status(200).json({success:true, message:"All UsersList.", data:userList});
    
  })

module.exports= router;