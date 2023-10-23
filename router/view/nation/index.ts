import { Router } from "express";
import {
  createNation,
  deleteNation,
  getNation,
  updateNation,
} from "../../package/util/nation/index.ts";
import { Nation } from "../../package/model/nation/index.ts";
import { ResponseBody } from "../../package/model/index.ts";
const nationViewRouter = Router();

nationViewRouter
  .get("/", (req, res, next) => {
    res.render("index");
  })
  .get("/table", async (req, res) => {
    const nationList: ResponseBody<Nation> = await getNation();
    res.render("nation-table", { nationList: nationList.data });
  })
  .get("/update/:id", async (req, res) => {
    const id = req.params.id;
    const nationList: ResponseBody<Nation> = await getNation(id);
    res.render("nation-update", { nation: nationList.data[0] });
  })
  .post("/update", async (req, res) => {
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
  .post("/create", async (req, res) => {
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
  .post("/delete", async (req, res) => {
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
  });

export default nationViewRouter;
