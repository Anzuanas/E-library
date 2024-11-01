const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CryptoJS = require("crypto-js");

// REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(401).json("Wrong Credentials!");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).json("Wrong Credentials!");
        }

        // Generate JWT token
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );

        // Destructure user object to exclude password
        const { password, ...others } = user._doc;

        // Return the complete user data including isAdmin status
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json("An error occurred during login.");
    }
});

module.exports = router;