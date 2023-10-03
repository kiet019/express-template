import { Router } from "express";
import nationsService from "../nation/nations.repository.ts";
import playersService from "../player/player.repository.ts";
import {
  createNation,
  deleteNation,
  getNation,
} from "../package/util/nation/index.ts";

const pageRouter = Router();

pageRouter
  .get("/", (req, res, next) => {
    res.render("index");
  })

  .get("/nations", async (req, res, next) => {
    const nationList = await getNation();
    res.render("nations", { nationList: nationList.data });
  })
  .get("/nations/add", async (req, res, next) => {
    res.render("nations-add", { error: [] });
  })
  .get("/nations/delete", async (req, res) => {
    try {
      await deleteNation();
    } catch (error) {}
    res.redirect("/view/nations");
  })

  .post("/nations", async (req, res) => {
    try {
      const nationList = await getNation(req?.body?.id);
      res.render("nations", { nationList: nationList.data });
    } catch (error) {
      res.render("nations", { nationList: [] });
    }
  })
  .post("/nations/add", async (req, res) => {
    try {
      await createNation(req.body.name, req.body.description);
      res.redirect("http://localhost:3000/view/nations");
    } catch (error: any) {
      res.render("nations-add", { error: [error.message] });
    }
  })

  .get("/players", async (req, res, next) => {
    const searchParams = req.query as { search: string };
    const playerList = await playersService.getPlayer();
    res.render("players", { playerList });
  });

export default pageRouter;
