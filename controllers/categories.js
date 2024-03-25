import Category from "../models/category.js"

const createCategory = async (req, res) => {
    try {
        const categoryInfo = req.body

        const category = Category.create(categoryInfo)

        res.status(201).json({
            status: "Success",
            category: categoryInfo.categoriesName
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Sunucu hatası." });
    }
}
export { createCategory }