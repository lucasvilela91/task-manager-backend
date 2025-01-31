const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./src/database/mongoose.database");

dotenv.config();
const app = express();

connectDB();

app.get("/tasks", function (req, res) {
    const tasks = [{ description: "Estudar programação", isCompleted: false }];
    res.status(200).send(tasks);
});

app.listen(3000, () => console.log("Listening on port 3000"));
