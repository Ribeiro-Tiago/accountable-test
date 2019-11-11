import { json, urlencoded } from "body-parser";

import express = require("express");
import cors = require("cors");
import helmet = require("helmet");

import routes from "../routes/index.route";

const app = express.call(this);

app.use(json());
app.use(urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// API router
app.use("/api/", routes);

export default app;
