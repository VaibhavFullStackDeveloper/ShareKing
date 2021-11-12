const mongoose=require('mongoose');

const brokerFundsSchema = mongoose.Schema({
    broker : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    funds:{
        type : String,
        required:true,
    },
    notes:{
        type : String,
        default : ''
    },
   createdAt:{
        type : Date,
        default : Date.now()
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Admin',
        default : ''
    }
})

brokerFundsSchema.virtual('id').get(function(){
    return this._id.toHexString();x
});

brokerFundsSchema.set('toJSON',{
    virtuals: true,
})

exports.brokerFunds = mongoose.model('brokerFunds', brokerFundsSchema);
exports.brokerFundsSchema=brokerFundsSchema; 