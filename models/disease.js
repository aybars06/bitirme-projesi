import mongoose from "mongoose";
const {Schema } = mongoose

const diseases = new Schema({
    categoriesID:{
        type:String,
        trim:true,
        required:true
    },
    diseaseName:{
        type:String,
        trim:true,
        required:true
    }
})

const Disease = mongoose.model('Disease', diseases);
 export default Disease