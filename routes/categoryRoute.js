import express from "express";
import * as categoryController from "../controllers/categories.js"

const router = express.Router()

router.route("/categoryCreate").post(categoryController.createCategory)

export default router