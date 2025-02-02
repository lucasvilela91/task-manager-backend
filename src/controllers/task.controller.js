const taskModel = require("../models/task.model");

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

            // Verifica se o ID é válido (opcional, depende da sua implementação)
            if (!taskId) {
                return this.res.status(400).send("ID inválido.");
            }

            const task = await taskModel.findById(taskId);

            if (!task) {
                return this.res
                    .status(404)
                    .send("Essa tarefa não foi encontrada!");
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

            const allowedUpdate = ["isCompleted"];
            const requestUpdates = Object.keys(taskData);

            for (let update of requestUpdates) {
                if (allowedUpdate.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return this.res
                        .status(500)
                        .send("Um ou mais campos inseridos não são editáveis.");
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
                return this.res
                    .status(404)
                    .send("Essa tarefa não foi encontrada.");
            }

            const deletedTask = await taskModel.findByIdAndDelete(taskId);

            this.res.status(200).send(deletedTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = taskController;
