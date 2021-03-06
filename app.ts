import express from "express";
import * as http from "http";
import * as bodyparser from "body-parser";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { UsersRoutes } from "./users/users.routes.config";
import { ProjectsRoutes } from "./projects/projects.routes.config";
import debug from "debug";

/*
Services
 */
dotenv.config();
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: Number = parseInt(process.env.PORT as string, 10);
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

/*
Middleware
 */
// here we are adding middleware to parse all incoming requests as JSON
app.use(bodyparser.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());

// here we are configuring the expressWinston logging middleware,
// which will automatically log all HTTP requests handled by Express.js
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new UsersRoutes(app));
routes.push(new ProjectsRoutes(app));

// here we are configuring the expressWinston error-logging middleware,
// which doesn't *handle* errors per se, but does *log* them
app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

// this is a simple route to make sure everything is working properly
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(`Server up and running!`);
});

/*
 Run Server
 */
if (!process.env.MONGODB_URI) {
  throw Error("No MONGODB_URI in env!");
}

mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    // Run server iff database connected
    server.listen(port, () => {
      debugLog(`Server running at http://localhost:${port}`);
      routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
      });
    });
  })
  .catch((err) => {
    debug.log(err);
  });
