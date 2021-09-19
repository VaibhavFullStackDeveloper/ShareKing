const mongoose=require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required:true,
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
    config:{
        orders_high_low:{
            type : Boolean,
            default : false,
            required:true
        },
        trigger_order_high_low:{
            type: String,
            default : '',
        },
        auto_close:{
            type :Number,
            default:0,
        },
        notify_client:{
            type: Number,
            default:0,
        }
    },

})
userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

userSchema.set('toJSON',{
    virtuals: true,
})

exports.User = mongoose.model('User', userSchema);
exports.userSchema=userSchema; 