const { Schema, model } = require("mongoose");

const taskSchema = Schema({
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

const taskSchema = model("task", taskSchema);

module.exports = taskSchema;
