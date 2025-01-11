const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
      minLength: [5, "To short Title"],
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    content: String,
    tags: [String],
  },
  { timestamps: true }
);
// blogs
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
