import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum: ['user', 'admin'],
        default:"user",
        validate: {
            validator: function(v) {
                return ['user', 'admin'].includes(v);
            },
            message: props => `${props.value} is not a valid role!`
        }
    },
    phoneNumber:{
        type:String,
    },
    items:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Item",
        }
    ],

})
const User=mongoose.model('User',userSchema);
export default User;