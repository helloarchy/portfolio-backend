import { CommonRoutesConfig } from "../common/common.routes.config";
import ProjectsController from "./controllers/projects.controller";
import ProjectsMiddleware from "./middleware/projects.middleware";
import express from "express";

export class ProjectsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ProjectsRoutes");
  }

  configureRoutes() {
    this.app
      .route(`/projects`)
      .get(ProjectsController.listProjects)
      .post(
        ProjectsMiddleware.validateRequiredProjectBodyFields,
        ProjectsController.createProject
      );

    this.app.param(`projectId`, ProjectsMiddleware.extractProjectId);
    this.app
      .route(`/projects/:projectId`)
      .all(ProjectsMiddleware.validateProjectExists)
      .get(ProjectsController.getProjectById)
      .delete(ProjectsController.removeProject);

    this.app.put(`/projects/:projectId`, [
      ProjectsMiddleware.validateRequiredProjectBodyFields,
      ProjectsController.put,
    ]);

    this.app.patch(`/projects/:projectId`, [ProjectsController.patch]);

    return this.app;
  }
}
