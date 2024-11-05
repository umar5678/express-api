import express from "express"
import {
  getAllTasks,
  createTask,
  getSingleTask,
  UpdateTask,
  deleteSingleTask,
} from "../controlers/tasks_controllers.js";

const router = express.Router()

router.route('/').get(getAllTasks).post(createTask)

router.route("/:id").get(getSingleTask).patch(UpdateTask).delete(deleteSingleTask)



export default router

// router file