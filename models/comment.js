import mongoose from "mongoose";
import { Schema } from mongoose

const comments = new Schema({
    postID: {
        type: String,
        unique: true
    },
    diesaseID: {
        type: String,
        unique: true
    },
    comment: {
        type: String,
        trim: true,
        required: true
    },
    commentDate: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model("Comment", comments)
export default Comment