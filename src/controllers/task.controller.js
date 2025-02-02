const taskModel = require("../models/task.model");
const { notFoundError } = require("../errors/mongodb.errors");
const { notAllowedFieldsToUpdateError } = require("../errors/general.errors");
class taskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasks() {
        try {
            const tasks = await taskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
    async getTaskById() {
        try {
            const taskId = this.req.params.id;

            const task = await taskModel.findById(taskId);

            if (!task) {
                return notFoundError(this.res);
            }

            return this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
    async create() {
        try {
            const newTask = new taskModel(this.req.body);

            await newTask.save();

            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
    async update() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            const taskToUpdate = await taskModel.findById(taskId);

            if (!taskToUpdate) {
                return notFoundError(this.res);
            }

            const allowedUpdate = ["isCompleted"];
            const requestUpdates = Object.keys(taskData);

            for (let update of requestUpdates) {
                if (allowedUpdate.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return notAllowedFieldsToUpdateError(this.res);
                }
            }
            await taskToUpdate.save();
            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            return this.res.status(500).send(error.message);
        }
    }
    async delete() {
        try {
            const taskId = this.req.params.id;

            const taskToDelete = await taskModel.findById(taskId);

            if (!taskToDelete) {
                return notFoundError(this.res);
            }

            const deletedTask = await taskModel.findByIdAndDelete(taskId);

            this.res.status(200).send(deletedTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = taskController;
