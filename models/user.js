const { text } = require('express');
const mongoose=require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required:true,
    },
    mobile : {
        type : String,
        default : ''
    },
    userName : {
        type : String,
        required:true,
    },
    creditLimit:{
        type :  String ,
        default : ''
    },
    passwordHash : { 
        type : String,
        required:true,
    },
    city : {
        type : String,
        default: '',
    },
    admin : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Admin'
    },
    config : {
        orderBetweenHighLow : {
            type:Boolean,
            default:true,
        },
        bidAsk : {
            type:Boolean,
            default:true,
        },
        unitInstedLots : {
            type:Boolean,
            default:true,
        },
        accountStatus : {
            type:Boolean,
            default:true,
        },
        autoCloseActiveTrades : {
            type : String,
            default : ''
        },
        notifyClientForLoss : {
            type : String ,
            default : ''
        },
        userType:{
            type:String,
            default:'user',
        }
    },
    mcxFutures : {
        trading : {
            type : Boolean,
            default : false
        },
        minSingleTrade : {
            type : String,
            default : ''     
        },
        maxSingleTrade : {
            type : String,
            default : '' 
        },
        maxScript : {
            type : String,
            default : ''  
        },
        maxCommodity : {
            type : String,
            default : ''    
        },
        brokerageType : {
            type : String,
            default : ''         
        },
        brokerage : {
            type : String,
            default : ''        
        },
        exposureType : {
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
    },
    equityFutures : {
        trading : {
            type : Boolean,
            default : false
        },
        minSingleTrade : {
            type : String,
            default : ''
        },
        maxSingleTrade : {
            type : String,
            default : ''
        },
        minSingleTradeIndex : {
            type : String,
            default : ''
        },
        maxSingleTradeIndex : {
            type : String,
            default : ''
        },
        maxScript : {
            type : String,
            default : ''
        },
        maxScriptIndex : {
            type : String,
            default : ''
        },
        brokerageType : {
            type : String,
            default : ''
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
        maxSizeAllEquity : {
            type : String,
            default : ''
        },
        maxSizeIndex : {
            type : String,
            default : ''
        }
    },
    other : {
        notes : {
            type : String,
            default : ''
        },
        transactionPassword : {
            type : String,
            required : true,
        }
    },
    broker : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Broker',
        required : true,
    },
})

userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});


// Get Converted data

userSchema.set('toJSON', {
    getters: true,
    transform: (doc, ret) => {
      if (ret.creditLimit) {
        ret.creditLimit = ret.creditLimit.toString();
      }
      delete ret.__v;
      return ret;
    },
});


// Normal that helps to convert data to json

// userSchema.set('toJSON',{
//     virtuals: true,
// })

exports.User = mongoose.model('User', userSchema);
exports.userSchema=userSchema; 