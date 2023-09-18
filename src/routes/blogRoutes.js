const express = require("express");
const { getBlogs, createBlog, deleteBlog, updateBlog } = require("../controllers/blogController");
const auth = require("../middlewares/auth");
const blogRouter = express.Router();

blogRouter.get("/", auth, getBlogs);

blogRouter.post("/", auth, createBlog);

blogRouter.delete("/:id", auth, deleteBlog);

blogRouter.put("/:id", auth, updateBlog);

module.exports = blogRouter;