import { resolve } from "path";
import { readFileSync } from "fs";
import { load } from "js-yaml";

const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const httpProxy = require("express-http-proxy");
const app = express();
const pathFile = resolve(process.cwd(), "config.yml");
const readConfig = readFileSync(pathFile, { encoding: "utf8" });
const services = load(readConfig, { json: true });

console.log(services);
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
app.use("/user", httpProxy("http://localhost:3002", { setTimeout: 3000 }));
app.use("/immobile", httpProxy("http://localhost:3001", { setTimeout: 3000 }));
app.use("/rent", httpProxy("http://localhost:3003", { setTimeout: 3000 }));

app.listen(3000, () =>
  console.log("\n||======> API GETEWAY STARTED <======||")
);

module.exports = app;
