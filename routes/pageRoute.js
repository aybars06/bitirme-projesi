import express from "express"
import * as PageController from "../controllers/pageController.js"
import redirectMiddleware from "../middlewares/redirectMiddleware.js"
const router = express.Router()


router.route("/").get(PageController.getIndexPage)
router.route("/about").get(PageController.getAboutPage)
router.route("/signup").get(redirectMiddleware, PageController.getRegisterPage)
router.route("/login").get(redirectMiddleware, PageController.getLoginPage)
export default router
