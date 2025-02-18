import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
    type:String,
    required: true,
    trim:true,

},
    lastName: {
        type:String,
        required: true,
        trim:true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim:true,
       
        
    },
    password: {
        type:String,
        minLength:6,
        maxLength:100,
    required: true,},

});
const User = mongoose.model('User' , userSchema);

export {User}