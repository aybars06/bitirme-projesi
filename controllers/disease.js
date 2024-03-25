import Disease from "../models/disease.js"
import Category from "../models/category.js"

const diseaseCreate = async (req, res) => {
    try {
        const diseaseInfo = req.body

        const isDisease = await Category.findOne({ _id: diseaseInfo.categoriesID })


        if (isDisease) {
            const disease = await Disease.create(diseaseInfo)
            res.status(201).json({
                status: "Success",
                disease
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Sunucu hatası." });
    }
}
export { diseaseCreate }