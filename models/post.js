import mongoose from "mongoose";
const { Schema } = mongoose;

const post = new Schema({

    diseaseID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    postName: {
        type: String,
        required: true,
        trim: true
    },
    descripiton: {
        type: String,
        required: true,
        trim: true
    },
    hitCount:{
        type:Number,
        default:0
    },
    postDate:{
        type:Date,
        default:Date.now
    },
    author:{
        type:String,
        trim:true,
        required:true
    }

})

const Post =mongoose.model("Post",post)
export default Post