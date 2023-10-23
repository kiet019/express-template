import { Router } from "express";
import { ResponseBody } from "../../package/model/index.ts";
import { Player } from "../../package/model/player/index.ts";
import {
  createPlayer,
  deletePlayer,
  getPlayer,
  updatePlayer,
} from "../../package/util/player/index.ts";
const playerViewRouter = Router();

const options = [
  { id: "Goalkeeper", name: "Goalkeeper" },
  { id: "Defender", name: "Defender" },
  { id: "Midfielder", name: "Midfielder" },
  { id: "Striker", name: "Striker" },
];
playerViewRouter
  .get("/", (req, res, next) => {
    res.render("index");
  })
  .get("/table", async (req, res) => {
    const playerList: ResponseBody<Player> = await getPlayer();
    res.render("player-table", { playerList: playerList.data, options });
  })
  .get("/update/:id", async (req, res) => {
    const id = req.params.id;
    const playerList: ResponseBody<Player> = await getPlayer(id);
    res.render("player-update", { player: playerList.data[0], options });
  })
  .post("/update", async (req, res) => {
    console.log("hello");
    try {
      const data = req.body;
      console.log(data);
      const playerUpdate: ResponseBody<Player> = await updatePlayer(data);
      if (playerUpdate.status === "success") {
        const playerList: ResponseBody<Player> = await getPlayer();
        res.render("player-table", { playerList: playerList.data, options });
      }
    } catch (error) {
      console.log(error);
      res.statusCode = 404;
      res.end();
    }
  })
  .post("/create", async (req, res) => {
    const data = req.body;
    try {
      const create: ResponseBody<Player> = await createPlayer(data);
      if (create.status === "success") {
        const playerList: ResponseBody<Player> = await getPlayer();
        res.render("player-table", { playerList: playerList.data, options });
      }
      res.render("nation-table");
    } catch (error) {
      res.statusCode = 404;
      res.end();
    }
  })
  .post("/delete", async (req, res) => {
    const data = req.body;
    try {
      const deleteN: ResponseBody<Player> = await deletePlayer(data.id);
      if (deleteN.status === "success") {
        const playerList: ResponseBody<Player> = await getPlayer();
        res.render("player-table", { playerList: playerList.data, options });
      }
    } catch (error) {
      res.statusCode = 404;
      res.end();
    }
  });

export default playerViewRouter;
