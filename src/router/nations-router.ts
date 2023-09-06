import BodyParser from "body-parser";
import { Router } from "express";
import {
  nations,
  handleCreateCountry,
  handleDeleteCountry,
} from "../data/nations.ts";
import { Nation } from "../model/nation/index";
import { ResponseBody } from "../model/index";

export const nationRouter = Router();
nationRouter.use(BodyParser.json());
nationRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })
  .get((req, res) => {
    const response: ResponseBody<Nation> = {
      data: [...nations],
      message: "Get success",
      status: "success",
    };
    res.send(response).end();
  })
  .post((req, res) => {
    try {
      const newCountry = req.body as Nation;
      if (
        nations.find((value: Nation) => value.id === newCountry.id) &&
        newCountry.id.length > 0
      ) {
        throw new Error('Nation is exists !')
      } else {
        handleCreateCountry(req.body);
        const response: ResponseBody<Nation> = {
          data: [...nations],
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
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT is no support");
  })
  .delete((req, res) => {
    handleDeleteCountry();
    res.end("Deleting all nations");
  });
