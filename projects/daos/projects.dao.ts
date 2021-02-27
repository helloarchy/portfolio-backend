import Project, { ProjectDto } from "../dto/projects.model";
import debug from "debug";

const log: debug.IDebugger = debug("app:db-dao");

class ProjectsDao {
  private static instance: ProjectsDao;

  constructor() {
    log("Created new instance of ProjectsDao");
  }

  static getInstance(): ProjectsDao {
    if (!ProjectsDao.instance) {
      ProjectsDao.instance = new ProjectsDao();
    }
    return ProjectsDao.instance;
  }

  /**
   * Add a new project
   * @param project
   * @returns the new projects _id for confirmation
   */
  async addProject(project: ProjectDto) {
    try {
      const { _id } = await Project.create(project);
      return _id;
    } catch (e) {
      debug.log("Failed creating project");
      throw new Error(e);
    }
  }

  /**
   * Get all projects
   * @returns all projects and their details
   */
  async getProjects() {
    return Project.find();
  }

  /**
   * Get a single project by their _id
   * @param projectId
   * @returns the projects details
   */
  async getProjectById(projectId: string) {
    try {
      return (await Project.findById(projectId)) as ProjectDto;
    } catch (e) {}
  }

  /**
   * Update a Project with all fields provided
   * @param project
   * @returns the confirmation message
   */
  async putProjectById(project: any) {
    try {
      const { _id } = (await Project.findByIdAndUpdate(project.projectId, {
        bodyMarkdown: project.bodyMarkdown,
        categories: project.categories,
        date: project.date,
        imageDesc: project.imageDesc,
        imageUrl: project.imageUrl,
        shortDesc: project.shortDesc,
        techStack: project.techStack,
        title: project.title,
      })) as ProjectDto;

      return `${_id} updated via put`;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Update a Project by the values provided
   * @param project
   * @returns the confirmation message
   */
  async patchProjectById(project: any) {
    try {
      const currentProject = (await Project.findById(
        project.projectId
      )) as ProjectDto;

      const allowedPatchFields = [
        "bodyMarkdown",
        "categories",
        "date",
        "imageDesc",
        "imageUrl",
        "shortDesc",
        "techStack",
        "title",
      ];

      // Only update allowed fields
      for (let field of allowedPatchFields) {
        if (field in project) {
          // @ts-ignore
          currentProject[field] = project[field];
        }
      }

      await currentProject.save();

      return `${project._id} patched`;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * Remove a project by their id
   * @param projectId
   */
  async removeProjectById(projectId: string) {
    try {
      await Project.findByIdAndDelete(projectId);
      return `${projectId} removed`;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProjectByEmail(email: string) {
    const currentProject = await Project.findOne({ email: email });
    if (currentProject) {
      return currentProject;
    } else {
      return null;
    }
  }
}

export default ProjectsDao.getInstance();
