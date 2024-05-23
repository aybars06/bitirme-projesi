import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import categories from "../models/category.js";
import diseases from "../models/disease.js";
import Post from "../models/post.js";
const createUser = async (req, res) => {
    try {
        const user = req.body;
        const existingUser = await User.findOne({ username: user.username });
        if (existingUser) {
            return res.status(475).json({
                msg: "Kullanıcı adı daha önce alındı.",
            });
        }
        else {
            await User.create(user);
            res.status(200).json({ user });
        }
    }
    catch (error) {
        let errors2 = {} //Önce boş obje oluşturduk hata mesajlarını yazabilmek için

        if (error.name === "ValidationError") {
            Object.keys(error.errors).forEach((key) => {
                errors2[key] = error.errors[key].message;
            });
        }
        
        console.error(error);

        return res.status(400).json({
          errors2
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            console.log("Kullanıcı bulunamadı");
            return res.status(475).json({ msg: "Kullanıcı adı veya şifre yanlış" });
        } else {
            bcrypt.compare(password, user.password, async (err, same) => {
                if (same) {
                    console.log("Giriş başarılı");
                    // Bcrypt karşılaştırması tamamlandığında userID'yi güncelleyin
                    req.session.userID = user._id;
                    // Oturum kimliğini güncelledikten sonra yönlendirme yapın
                    return res.status(200).redirect('/dashboard');
                } else {
                    console.log("Şifre yanlış");
                    return res.status(475).json({ msg: "Kullanıcı adı veya şifre yanlış." });
                }
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Sunucu hatası" });
    }
};

/* const createToken = (userId) => {
    return jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"1d",
    }
    )
}
*/

const logoutUser = async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}
const getDashboardPage = async (req, res) => {
    // Oturum bilgilerini al
    const userID = req.session.userID;
    const category = await categories.find();
    const disease = await diseases.find();
   
    if (userID) {
        // Oturum açmış kullanıcı varsa, veritabanından kullanıcı bilgilerini al
        try {
            const user = await User.findById(userID);
            if (user) {
                const posts = await Post.find({author:user.username})
                console.log(posts)
                // Kullanıcı bulunduğunda, dashboard sayfasını render et ve kullanıcı bilgilerini aktar
                res.render("dashboard", {
                    user: user,
                    category,
                    disease,
                    posts
                });
            } else {
                // Kullanıcı bulunamadığında, giriş sayfasına yönlendir
                res.redirect("/login");
            }
        } catch (error) {
            console.error(error);
            // Veritabanı hatası olduğunda, sunucu hatası döndür
            return res.status(500).json({ msg: "Sunucu hatası" });
        }
    } else {
        // Oturum açmış kullanıcı yoksa, giriş sayfasına yönlendir
        res.redirect("/login");
    }
};


export { createUser, loginUser, logoutUser, getDashboardPage };