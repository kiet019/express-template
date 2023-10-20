import { Router } from "express";
import {
  createNation,
  deleteNation,
  getNation,
  updateNation,
} from "../package/util/nation/index.ts";
import { Nation } from "../package/model/nation/index.ts";
import { ResponseBody } from "../package/model";
import { Player } from "../package/model/player/index.ts";
import {
  createPlayer,
  deletePlayer,
  getPlayer,
  updatePlayer,
} from "../package/util/player/index.ts";
const pageRouter = Router();

const options = [
  { id: "Goalkeeper", name: "Goalkeeper" },
  { id: "Defender", name: "Defender" },
  { id: "Midfielder", name: "Midfielder" },
  { id: "Striker", name: "Striker" },
];
pageRouter
  .get("/", (req, res, next) => {
    res.render("index");
  })
  .get("/table/nation", async (req, res) => {
    const nationList: ResponseBody<Nation> = await getNation();
    res.render("nation-table", { nationList: nationList.data });
  })
  .get("/table/player", async (req, res) => {
    const playerList: ResponseBody<Player> = await getPlayer();
    res.render("player-table", { playerList: playerList.data, options });
  })
  .get("/nation/update/:id", async (req, res) => {
    const id = req.params.id;
    const nationList: ResponseBody<Nation> = await getNation(id);
    res.render("nation-update", { nation: nationList.data[0] });
  })
  .get("/player/update/:id", async (req, res) => {
    const id = req.params.id;
    const playerList: ResponseBody<Nation> = await getPlayer(id);
    res.render("player-update", { player: playerList.data[0], options });
  })
  .post("/player/update", async (req, res) => {
    console.log("hello")
    try {
      const data = req.body;
      console.log(data)
      const playerUpdate: ResponseBody<Player> = await updatePlayer(data);
      if (playerUpdate.status === "success") {
        const playerList: ResponseBody<Nation> = await getPlayer();
        res.render("player-table", { playerList: playerList.data, options });
      }
    } catch (error) {
      console.log(error)
      res.statusCode = 404;
      res.end();
    }
  })
  .post("/nation/update", async (req, res) => {
    try {
      const data = req.body;
      const nationUpdate: ResponseBody<Nation> = await updateNation(
        data.id,
        data.name,
        data.description
      );
      console.log(nationUpdate);
      if (nationUpdate.status === "success") {
        const nationList: ResponseBody<Nation> = await getNation();
        res.render("nation-table", { nationList: nationList.data });
      }
    } catch (error) {
      res.statusCode = 404;
      res.end();
    }
  })
  .post("/nation/create", async (req, res) => {
    const data = req.body;
    try {
      const create: ResponseBody<Nation> = await createNation(
        data.name,
        data.description
      );
      if (create.status === "success") {
        const nationList: ResponseBody<Nation> = await getNation();
        res.render("nation-table", { nationList: nationList.data });
      }
      res.render("nation-table");
    } catch (error) {
      res.statusCode = 404;
      res.end();
    }
  })
  .post("/player/create", async (req, res) => {
    const data = req.body;
    try {
      const create: ResponseBody<Nation> = await createPlayer(data);
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
  .post("/nation/delete", async (req, res) => {
    const data = req.body;
    try {
      const deleteN: ResponseBody<Nation> = await deleteNation(data.id);
      if (deleteN.status === "success") {
        const nationList: ResponseBody<Nation> = await getNation();
        res.render("nation-table", { nationList: nationList.data });
      }
    } catch (error) {
      res.statusCode = 404;
      res.end();
    }
  })
  .post("/player/delete", async (req, res) => {
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

export default pageRouter;
