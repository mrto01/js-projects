const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../middleware/verifyToken");

// create
router.post("/", verify, async (req, res) => {
    if (req.data.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const createdMovie = await newMovie.save();
            res.status(201).json(createdMovie);
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
});

// update
router.put("/:id", verify, async (req, res) => {
    if (req.data.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedMovie);
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
});

// delete
router.delete("/:id", verify, async (req, res) => {
    if (req.data.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("The movie has been deleted...");
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(403).json("You are not allowed!");
    }
});

// get random
router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    const genre = req.query.genre;
    let movie;
    try {
        if (type === "series") {
            if (genre) {
                movie = await Movie.aggregate([
                    { $match: { isSeries: true, genre: { $regex: genre } } },
                    { $sample: { size: 1 } },
                ]);
            } else {
                movie = await Movie.aggregate([
                    { $match: { isSeries: true } },
                    { $sample: { size: 1 } },
                ]);
            }
        } else {
            if (genre) {
                movie = await Movie.aggregate([
                    { $match: { isSeries: false, genre: { $regex: genre } } },
                    { $sample: { size: 1 } },
                ]);
            } else {
                movie = await Movie.aggregate([
                    { $match: { isSeries: false } },
                    { $sample: { size: 1 } },
                ]);
            }
        }
        res.status(200).json(movie);
    } catch (e) {
        res.status(500).json(e);
    }
});

// get search
router.get("/search", verify, async (req, res) => {
    const key = req.query.key;
    try {
        const movie1 = await Movie.find({
            title: { $regex: ".*" + key + ".*", $options: "i" },
        }).limit(20);
        const movie2 = await Movie.find({
            genre: { $regex: ".*" + key + ".*", $options: "i" },
        }).limit(20);
        res.json(movie1.concat(movie2));
    } catch (err) {
        res.status(500).json(err);
    }
});

// get
router.get("/:id", verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (e) {
        res.status(500).json(e);
    }
});

//
router.get("/", verify, async (req, res) => {
    if (req.data.isAdmin) {
        try {
            const movie = await Movie.find().sort({ _id: -1 });
            res.status(200).json(movie);
        } catch (e) {
            res.status(500).json(e);
        }
    } else {
        res.status(403).json("You are not allowed");
    }
});

module.exports = router;
