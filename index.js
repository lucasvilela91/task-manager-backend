const express = require("express");
const dotenv = require("dotenv");
const taskRouter = require("./src/routes/task.routes");

const connectDB = require("./src/database/mongoose.database");

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.use("/tasks", taskRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
