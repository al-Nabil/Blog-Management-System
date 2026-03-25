const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
    updateProfile
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);

router.post("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.json({ message: "Logged out successfully" });
});

module.exports = router;