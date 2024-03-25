import mongoose from "mongoose";
const {Schema } = mongoose

const categories = new Schema({
    categoriesName:{
        type:String,
        trim:true,
        unique:true,
        required:true
    }
})

const Category = mongoose.model('Category', categories);
 export default Category