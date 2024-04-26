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

export {getIndexPage, getAboutPage}