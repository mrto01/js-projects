const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Cryptojs = require("crypto-js");

// register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: Cryptojs.AES.encrypt(
            req.body.password,
            process.env.KEY
        ).toString(),
    });
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json({ err: "register failured!" });
    }
});
// Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.json("Wrong password or username");
        }
        const bytes = Cryptojs.AES.decrypt(user.password, process.env.KEY);
        const originalPassWord = bytes.toString(Cryptojs.enc.Utf8);
        if (originalPassWord !== req.body.password) {
            return res.json("Wrong password or username");
        }
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.KEY
        );
        const { password, ...info } = user._doc;
        res.status(200).json({ ...info, token });
    } catch (err) {
        res.status(500).json({ err });
    }
});

module.exports = router;
