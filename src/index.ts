import express from "express";
import morgan from "morgan";
import { createServer } from "http";
import nationRouter from "./controller/nation/index.ts";
import playerRouter from "./controller/player/index.ts";
import connectDB from "./repository/connection/index.ts";
import petRouter from "./controller/pet/index.ts";

const app = express();
const hostname = "localhost";
const port = 5000;

app.use(morgan("dev"));
app.use("/nations", nationRouter);
app.use('/players', playerRouter);
app.use('/pets', petRouter)
const server = createServer(app);
connectDB()

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
