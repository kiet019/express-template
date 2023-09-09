import bodyParser from "body-parser";
import { Router } from "express";
import { ResponseBody, errorResponse } from "../../model/index.ts";
import { Nation } from "../../model/nation/index.ts";
import nationsService from "../../repository/nations.ts";

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
    try {
      const response: ResponseBody<Nation> = {
        data: await nationsService.getNation(),
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
      const nation = await nationsService.getNation(req.params.id);
      const response: ResponseBody<Nation> = {
        data: nation,
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
      const newNation = req.body as Nation;
      const createNation = await nationsService.createNation(newNation);
      const response: ResponseBody<Nation> = {
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
      const newNation = req.body as Nation;
      const count = await nationsService.updateNation(newNation, req.params.id);
      const response: ResponseBody<Nation> = {
        data: [],
        message: "Update success",
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
      const count = await nationsService.deleteNation();
      const response: ResponseBody<Nation> = {
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
      const count = await nationsService.deleteNation(req.params.id);
      const response: ResponseBody<Nation> = {
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

export default nationRouter;
