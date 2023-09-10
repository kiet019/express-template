import { Router } from "express";
import path from "path";
import fs from "fs";

const pageRouter = Router();
pageRouter.use((req, res, next) => {
  if (req.method == "GET") {
    var fileUrl: string;
    if (req.url == "/") fileUrl = "/index.html";
    else fileUrl = req.url;

    var filePath = path.resolve("./public" + fileUrl);
    const fileExt = path.extname(filePath);
    if (fileExt == ".html") {
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(
            "<html><body><h1>Error 404: " +
              fileUrl +
              " not found</h1></body></html>"
          );
          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(
        "<html><body><h1>Error 404: " +
          fileUrl +
          " not a HTML file</h1></body></html>"
      );
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<html><body><h1>Error 404: " +
        req.method +
        " not supported</h1></body></html>"
    );
  }
});

export default pageRouter;
