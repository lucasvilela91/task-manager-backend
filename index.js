const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./src/database/mongoose.database");
const taskModel = require("./src/models/task.model");

dotenv.config();
const app = express();

connectDB();

app.get("/tasks", async (req, res) => {
    const tasks = await taskModel.find({});
    res.status(200).send(tasks);
});

app.listen(3000, () => console.log("Listening on port 3000"));
