const blogModel = require("../models/blog");

const createBlog = async (req, res) =>{
    
    const {title, description} = req.body;

    const newBlog = new blogModel({
        title: title,
        description : description,
        userId : req.userId
    });

    try {
        
        await newBlog.save();
        res.status(201).json(newBlog);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
    
}

const updateBlog = async (req, res) =>{
    const blogId = req.params.blogId;
    
    try {const blog = await blogModel.findById(blogId);
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        if (blog.userId.toString() !== req.userId) {
          return res.status(403).json({ error: 'You are not authorized to update this Blog' });
        }
        const {title, description} = req.body;

    const newBlog = new blogModel({
        title: title,
        description : description,
        userId : req.userId
    });
        await blogModel.findByIdAndUpdate(blogId, newBlog, {new : true});
        res.status(200).json(newBlog);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "An error occurred while updating the Blog"});
        
    }
   

}

const deleteBlog = async (req, res) =>{

    const blogId = req.params.blogId;

    try {
        const blog = await blogModel.findById(blogId);
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        if (blog.userId.toString() !== req.userId) {
          return res.status(403).json({ error: 'You are not authorized to delete this Blog' });
        }
        await blog.remove();
        res.json({ message: 'Blog deleted successfully' });
      } catch (error) {
        res.status(500).json({ error:"Something went wrong"});
    
}
}

const getBlogs = async (req, res) =>{
    try {
        
        const blogs = await blogModel.find({userId : req.userId});
        res.status(200).json(blogs);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogs
}