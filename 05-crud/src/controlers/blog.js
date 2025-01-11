const Blog = require("../models/blog");
const fs = require("fs");
const path = require("path");

const getBlogs = async (req, res) => {
  // find()  :  Array of OBJ
  const allBlogs = await Blog.find();
  
  res.json({
    blogs: allBlogs,
  });
};

const getBlog = async (req, res) => {
  try {
    const blog_id = req.params["blog_id"]; // 3

    // findOne filter Condition {title : blog_title} :- OBJ
    // if find filter condition base all possible match array OBJ
    const blog = await Blog.find({ _id: blog_id });

    if (!blog) {
      return res.status(404).json({
        msg: "This Blog dose not exist",
      });
    } else {
      return res.status(200).json({
        blog: blog,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "internal server error",
      error: error,
    });
  }
};

const createBlog = (req, res) => {
  // const buffur_img = req.file.buffer;
  const image = req.file.filename;
  const { title, content, tags } = req.body;
  Blog.create({ title, content, tags, image });

  res.json({
    msg: "Blog created",
  });
};

const updateBlog = async (req, res) => {
  // User Self, ADMIN
  try {
    const blog_id = req.params["blog_id"]; // 3
    const blog_data = req.body;
    const blog = await Blog.findOne({ _id: blog_id });

    if (!blog) {
      return res.json({
        msg: "This blog dose not exist",
      });
    } else {
      if (blog_data["title"]) {
        blog["title"] = blog_data["title"];
      }

      if (blog_data["content"]) {
        blog["content"] = blog_data["content"];
      }

      if (req.file && req.file.filename) {
        const oldFileName = blog["image"];

        if (oldFileName !== "") {
          const oldFilePath = path.join(
            __dirname,
            "..",
            "..",
            "public",
            "images",
            oldFileName
          );
          fs.unlinkSync(oldFilePath);
        }

        blog["image"] = req.file.filename;
      }

      if (blog_data["tags"]) {
        const index = blog.tags.indexOf(blog_data.tags.old);
        blog.tags.set(index, blog_data.tags.new);
      }

      blog.save();
      // mongo db will not chage without this

      return res.status(202).json({
        msg: "blog updated",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
      error: error,
    });
    console.log(error);
  }
};

const deleteBlog = async (req, res) => {
  // User self, ADMIN
  try {
    const blog_id = req.params["blog_id"]; // 3

    // OBJ (Document)
    // findById : id
    // findOne : {_id: blog_id}
    const blog = await Blog.findById(blog_id);

    if (!blog) {
      return res.json({
        msg: "this blog dose not exist",
      });
    } else {
      const fileName = blog["image"];

      if (fileName !== "") {
        const filePath = path.join(
          __dirname,
          "..",
          "..",
          "public",
          "images",
          fileName
        );
        fs.unlinkSync(filePath);
      }

      await Blog.deleteOne({ _id: blog_id });

      return res.status(202).json({
        msg: "blog removed",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "internal server error",
      error: error,
    });
  }
};

const addBlogTag = (req, res) => {
  res.json({
    msg: "tag updated",
  });
};

const removeBlogTag = (req, res) => {
  res.json({
    msg: "tag Removed",
  });
};

module.exports = { getBlogs, createBlog, getBlog, deleteBlog, updateBlog };
