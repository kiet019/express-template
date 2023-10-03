import bodyParser from "body-parser";
import { Router } from "express";
import playersService from "./player.repository.ts";
import { ResponseBody, errorResponse } from "../package/model/index.ts";
import { Player } from "../package/model/player/index.ts";

const playerRouter = Router();
playerRouter.use(bodyParser.json());

playerRouter
  .use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })

  //GET
  .get("/", async (req, res) => {
    try {
      const response: ResponseBody<Player> = {
        data: await playersService.getPlayer(),
        message: "Get success",
        status: "success",
      };
      res.send(response).end();
    } catch (error) {
      res.statusCode = 400;
      res.send(errorResponse(error)).end();
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const player = await playersService.getPlayer(req.params.id);
      const response: ResponseBody<Player> = {
        data: player,
        message: "Get success",
        status: "success",
      };
      res.send(response).end();
    } catch (error) {
      res.statusCode = 400;
      res.send(errorResponse(error)).end();
    }
  })

  //POST
  .post("/", async (req, res) => {
    try {
      const newNation = req.body ;
      const createNation = await playersService.createPlayer(newNation);
      const response: ResponseBody<Player> = {
        data: [createNation],
        message: "Create success",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error)).end();
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
  .put("/:id", async (req, res) => {
    try {
      const newNation = req.body;
      const count = await playersService.updatePlayer(newNation, req.params.id);
      const response: ResponseBody<Player> = {
        data: [],
        message: count ? "Update success" : "Update fail",
        status: "success",
      };
      res.send(response).end();
    } catch (error: any) {
      res.statusCode = 400;
      res.send(errorResponse(error)).end();
    }
  })

  //DELETE
  .delete("/", async (req, res) => {
    try {
      const count = await playersService.deletePlayer();
      const response: ResponseBody<Player> = {
        data: [],
        message: count ? "Delete success" : "Delete fail",
        status: "success",
      };
      res.send(response).end();
    } catch (error) {
      res.statusCode = 400;
      res.send(errorResponse(error)).end();
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const count = await playersService.deletePlayer(req.params.id);
      const response: ResponseBody<Player> = {
        data: [],
        message: count ? "Delete success" : "Delete fail",
        status: "success",
      };
      res.send(response).end();
    } catch (error) {
      res.statusCode = 400;
      res.send(errorResponse(error)).end();
    }
  });

export default playerRouter;
