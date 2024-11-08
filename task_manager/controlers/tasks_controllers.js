import { Task } from "../models/task_model.js";
import asyncHandler from "../utils/asyncHandler.js";

const getAllTasks = asyncHandler(async (req, res) => {
  const allTasks = await Task.find({});
  res.status(200).json({ tasks: allTasks });
});

const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

const getSingleTask = asyncHandler(async (req, res) => {
  // const id = req.params.id
  const task = await Task.findOne({ _id: req.params.id });

  if (!task) {
    return res
      .status(404)
      .json({ msg: `No task find with id ${req.params.id}` });
  }

  res.status(200).json({ task: task });
});

const UpdateTask = asyncHandler(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res.sttus(404).json({ msg: `Task with id: ${taskID} not found` });
  }
  res.status(200).json(task);
});

const deleteSingleTask = asyncHandler(async (req, res) => {
  const { id: taskID } = req.params;
  const deletedTask = await Task.findOneAndDelete({ _id: taskID });

  if (!deletedTask) {
    return res
      .status(404)
      .json({ msg: `No task with this id: ${taskID} found` });
  }

  res.status(200).json(deletedTask);
});

export { getAllTasks, createTask, getSingleTask, UpdateTask, deleteSingleTask };

// starting again
