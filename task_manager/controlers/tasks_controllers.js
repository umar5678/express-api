import { Task } from "../models/task_model.js"

const getAllTasks = (req, res) => {
res.send("All taks are here ")
}

const createTask = async (req, res) => {
   try {
    const task = await Task.create(req.body)
     res.status(201).json(task)
   } catch (error) {
    res.status(500).json(error)
Z    }
}

const getSingleTask = (req, res) => {
  res.send(`get single task of id: ${req.params.id}`);
};

const UpdateTask = (req, res) => {
  res.send(`update single task of id: ${req.params.id}`);
};

const deleteSingleTask = (req, res) => {
  res.send(`delete single task of id: ${req.params.id}`);
};

export {getAllTasks, createTask, getSingleTask,UpdateTask , deleteSingleTask}



// starting again