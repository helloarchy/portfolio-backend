// we import express to add types to the request/response objects from our controller functions
import express from "express";

// we import our newly created project services
import projectsService from "../services/projects.service";

// we import the argon2 library for password hashing
import argon2 from "argon2";

// we use debug with a custom context as described in Part 1
import debug from "debug";

const log: debug.IDebugger = debug("app:projects-controller");

class ProjectsController {
  private static instance: ProjectsController;

  // this will be a controller singleton (same pattern as before)
  static getInstance(): ProjectsController {
    if (!ProjectsController.instance) {
      ProjectsController.instance = new ProjectsController();
    }
    return ProjectsController.instance;
  }

  async listProjects(req: express.Request, res: express.Response) {
    const projects = await projectsService.list(100, 0);
    res.status(200).send(projects);
  }

  async getProjectById(req: express.Request, res: express.Response) {
    const project = await projectsService.readById(req.params.projectId);
    res.status(200).send(project);
  }

  async createProject(req: express.Request, res: express.Response) {
    const projectId = await projectsService.create(req.body);
    res.status(201).send({ projectId });
  }

  async patch(req: express.Request, res: express.Response) {
    log(
      await projectsService.patchById({
        projectId: req.params.projectId,
        ...req.body,
      })
    );
    res.status(204).send(``);
  }

  async put(req: express.Request, res: express.Response) {
    log(
      await projectsService.updateById({
        projectId: req.params.projectId,
        ...req.body,
      })
    );
    res.status(204).send(``);
  }

  async removeProject(req: express.Request, res: express.Response) {
    log(await projectsService.deleteById(req.params.projectId));
    res.status(204).send(``);
  }
}

export default ProjectsController.getInstance();
