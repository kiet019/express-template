import express from "express";
import morgan from "morgan";
import { createServer } from "http";
import nationRouter from "./nation/nation.controller.ts";
import playerRouter from "./player/player.controller.ts";
import connectDB from "./connection/index.ts";
import cors from "cors";
import pageRouter from "./page/index.ts";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const hostname = "localhost";
const port = 3000;

app.use(cors());

app.use(morgan("dev"));
console.log(__dirname)
app.use(express.static(__dirname + '/public'));
app.use("/nations", nationRouter);
app.use("/players", playerRouter);
app.use("/", pageRouter)
connectDB();
const server = createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
