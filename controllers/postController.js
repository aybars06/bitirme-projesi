import Post from "../models/post.js"
import Disease from "../models/disease.js"
import Category from "../models/category.js";
import {v2 as cloudinary} from "cloudinary"
const createPost = async (req, res) => {

    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            user_filename: true,
            folder:"bitirme_projesi"
        }
    );
    console.log("Result", result)
    try {
        const postInfo = req.body
        const isPost = await Disease.findOne({ _id: postInfo.diseaseID })
        if (isPost) {
            const post = await Post.create({postInfo,
                url: result.secure_url
        })
            res.status(201).json({
                status: "Success",
                post
            })

        }
        else {
            console.log(isPost)
            res.status(400).json({
                status: "fail",
                msg: "Hastalık bulunamadı"
            })
        }



    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Sunucu hatası." });
    }
};

const getPost = async (req, res) => {
    try {
        // Tüm gönderileri veritabanından çek

        if (posts.length > 0) {
            // index.ejs dosyasını render ederken posts değişkenini geçir
            res.render("posts", {
                link: 'posts',
                posts
            });

        } else {
            return res.status(404).json({
                status: "fail",
                msg: "Hiç gönderi bulunamadı."
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Sunucu hatası." });
    }
};
const getPostByCategory = async (req, res) => {
    try {
        const { categoryID } = req.body;
        if (categoryID == "0") {
            const postss = await Post.find().sort('-postDate')
            if (postss.length > 0) {
                postss
            }
            res.status(200).json({ posts: postss });
        } else {
           
            // Disease modelinden kategorilere bağlı hastalıkları bul
            const diseases = await Disease.find({ categoriesID: categoryID }).select('_id');
            const diseasesID = diseases.map(disease => disease._id);
            
            // Bulunan hastalık ID'lerine bağlı postları bul
            const posts = await Post.find({ diseaseID: { $in: diseasesID } });
            
            if (posts.length > 0) {
                res.status(200).json({ posts });
            } else {
                res.status(404).json({ msg: "Post bulunamadı" });
            }
        }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Sunucu hatası." });
        }
}

const getApost = async (req, res) => {
    try {
        // Belirli bir gönderiyi veritabanından çek
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Gönderi bulunamadı." });
        }

        // Gönderiye ait hastalığı bul
        const disease = await Disease.findById(post.diseaseID);
        if (!disease) {
            return res.status(404).json({ message: "Hastalık bulunamadı." });
        }

        // Hastalığa ait kategoriyi bul
        const category = await Category.findById(disease.categoriesID);
        if (!category) {
            return res.status(404).json({ message: "Kategori bulunamadı." });
        }

        // Tüm kategorileri veritabanından çek
        const categories = await Category.find();
        console.log("Category:", category);
        console.log("Type of Category:", typeof category);
        
        // Postu ve kategorileri render et
        res.render("posts", { posts: [post], category, categories, link: "posts" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Sunucu hatası." });
    }
};


export { createPost, getPost, getApost, getPostByCategory }