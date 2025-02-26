import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./router/package/connection/index.js";
import userRouter from "./router/api/user.controller.js";
import adminRouter from "./router/api/admin.controller.js";
import orchidRouter from "./router/api/orchid.controller.js";
import categoryRouter from "./router/api/category.controller.js";
import publicRouter from "./router/view/public.controller.js";
import privateRouter from "./router/view/private.controller.js";

var app = express();

// view engine setup
const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/categories", categoryRouter);
app.use("/orchids", orchidRouter);
app.use("/view", publicRouter)
app.use("/view/admin", privateRouter)
connectDB();
export default app;
