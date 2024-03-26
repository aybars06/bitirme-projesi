import express from "express";
import * as postController from "../controllers/postController.js"

const router = express.Router()

router.route("/CreatePost").post(postController.createPost)
router.route("/getPost").post(postController.getPost);

export default router