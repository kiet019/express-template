import bodyParser from "body-parser";
import { Router } from "express";
import { ResponseBody } from "../../model/index";
import { Nation } from "../../model/nation/index";
import nationsService from "../../repository/nations.ts";
import { ObjectId } from "mongoose";

const nationRouter = Router();
nationRouter.use(bodyParser.json());

nationRouter
  .use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })

  //GET
  .get("/", async (req, res) => {
    const response: ResponseBody<Nation> = {
      data: await nationsService.getNation(),
      message: "Get success",
      status: "success",
    };
    res.send(response).end();
  })
  .get("/:id", async (req, res) => {
    const nation = await nationsService.getNation(req.params.id);
    const response: ResponseBody<Nation> = {
      data: nation,
      message: "Get success",
      status: "success",
    };
    res.send(response).end();
  })

  //POST
  .post("/", async (req, res) => {
    try {
      const newNation = req.body as Nation;
      const createNation = await nationsService.createNation(newNation);
      const response: ResponseBody<Nation> = {
        data: [createNation],
        message: "Create success",
        status: "success",
      };
      res.send(response).end();
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
  .put("/:id", async (req, res) => {
    try {
      const newNation = req.body as Nation;
      const updateNation = await nationsService.updateNation(
        newNation,
        req.params.id
      );
      const response: ResponseBody<Nation> = {
        data: [],
        message: "Update success",
        status: "success",
      };
      res.send(response).end();
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
  .delete("/", async (req, res) => {
    const deleteNation = await nationsService.deleteNation();
    const response: ResponseBody<Nation> = {
      data: [],
      message: "Delete success",
      status: "success",
    };
    res.send(response).end();
  })
  .delete("/:id", async (req, res) => {
    const deleteNation = await nationsService.deleteNation(req.params.id);
    const response: ResponseBody<Nation> = {
      data: deleteNation,
      message: "Delete success",
      status: "success",
    };
    res.send(response).end();
  });

export default nationRouter;
