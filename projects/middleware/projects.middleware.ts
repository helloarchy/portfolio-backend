import express from "express";
import projectService from "../services/projects.service";

class ProjectsMiddleware {
  private static instance: ProjectsMiddleware;

  static getInstance() {
    if (!ProjectsMiddleware.instance) {
      ProjectsMiddleware.instance = new ProjectsMiddleware();
    }
    return ProjectsMiddleware.instance;
  }

  async validateRequiredProjectBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.title) {
      next();
    } else {
      res.status(400).send({ error: `Missing required fields: title` });
    }
  }

  async validateProjectExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const project = await projectService.readById(req.params.projectId);
    if (project) {
      next();
    } else {
      res
        .status(404)
        .send({ error: `Project ${req.params.projectId} not found` });
    }
  }

  async extractProjectId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.projectId;
    next();
  }
}

export default ProjectsMiddleware.getInstance();
