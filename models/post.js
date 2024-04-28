import mongoose from "mongoose";
const { Schema } = mongoose;

const post = new Schema({

    diseaseID: {
        type: String,
        required: true
    },

    postName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    like:{
        type:Number,
        default:0
    },
    dislike:{
        type:Number,
        default:0
    },
    comment:{
        type: String,
        trim: true
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