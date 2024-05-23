import express from "express";
import * as categoryController from "../controllers/categories.js"

const router = express.Router()

router.route("/categoryCreate").post(categoryController.createCategory)
router.route('/getCategories').get(categoryController.getAllCategories)
router.route("/:id").get(categoryController.getACategory)
export default router