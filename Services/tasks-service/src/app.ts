import express from "express";
import tasksRouter from "./routes/tasks.route";
import projectsRouter from "./routes/projects.route";

const app = express();

app.use(express.json());

app.use("/tasks", tasksRouter);
app.use("/projects", projectsRouter);


export default app;
