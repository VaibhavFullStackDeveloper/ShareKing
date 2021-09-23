const mongoose=require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required:true,
    },
    mobile:{

    },
    userName:{
        type : String,
        required:true,
    },
    creditLimit:{
        type : String,
        required:true,
    },
    passwordHash:{
        type : String,
        required:true,
    },
    city:{
        type : String,
        default: '',
    },
    admin:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Admin',
        required : true,
    },
    config:{
        orderBetweenHighLow:{
            type:Boolean,
            default:true,
        },
        settingB:{
            type:Boolean,
            default:true,
        }
    }
})
userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

userSchema.set('toJSON',{
    virtuals: true,
})

exports.User = mongoose.model('User', userSchema);
exports.userSchema=userSchema; 