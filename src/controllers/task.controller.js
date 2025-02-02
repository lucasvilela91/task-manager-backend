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
}

module.exports = taskController;
