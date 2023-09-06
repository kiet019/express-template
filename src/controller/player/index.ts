import bodyParser from "body-parser";
import { Router } from "express";
import { ResponseBody } from "../../model/index";
import { Player } from "../../model/player/index";
import playersService from "../../repository/player.ts";

const playerRouter = Router();
playerRouter.use(bodyParser.json());

playerRouter
  .use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })

  //GET
  .get("/", (req, res) => {
    const response: ResponseBody<Player> = {
      data: playersService.getPlayer(),
      message: "Get success",
      status: "success",
    };
    res.send(response).end();
  })
  .get("/:id", (req, res) => {
    const player = playersService
      .getPlayer()
      .find((value) => value.id === req.params.id);
    const response: ResponseBody<Player> = {
      data: player ? [player] : [],
      message: "Get success",
      status: "success",
    };
    res.send(response).end();
  })

  //POST
  .post("/", (req, res) => {
    try {
      const newPlayer = req.body as Player;
      if (
        playersService.getPlayer().find((value) => value.id === newPlayer.id) ||
        newPlayer.id.length === 0
      ) {
        throw new Error("Player is exists");
      } else {
        playersService.createPlayer(newPlayer);
        const response: ResponseBody<Player> = {
          data: playersService.getPlayer(),
          message: "Create success",
          status: "success",
        };
        res.send(response).end();
      }
    } catch (error: any) {
      const response: ResponseBody<string> = {
        data: [],
        message: error.message,
        status: "error",
      };
      res.send(response).end();
    }
  })
  .post("/:id", (req, res) => {
    res.statusCode = 403;
    res.end("POST is no support");
  })

  //PUT
  .put("/", (req, res) => {
    res.statusCode = 403;
    res.end("PUT is no support");
  })
  .put("/:id", (req, res) => {
    try {
      const newPlayer = req.body as Player;
      if (
        playersService
          .getPlayer()
          .find((value) => value.id === req.params.id) &&
        newPlayer.id.length > 0
      ) {
        playersService.updatePlayer(newPlayer, req.params.id);
        const response: ResponseBody<Player> = {
          data:  playersService.getPlayer(),
          message: "Update success",
          status: "success",
        };
        res.send(response).end();
      } else {
        throw new Error("Nation is not exists !");
      }
    } catch (error: any) {
      const response: ResponseBody<string> = {
        data: [],
        message: error.message,
        status: "error",
      };
      res.send(response).end();
    }
  })

  //DELETE
  .delete("/", (req, res) => {
    playersService.deletePlayer();
    const response: ResponseBody<Player> = {
      data: playersService.getPlayer(),
      message: "Delete success",
      status: "success",
    };
    res.send(response).end();
  })
  .delete("/:id", (req, res) => {
    playersService.deletePlayer(req.params.id);
    const response: ResponseBody<Player> = {
      data: playersService.getPlayer(),
      message: "Delete success",
      status: "success",
    };
    res.send(response).end();
  });
export default playerRouter;
