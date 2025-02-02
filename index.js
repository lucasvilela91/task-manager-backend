const express = require("express");
const dotenv = require("dotenv");
const taskRouter = require("./src/routes/task.routes");

const connectDB = require("./src/database/mongoose.database");

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use("/tasks", taskRouter);

app.listen(3000, () => console.log("Listening on port 3000"));
