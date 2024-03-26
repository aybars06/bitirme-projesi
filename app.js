import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import conn from "./db.js"
import categoryRoute from "./routes/categoryRoute.js"
import diseaseRoute from "./routes/diseaseRoute.js"
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"
import pageRoute from "./routes/pageRoute.js"


const app = express();

 //Template Engine
 app.set("view engine", "ejs");

 //Middlewares
 app.use(express.static("public"));

 //routes
 app.use("/",pageRoute)
 
 /* app.get('/', (req, res)=>{
     res.status(200).render('index', {page_name: "index"});
 })
 app.get('/about', (req, res)=>{
     res.status(200).render('about', {page_name: "about"});
 }) */

dotenv.config()
conn()

const port = process.env.PORT

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/auth",authRoute)
app.use("/user",userRoute)
app.use("/category",categoryRoute)
app.use("/disease",diseaseRoute)

app.listen(port, () => { console.log(`app started on port ${port}`) })
