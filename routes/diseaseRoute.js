import express from "express";
import * as diseaseController from "../controllers/disease.js"

const router = express.Router()

router.route("/diseaseCreate").post(diseaseController.diseaseCreate)

export default router