const Blog = require("../models/Blog");

// CREATE BLOG
exports.createBlog = async (req, res) => {
    try {
        const { title, content, authorName, tags } = req.body;

        const blog = await Blog.create({
            title,
            content,
            authorName,
            tags,
            blogImage: req.file ? req.file.path : "",
            user: req.user._id
        });

        res.status(201).json(blog);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

// GET ALL BLOGS
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("user", "name email");

        res.json(blogs);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

// GET SINGLE BLOG
exports.getSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("user", "name email");

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json(blog);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        blog.tags = req.body.tags || blog.tags;

        if (req.file) {
            blog.blogImage = req.file.path;
        }

        const updatedBlog = await blog.save();

        res.json(updatedBlog);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE BLOG
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (blog.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await blog.deleteOne();

        res.json({ message: "Blog deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};