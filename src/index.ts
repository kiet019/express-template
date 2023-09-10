import express from "express";
import morgan from "morgan";
import { createServer } from "http";
import nationRouter from "./controller/nation/index.ts";
import playerRouter from "./controller/player/index.ts";
import connectDB from "./repository/connection/index.ts";
import cors from "cors";
import pageRouter from "./controller/page/index.ts";

const app = express();
const hostname = "localhost";
const port = 5000;

app.use(cors());

app.use(morgan("dev"));
app.use("/nations", nationRouter);
app.use("/players", playerRouter);
app.use("/", pageRouter)
connectDB();
const server = createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
