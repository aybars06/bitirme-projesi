import Category from "../models/category.js"

const createCategory = async (req, res) => {
    try {
        const categoryInfo = req.body

        const category =await Category.create(categoryInfo)

        res.status(201).json({
            status: "Success",
            category
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Sunucu hatası." });
    }
}
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Sunucu hatası." });
    }
}

const getACategory = async (req, res) => {
    try {
      // Fetch a specific category from the database
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Kategori Bulunumadı." });
      }
      res.render("category", { categories: [category], link: "category" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Sunucu Hatası." });
    }
  };

export { createCategory, getAllCategories, getACategory }