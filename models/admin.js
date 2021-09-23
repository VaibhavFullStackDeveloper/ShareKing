const mongoose=require('mongoose');

const adminSchema = mongoose.Schema({
    firstName:{
        type : String,
        required:true,
    },
    userName:{
        type : String,
        required:true,
    },
    lastName:{
        type : String,
        required:true,
    },
    email:{
        type: String,
        required: true,
    },
   isAdmin:{
        type: Boolean,
        default: true,
    },
   passwordHash:{
        type : String,
        required:true,
    },
    userType:{
        type:String,
        required:true,
        default:'admin',
    }
})

adminSchema.virtual('id').get(function(){
    return this._id.toHexString();x
});

adminSchema.set('toJSON',{
    virtuals: true,
})

exports.Admin = mongoose.model('Admin', adminSchema);
exports.adminSchema=adminSchema; 