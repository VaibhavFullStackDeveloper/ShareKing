const mongoose=require('mongoose');

const actionLedgerSchema = mongoose.Schema({
    user : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    message:{
        type : String,
        required:true,
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

actionLedgerSchema.virtual('id').get(function(){
    return this._id.toHexString();x
});

actionLedgerSchema.set('toJSON',{
    virtuals: true,
})

exports.actionLedger = mongoose.model('actionLedger', actionLedgerSchema);
exports.actionLedgerSchema=actionLedgerSchema; 