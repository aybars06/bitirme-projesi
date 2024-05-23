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
const getAllDiseasesByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }
    const diseases = await Disease.find({ categoriesID: categoryId });
    res.json(diseases.map(disease => ({
      _id: disease._id,
      diseaseName: disease.diseaseName
    })));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

export { diseaseCreate, getAllDiseasesByCategory }