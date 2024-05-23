import Category from "../models/category.js";
import Post from "../models/post.js";
const getIndexPage = async (req, res) => {
  const posts = await Post.find();
  const category = await Category.find()
  res.render("index", {
    posts,category
  });
};
const getAboutPage = (req, res) => (
    res.render("about")
)
const getRegisterPage = (req, res) => (
  res.render("signup", {
    link:"signup",
  })
)
const getLoginPage = (req, res) => (
  res.render("login", {
    link:"login",
  })
)
export {getIndexPage, getAboutPage, getRegisterPage, getLoginPage}