import express from "express";
import * as userController from "../controllers/user.js"

const router = express.Router()

router.route("/passwordChanged").post(userController.passwordChanged)

export default router