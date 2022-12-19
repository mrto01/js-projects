const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: "string", default: ""},
        email: { type: "string", required: true, unique: true },
        password: { type: "string", required: true },
        profilePic: { type: "string", default: "" },
        isAdmin: { type: "boolean", default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
