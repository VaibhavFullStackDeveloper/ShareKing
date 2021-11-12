const { text } = require('express');
const mongoose=require('mongoose');

const brokerSchema = mongoose.Schema({
    firstName : {
        type : String,
        required:true,
    },
    lastName : {
        type : String,
        default : ''
    },
    userName : {
        type : String,
        required:true,
    },
    passwordHash : { 
        type : String,
        required:true,
    },
    creditLimit:{
        type : String,
        default : ''
    },
    userType : {
        type : String,
        required : true,
        default : 'broker',
    },
    maxTraders : {
        type : String,
        default : ''
    },
    accountStaus : {
        type : Boolean,
        default : false
    },
    admin : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Admin'
    },
    config : {
        autoCloseActiveTrades : {
            type : String,
            default : ''
        },
        notifyClientForLoss : {
            type : String,
            default : ''
        },
        profitLossShare : {
            type : String,
            default : ''
        },
    },
    mcxFutures : {
        trading : {
            type : Boolean,
            default : false
        },
        brokerageType : {
            type : String,
            default : ''
        },
        intradayExposure : {
            type : String,
            default : ''
        },
        holdingExposure : {
            type : String,
            default : ''
        },
        minSingleTrade : {
            type : String,
            default : '20.5'
        },
        maxSingleTrade : {
            type : String,
            default : '20.5'
        },
        brokerage : {
            type : String,
            default : '20.5'
        },
        maxAllowedOverall : {
            type : String,
            default : '20.5'
        },
        maxAllowedPerScript : {
            type : String,
            default : '20.5'
        },
    },
    mcxExposureLotWise : {
        bulldexIntraday : {
            type : String,
            default : ''
        },
        bulldexHolding : {
            type : String,
            default : ''
        },
        goldIntraday : {
            type : String,
            default : ''
        },
        goldHolding : {
            type : String,
            default : ''
        },
        silverIntraday : {
            type : String,
            default : ''
        },
        silverHolding : {
            type : String,
            default : ''
        },
        cruedOilIntraday : {
            type : String,
            default : ''
        },
        cruedOilHolding : {
            type : String,
            default : ''
        },
        copperIntraday : {
            type : String,
            default : ''
        },
        copperHolding : {
            type : String,
            default : ''
        },
        nickelIntraday : {
            type : String,
            default : ''
        },
        nickelHolding : {
            type : String,
            default : ''
        },
        zincIntraday : {
            type : String,
            default : ''
        },
        zincHolding : {
            type : String,
            default : ''
        },
        leadIntraday : {
            type : String,
            default : ''
        },
        leadHolding : {
            type : String,
            default : ''
        },
        naturalGasIntraday : {
            type : String,
            default : ''
        },
        naturalGasHolding : {
            type : String,
            default : ''
        },
        alluminiumIntraday : {
            type : String,
            default : ''
        },
        alluminiumHolding : {
            type : String,
            default : ''
        },
        menthOilIntraday : {
            type : String,
            default : ''
        },
        menthOilHolding : {
            type : String,
            default : ''
        },
        cottonIntraday : {
            type : String,
            default : ''
        },
        cottonHolding : {
            type : String,
            default : ''
        },
        cpoIntraday : {
            type : String,
            default : ''
        },
        cpoHolding : {
            type : String,
            default : ''
        },
        goldMiniIntraday : {
            type : String,
            default : ''
        },
        goldMiniHolding : {
            type : String,
            default : ''
        },
        silverMiniIntraday : {
            type : String,
            default : ''
        },
        silverMiniHolding : {
            type : String,
            default : ''
        },
        silverMicIntraday : {
            type : String,
            default : ''
        },
        silverMicHolding : {
            type : String,
            default : ''
        },
    },   
    equityFutures : {
        trading : {
            type : Boolean,
            default : false
        },
        brokerage : {
            type : String,
            default : ''
        },
        intradayExposure : {
            type : String,
            default : ''
        },
        holdingExposure : {
            type : String,
            default : ''
        },
        ordersAway : {
            type : String,
            default : ''
        },
        minTradeEquityFuture : {
            type : String,
            default : '20'
        },
        maxTradeEquityFuture : {
            type : String,
            default : '20'
        },
        minTradeEquityFutureIndex : {
            type : String,
            default : '20'
        },
        maxTradeEquityFutureIndex : {
            type : String,
            default : '20'
        },
        maxLotSizeScript : {
            type : String,
            default : '20'
        },
        maxLotSizeScriptIndex : {
            type : String,
            default : '20'
        },
        maxOverallScript : {
            type : String,
            default : '20'
        },
        maxOverallIndex : {
            type : String,
            default : '20'
        },
    },
    transactionPassword : {
        type : String,
        required : true
    },
})
brokerSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

brokerSchema.set('toJSON',{
    virtuals: true,
})

exports.Broker = mongoose.model('Broker', brokerSchema);
exports.brokerSchema=brokerSchema; 