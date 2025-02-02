const express = require("express");

const taskController = require("../controllers/task.controller");
const taskModel = require("../models/task.model");

const router = express.Router();

router.get("/", async (req, res) => {
    return new taskController(req, res).getTasks();
});

router.get("/:id", async (req, res) => {
    return new taskController(req, res).getTaskById();
});

router.post("/", async (req, res) => {
    return new taskController(req, res).create();
});

router.patch("/:id", async (req, res) => {
    return new taskController(req, res).update();
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
