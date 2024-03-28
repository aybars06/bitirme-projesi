import Post from "../models/post.js"
import Disease from "../models/disease.js"

const createPost = async (req, res) => {
    try {
        const postInfo = req.body
        const isPost = await Disease.findOne({ _id: postInfo.diseaseID })
        if (isPost) {
            const post = await Post.create(postInfo)
            res.status(201).json({
                status: "Success",
                post
            })

        }
        else {
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
        const posts = await Disease.find();

        if (posts.length > 0) {
            return res.status(200).render("posts",{
                posts
            })
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

export { createPost, getPost}