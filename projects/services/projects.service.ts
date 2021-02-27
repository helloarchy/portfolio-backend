import projectsDao from "../daos/projects.dao";
import { CRUD } from "../../common/interfaces/crud.interface";
import { ProjectDto } from "../dto/projects.model";

class ProjectsService implements CRUD {
  private static instance: ProjectsService;

  static getInstance(): ProjectsService {
    if (!ProjectsService.instance) {
      ProjectsService.instance = new ProjectsService();
    }
    return ProjectsService.instance;
  }

  async create(resource: ProjectDto) {
    return await projectsDao.addProject(resource);
  }

  async deleteById(resourceId: string) {
    return await projectsDao.removeProjectById(resourceId);
  }

  async list(limit: number, page: number) {
    // limit and page are ignored until we upgrade our DAO
    return await projectsDao.getProjects();
  }

  async patchById(resource: ProjectDto) {
    return await projectsDao.patchProjectById(resource);
  }

  async readById(resourceId: string) {
    return await projectsDao.getProjectById(resourceId);
  }

  async updateById(resource: ProjectDto) {
    return await projectsDao.putProjectById(resource);
  }
}

export default ProjectsService.getInstance();
