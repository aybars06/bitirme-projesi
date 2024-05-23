import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
const { Schema } = mongoose;

const userModel = new Schema({
    name:{
        type:String,
        trim:true,
        required:[true, "İsim girmek zorunludur..."]
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Kullanıcı adı girmek zorunludur..."],
    },
    password: {
        type: String,
        required: [true, "Şife kısmı boş bırakılamaz..."],
        minLength:[4, "4 karakterden fazla bir şifre giriniz..."]
    },
    
    k_tarihi: {
        type: Date,
        default: Date.now,
    },
    role:{
        type: String,
        enum:["member","admin"],
        default: "member"
    }
},
{
    timestamps:true,
}
);

userModel.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model('User', userModel);
export default User