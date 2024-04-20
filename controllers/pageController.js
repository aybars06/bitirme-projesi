import Post from "../models/post.js"
const getIndexPage = async (req, res) => {
res.render("index")
};

const getAboutPage = (req, res) => (
    res.render("about")
)

export {getIndexPage, getAboutPage}
