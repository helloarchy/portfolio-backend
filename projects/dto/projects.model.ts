import mongoose, { Document, Schema } from "mongoose";

export interface ProjectDto extends Document {
  bodyMarkdown?: string;
  categories?: string[];
  date?: string;
  imageDesc?: string;
  imageUrl?: string;
  shortDesc?: string;
  techStack?: string[];
  title: string; // Required
}

const ProjectSchema = new Schema({
  categories: {
    type: [String],
  },
  bodyMarkdown: {
    type: String,
  },
  date: {
    type: Date,
  },
  imageDesc: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  shortDesc: {
    type: String,
  },
  title: {
    required: [true, "Please provide a title for this project."],
    type: String,
  },
  techStack: {
    type: [String],
  },
});

export default mongoose.model<ProjectDto>("Project", ProjectSchema);
