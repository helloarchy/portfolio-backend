import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";

export class ProjectsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ProjectsRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/projects`)
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`List of projects`);
      })
      .post((req: express.Request, res: express.Response) => {
        res.status(200).send(`Post to projects`);
      });

    this.app
      .route(`/projects/:projectId`)
      .all(
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          next();
        }
      )
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`GET requested for id ${req.params.projectId}`);
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT requested for id ${req.params.projectId}`);
      })
      .patch((req: express.Request, res: express.Response) => {
        res.status(200).send(`PATCH requested for id ${req.params.projectId}`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE requested for id ${req.params.projectId}`);
      });

    return this.app;
  }
}
