const authRoute = require("./auth");
const userRoute = require("./user");
const movieRoute = require("./movie");
const listRoute = require("./list");

module.exports = function (app) {
    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/movies", movieRoute);
    app.use("/api/lists", listRoute);
};
