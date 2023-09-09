import bodyParser from "body-parser";
import { Router } from "express";
import { ResponseBody } from "../../model/index";
import { Nation } from "../../model/nation/index";
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
  .get("/", (req, res) => {
    const response: ResponseBody<Nation> = {
      data: [...nationsService.getCountry()],
      message: "Get success",
      status: "success",
    };
    res.send(response).end();
  })
  .get("/:id", (req, res) => {
    const nation = nationsService.getCountry().find(
      (value) => value.id === req.params.id
    );
    const response: ResponseBody<Nation> = {
      data: nation ? [nation] : [],
      message: "Get success",
      status: "success",
    };
    res.send(response).end();
  })

  //POST
  .post("/", (req, res) => {
    try {
      const newCountry = req.body as Nation;
      if (
        nationsService.getCountry().find((value) => value.id === newCountry.id) ||
        newCountry.id.length === 0
      ) {
        throw new Error("Nation is exists !");
      } else {
        nationsService.createCountry(newCountry);
        const response: ResponseBody<Nation> = {
          data: [...nationsService.getCountry()],
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
      res.statusCode = 400;
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
      const newCountry = req.body as Nation;
      if (
        nationsService.getCountry().find(
          (value: Nation) => value.id === req.params.id
        ) &&
        newCountry.id.length > 0
      ) {
        nationsService.updateCountry(newCountry, req.params.id);
        const response: ResponseBody<Nation> = {
          data: [...nationsService.getCountry()],
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
      res.statusCode = 400;
      res.send(response).end();
    }
  })

  //DELETE
  .delete("/", (req, res) => {
    nationsService.deleteCountry();
    const response: ResponseBody<Nation> = {
      data: nationsService.getCountry(),
      message: "Delete success",
      status: "success",
    };
    res.send(response).end();
  })
  .delete("/:id", (req, res) => {
    nationsService.deleteCountry(req.params.id);
    const response: ResponseBody<Nation> = {
      data: nationsService.getCountry(),
      message: "Delete success",
      status: "success",
    };
    res.send(response).end();
  });

export default nationRouter;
// export * from "../nation/index.ts";
