import { Router } from "express";
const pageRouter = Router();

pageRouter.get("/", (req, res, next) => {
  res.render("index");
});

export default pageRouter;
