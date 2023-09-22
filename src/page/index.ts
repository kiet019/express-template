import { Router } from "express";
import path from "path";
import fs from "fs";

const pageRouter = Router();
pageRouter.get("/", (req, res, next) => {
  res.render("index");
});

export default pageRouter;
