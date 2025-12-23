import express from "express";
import usersRouter from "./routes/users.route";
import profilesRouter from "./routes/profiles.route";

const app = express();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/profiles", profilesRouter);

export default app;
