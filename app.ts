import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./router/package/connection/index.ts";
import userRouter from "./router/api/user.controller.ts";
import adminRouter from "./router/api/admin.controller.ts";
import orchidRouter from "./router/api/orchid.controller.ts";
import categoryRouter from "./router/api/category.controller.ts";
import publicRouter from "./router/view/public.controller.ts";
import privateRouter from "./router/view/private.controller.ts";

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
