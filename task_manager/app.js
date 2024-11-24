import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import express from "express";
import { connectDB } from "./db/db_connect.js"
import errorHandler from "./utils/errorHandler.js";
import {notFound }from "./middlewares/notFound.js";

import tasks from "./routes/tasks_routes.js";

const app = express();
const PORT = 3000;

// middlewares
app.use(cors())
app.use(express.json());

// routes

app.use("/api/v1/tasks", tasks);
app.use(errorHandler)
app.use(notFound)


// app.get("/api/v1/tasks")         - get all tasks
// app.post("/api/v1/tasks")        - create a new task
// app.get("/api/v1/tasks/:id")     - get single task
// app.patch("/api/v1/tasks/:id")   - update single task
// app.delete("/api/v1/tasks/:id")  - delete single task

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR :", error);
      throw error;
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) =>
    console.log("App listening Err || MongoDB  connect Err", err)
  );


