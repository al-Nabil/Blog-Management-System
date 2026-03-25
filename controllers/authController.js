const User = require("../models/User");

const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");

// REGISTER
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password,
            phoneNumber
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber
                }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

// LOGIN
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

// GET PROFILE
exports.getProfile = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {

            user.name = req.body.name || user.name;
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phoneNumber: updatedUser.phoneNumber
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};