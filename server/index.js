const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routers");
const cors = require("cors");

dotenv.config();

app.use(cors());
mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("database connection successful!!!");
    })
    .catch(err => {});

const port = 5000;

app.use(express.json());
routes(app);

app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});
