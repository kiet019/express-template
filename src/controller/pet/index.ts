import { Router } from "express";
import { ResponseBody } from "../../model";
import { Pet } from "../../model/pet";
import petService from "../../repository/pet/index.ts";
import bodyParser from "body-parser";

const petRouter = Router();
petRouter.use(bodyParser.json());
petRouter
  .use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
  })

  //GET
  .get("/", async (req, res) => {
    const pets = await petService.getAllPet();
    const response: ResponseBody<Pet> = {
      data: [...pets],
      message: "Get success",
      status: "success",
    };
    res.send(response).end();
  })

  //POST
  .post("/", async (req, res) => {
    try {
      const newPet = req.body;
      const createPet = await petService.createPet(newPet)
      const response : ResponseBody<Pet> = {
        data: [createPet],
        message: "Create success",
        status: "success"
      }
      res.send(response).end()
    } catch (error: any) {
      const response: ResponseBody<string> = {
        data: [],
        message: error.message,
        status: "error",
      };
      res.send(response).end();
    }
  });
export default petRouter;
