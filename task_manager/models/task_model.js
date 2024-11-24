import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be provied"],
    trim: true,
    maxlength: [25, "name can not be more then 25 chars"],
  },
  description: {
    type: String
  },
    completed: {
        type: Boolean,
        default: false
  },
}); // structure of each document in task model

export const Task = mongoose.model("Task", TaskSchema); // new we can use this model in controllers
