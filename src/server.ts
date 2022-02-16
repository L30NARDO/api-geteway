// import { resolve } from "path";
// import { readFileSync } from "fs";
// import { load } from "js-yaml";

const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const httpProxy = require("express-http-proxy");
const app = express();
// const pathFile = resolve(process.cwd(), "config.yml");
// const readConfig = readFileSync(pathFile, { encoding: "utf8" });
// const services = load(readConfig, { json: true });

const PORT = process.env.PORT || 3000;
const rent = "https://irent-rent.herokuapp.com/api/v1/rent";
app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.json({ message: "Running application" });
});

// services.array.forEach(({ name, url }) => {
//   app.use(`/${name}`, httpProxy(url, { setTimeout: 3000 }));
// });
app.use(
  "/immobile",
  httpProxy("https://imoveisbackend.herokuapp.com", { setTimeout: 3000 })
);
app.use(
  "/user",
  httpProxy("https://irent-users.herokuapp.com", { setTimeout: 3000 })
);
app.use(
  "/rent",
  httpProxy("https://irent-rent.herokuapp.com", { setTimeout: 3000 })
);

app.listen(PORT, () =>
  console.log("\n||======> API GETEWAY STARTED <======||")
);

module.exports = app;
