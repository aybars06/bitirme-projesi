import express from "express";
import * as diseaseController from "../controllers/disease.js"

const router = express.Router()

router.route("/diseaseCreate").post(diseaseController.diseaseCreate)
router.route('/:id').get(diseaseController.getAllDiseasesByCategory);
export default router