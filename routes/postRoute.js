import express from "express";
import * as postController from "../controllers/postController.js"

const router = express.Router()
router.route("/").get(postController.getPost)
router.route("/createPost").post(postController.createPost);
router.route("/getPostByCategory").post(postController.getPostByCategory);
router.route("/:id").get(postController.getApost)
export default router