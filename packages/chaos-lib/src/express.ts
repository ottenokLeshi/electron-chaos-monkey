import express from "express";
import bodyParser from "body-parser";
import util from "util";
import cors from "cors";
import path from "path";
const publicPath = path.join("ui", "build");

const runChaosServer = () => {
  const app = express();
  const port = 3000;

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Chaoslistening on port ${port}`);
  });

  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  app.options("*", cors());
  app.use(express.static(publicPath));
  app.use(bodyParser.json());

  const router = express.Router();
  app.use("/chaos", router);

  router.post("/pranks/execute", (req, res) => {
    try {
      console.log(
        `Chaos gate was asked to start a new prank activity ${util.inspect(
          req.body
        )}`
      );
      res.status(200).json({
        status: "OK",
      });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  });

  router.get("/pranks/definition", (req, res) => {
    try {
      console.log(`Chaos API was asked to get all pranks definition`);
      res.status(200).json("Responce");
    } catch (e) {
      res.status(500).json(e);
    }
  });
};

module.exports = runChaosServer;
