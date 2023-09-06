import express from "express";
import morgan from "morgan";
import { createServer } from "http";
import { nationRouter } from "./router/nations-router.ts";

const app = express();
const hostname = "localhost";
const port = 5000;

app.use(morgan("dev"));
app.use("/nations", nationRouter);
const server = createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
