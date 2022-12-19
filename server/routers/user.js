const router = require("express").Router();
const User = require("../models/User");
const verify = require("../middleware/verifyToken");
const Cryptojs = require("crypto-js");

// update user
router.put("/:id", verify, async (req, res) => {
    if (req.data.id === req.params.id || req.data.isAdmin) {
        try {
            const userUpdated = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
            );
            res.status(200).json(userUpdated);
        } catch (e) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can only update your account!");
    }
});

// delete
router.delete("/:id", verify, async (req, res) => {
    if (req.data.id === req.params.id || req.data.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted!");
        } catch (e) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can only delete your account!");
    }
});

// get
router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (e) {
        res.status(500).json(err);
    }
});

// get all
router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (req.data.isAdmin) {
        try {
            const users = query
                ? await User.find().sort({ _id: -1 }).limit(5)
                : await User.find();
            res.status(200).json(users);
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
});

// stats

router.get("/stats", async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.getFullYear() - 1);
    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: {
                        $month: "$createdAt",
                    },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;
