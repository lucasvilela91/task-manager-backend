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
    return new taskController(req, res).delete();
});

module.exports = router;
