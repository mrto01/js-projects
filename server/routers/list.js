const router = require("express").Router();
const List = require("../models/List");
const verify = require("../middleware/verifyToken");
const Movie = require("../models/Movie");

// create
router.post("/", verify, async (req, res) => {
    if (req.data.isAdmin) {
        const list = req.body;
        let content = [];
        try {
            content = await Movie.find({
                _id: {
                    $in: list.content,
                },
            });
            const newList = new List({
                ...list,
                content: content,
            });
            const createdList = await newList.save();
            res.status(201).json(createdList);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
});

// delete
router.delete("/:id", verify, async (req, res) => {
    if (req.data.isAdmin) {
        await List.findByIdAndDelete(req.params.id);
        res.status(200).json("The list has been deleted....");
    } else {
        res.status(403).json("You are not allowed!");
    }
});

// get
router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([
                    { $match: { type: typeQuery, genre: genreQuery } },
                    { $sample: { size: 5 } }
                ]);
            } else {
                list = await List.aggregate([
                    { $match: { type: typeQuery } },
                    { $sample: { size: 5 } },
                ]);
            }
        } else {
            list = await List.aggregate([{ $sample: { size: 5 } }]);
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get search
router.get("/search", verify, async (req, res) => {
    const key = req.query.key;
    try {
        const lists = await List.find({
            title: { $regex: ".*" + key + ".*", $options: "i" },
        });
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get related
router.get("/related", verify, async (req, res) => {
    const genreQuery = req.query.genre;
    try {
        const list = await List.aggregate([
            { $match: { genre: { $regex: genreQuery } } },
            { $sample: { size: 1 } },
        ]);
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all

router.get("/all", verify, async (req, res) => {
    let list = [];
    try {
        list = await List.find().sort({ _id: -1 });
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
