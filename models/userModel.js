const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required : [true,"Username Required"],
        unique: true
    },
    name : {
        type: String,
        required: [true,"Name required "],
    },
    email : {
        type : String,
        required : [true , "Email required"],
        unique : true
    },
    gender : {
        type : String,
        enum : ['male','female']
    },
    active : {
        type : Boolean,
        default : true,
        select : false
    },
    card: [String],
    password:{
        type: String,
        required:[true,'Password is required'],
        select : false
    },
    role : {
        type : String,
        enum : ['admin', 'user'],
        default : 'user'
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
})


userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    // Delete passwordConfirm field
    // this.passwordConfirm = undefined;
    next();
  });

  userSchema.methods.correctPassword = async function(candidatePassword,userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

const User = mongoose.model('User', userSchema);
module.exports = User;