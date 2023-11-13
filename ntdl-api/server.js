import express from "express";
import { connectMongo } from "./src/config/dbConfig.js";
import { insertTask } from "./src/model/TaskModel.js";
import { getAllTasks } from "./src/model/TaskModel.js";
import { SwitchTask } from "./src/model/TaskModel.js";
import { delteTask } from "./src/model/TaskModel.js";
import { deleteManyTask } from "./src/model/TaskModel.js";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import path from "path";
console.log(process.env);
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 8000;

//middleware
app.use(express.static(__dirname + "/build"));
app.use(express.json());
app.use(cors());
app.use(morgan);
connectMongo();

app.use("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

app.get("/api/v1/task", async (req, res) => {
  const taskList = await getAllTasks();
  res.json({
    status: "success",
    message: "Here are the taskList",
    taskList,
  });
});

app.post("/api/v1/task", async (req, res) => {
  const result = await insertTask(req.body);

  result?._id
    ? res.json({
        status: "success",
        message: "task is pushed to data",
      })
    : res.json({
        status: "error",
        message: "unable to push to the data",
      });
});

app.patch("/api/v1/task", async (req, res) => {
  //object from axios
  const { _id, type } = req.body;

  const result = await SwitchTask(_id, { type });

  result?._id
    ? res.json({
        status: "success",
        message: "task has been updated",
      })
    : res.json({
        status: "error",
        message: "unable to task has been updated",
      });
});

// app.delete("/api/v1/task/:_id", async (req, res) => {
//   const { _id } = req.params;
//   const result = await delteTask(_id);
// });

app.delete("/api/v1/task/", async (req, res) => {
  const { ids } = req.body;
  console.log(ids);

  // const result = await deleteTask(_id);
  const result = await deleteManyTask(ids);
  console.log(result);

  result?.deletedCount
    ? res.json({
        status: "success",
        message: "All selected tasks has been deleted successfully!",
      })
    : res.json({
        status: "success",
        message: "Nothing to delete, try again later",
      });
});

// app.get("/", (req, res) => {
//   res.json({
//     message: "Here is root route",
//   });
// });

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log("Your server is running at http://localhost:" + PORT);
});
