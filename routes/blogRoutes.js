const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createBlog,
    getBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");

router.post("/", protect, createBlog);
router.get("/", protect, getBlogs);
router.get("/:id", protect, getSingleBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;