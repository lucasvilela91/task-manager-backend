const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./src/database/mongoose.database");
const taskModel = require("./src/models/task.model");

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await taskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        // Verifica se o ID é válido (opcional, depende da sua implementação)
        if (!taskId) {
            return res.status(400).send("ID inválido.");
        }

        const task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).send("Essa tarefa não foi encontrada!");
        }

        return res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const newTask = new taskModel(req.body);

        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.patch("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        const taskToUpdate = await taskModel.findById(taskId);

        const allowedUpdate = ["isCompleted"];
        const requestUpdates = Object.keys(taskData);

        for (let update of requestUpdates) {
            if (allowedUpdate.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                return res
                    .status(500)
                    .send("Um ou mais campos inseridos não são editáveis.");
            }
        }
        await taskToUpdate.save();
        return res.status(200).send(taskToUpdate);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskToDelete = await taskModel.findById(taskId);

        if (!taskToDelete) {
            return res.status(404).send("Essa tarefa não foi encontrada.");
        }

        const deletedTask = await taskModel.findByIdAndDelete(taskId);

        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(3000, () => console.log("Listening on port 3000"));
