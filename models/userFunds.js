const mongoose=require('mongoose');

const userFundsSchema = mongoose.Schema({
    user : { 
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

userFundsSchema.virtual('id').get(function(){
    return this._id.toHexString();x
});

userFundsSchema.set('toJSON',{
    virtuals: true,
})

exports.userFunds = mongoose.model('userFunds', userFundsSchema);
exports.userFundsSchema=userFundsSchema; 