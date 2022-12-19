const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String , required: true},
        img: { type: String , required: true},
        imgSm: { type: String , required: true},
        trailer: { type: String, default: "" },
        video: { type: String,required: true, default: "" },
        duration: { type: String },
        year: { type: String },
        limit: { type: Number },
        genre: { type: Array },
        isSeries: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Movie", movieSchema);
