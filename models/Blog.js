const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    blogImage: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

blogSchema.index({ title: "text" });

module.exports = mongoose.model("Blog", blogSchema);