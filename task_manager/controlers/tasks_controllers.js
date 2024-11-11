import { Task } from "../models/task_model.js";
import asyncHandler from "../utils/asyncHandler.js";
import {createCustomApiError } from "../utils/customApiError.js";

const getAllTasks = asyncHandler(async (req, res) => {
  const allTasks = await Task.find({});
  res.status(200).json({ tasks: allTasks });
});

const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

const getSingleTask = asyncHandler(async (req, res, next) => {
  // const id = req.params.id
  const task = await Task.findOne({ _id: req.params.id });

  if (!task) {
    return next(createCustomApiError(`No task find with id ${req.params.id}`, 404))
     
  }

  res.status(200).json({ task: task });
});

const UpdateTask = asyncHandler(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(
      createCustomApiError(`No task find with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json(task);
});

const deleteSingleTask = asyncHandler(async (req, res, next) => {
  const { id: taskID } = req.params;
  const deletedTask = await Task.findOneAndDelete({ _id: taskID });

  if (!deletedTask) {
    return next(
      createCustomApiError(`No task find with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json(deletedTask);
});

export { getAllTasks, createTask, getSingleTask, UpdateTask, deleteSingleTask };

// starting again
