import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,         
    verified:{
        type:Boolean,
        default:false
    },
    role:String,
    course: String,
    specialization: String,
    about: String,
    passout: String,
    password: String,
    review:{
        type: Boolean,
        default: false
    },
    otp:String,
    otpVerified:{
        type:Boolean,
        default:false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    phone: String,
    photo: {
        type: String,
        default:''
    },
    linkedin:{
        type:String,
        default:''
    },
    github:{
        type:String,
        default:''
    },
});

 const User = mongoose.model('user', userSchema);

 export default User