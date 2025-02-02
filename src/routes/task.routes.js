const express = require("express");
const taskModel = require("../models/task.model");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const tasks = await taskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
    try {
        const newTask = new taskModel(req.body);

        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

module.exports = router;
