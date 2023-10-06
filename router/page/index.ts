import { Router } from "express";
import {
  createNation,
  deleteNation,
  getNation,
} from "../package/util/nation/index.ts";
import { getPlayer } from "../package/util/player/index.ts";
import { ResponseBody } from "../package/model/index.ts";
import { Player } from "../package/model/player/index.ts";
const pageRouter = Router();

pageRouter
  .get("/", (req, res, next) => {
    res.render("index");
  })

  .get("/nations", async (req, res, next) => {
    const nationList = await getNation();
    const { success } = req.query;
    res.render("nations", {
      nationList: nationList.data,
      success: success ? [success] : [],
    });
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
      res.render("nations", { nationList: nationList.data, success: [] });
    } catch (error) {
      res.render("nations", { nationList: [] });
    }
  })
  .post("/nations/add", async (req, res) => {
    try {
      await createNation(req.body.name, req.body.description);
      res.redirect("http://localhost:3000/view/nations?success=create-success");
    } catch (error: any) {
      res.render("nations-add", { error: [error.message] });
    }
  })

  .get("/players", async (req, res, next) => {
    const playerList : ResponseBody<Player> = await getPlayer();
    res.render("players", { playerList: playerList.data });
  })
  .post("/players", async (req, res) => {
    try {
      const playerList = await getPlayer(req?.body?.id);
      res.render("players", { playerList: playerList.data, success: [] });
    } catch (error) {
      res.render("players", { playerList: [] });
    }
  })

export default pageRouter;
