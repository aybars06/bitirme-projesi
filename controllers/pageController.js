import Post from "../models/post.js";
const getIndexPage = async (req, res) => {
  const posts = await Post.find();
  res.render("index", {
    posts,
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