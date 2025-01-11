const express = require("express");
const {
  getBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog,
} = require("../controlers/blog");
const upload = require("../middlewares/uploadFile");
const authToken = require("../middlewares/authToken")

const blogRoute = express.Router();

// blogRoute.use(authToken);
blogRoute.get("/", authToken, getBlogs);
blogRoute.post("/",authToken, upload.single("image"), createBlog);
blogRoute.get("/:blog_id",authToken,  getBlog);
blogRoute.delete("/:blog_id",authToken, deleteBlog);
blogRoute.put("/:blog_id",authToken, upload.single("image"), updateBlog);

module.exports = blogRoute;
