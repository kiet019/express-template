import express from "express";
import morgan from "morgan";
import { createServer } from "http";
import nationRouter from "./controller/nation/index.ts";
import playerRouter from "./controller/player/index.ts";

const app = express();
const hostname = "localhost";
const port = 5000;

app.use(morgan("dev"));
app.use("/nations", nationRouter);
app.use('/players', playerRouter)
const server = createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
