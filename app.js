import express from "express"
import dotenv from "dotenv"
import session from "express-session"
import mongoose from "mongoose"
import MongoStore from "connect-mongo"
import conn from "./db.js"
import categoryRoute from "./routes/categoryRoute.js"
import diseaseRoute from "./routes/diseaseRoute.js"
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"
import pageRoute from "./routes/pageRoute.js"
import postRoute from "./routes/postRoute.js" 
import fileUpload from 'express-fileupload';
import {v2 as cloudinary} from "cloudinary"
const app = express();

 //Template Engine
 app.set("view engine", "ejs");

 //Global Variable
 global.userIN = null;
 //Middlewares
 app.use(express.static("public"));

dotenv.config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})
conn()

const port = process.env.PORT


app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(fileUpload({ useTempFiles: true }));
app.use(session({
    secret: 'keyboard cat',
    resave:false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/bitirme-projesi"})
}))
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
});
app.use("/",pageRoute)
app.use(authRoute)
app.use(userRoute)
app.use("/category",categoryRoute)
app.use("/disease",diseaseRoute)
app.use("/posts",postRoute)
app.listen(port, () => { console.log(`app started on port ${port}`) })
