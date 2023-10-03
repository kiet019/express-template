import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import cookieParser from "cookie-parser"
import playerRouter from "./router/player/player.controller.ts";
import nationRouter from "./router/nation/nation.controller.ts";
import pageRouter from "./router/page/index.ts";
import connectDB from "./router/package/connection/index.ts";

var app = express();

// view engine setup
const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static((__dirname + "/public")));

app.use("/nations", nationRouter);
app.use("/players", playerRouter);
app.use("/view", pageRouter);
connectDB();

export default app