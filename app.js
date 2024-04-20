import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import conn from "./db.js"
import categoryRoute from "./routes/categoryRoute.js"
import diseaseRoute from "./routes/diseaseRoute.js"
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"
import pageRoute from "./routes/pageRoute.js"
import postRoute from "./routes/postRoute.js"

const app = express();

 //Template Engine
 app.set("view engine", "ejs");

 //Middlewares
 app.use(express.static("public"));

dotenv.config()
conn()

const port = process.env.PORT

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/",pageRoute)
app.use("/auth",authRoute)
app.use("/user",userRoute)
app.use("/category",categoryRoute)
app.use("/disease",diseaseRoute)
app.use("/posts",postRoute)
app.listen(port, () => { console.log(`app started on port ${port}`) })
