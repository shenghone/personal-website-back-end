import mongoose, { Schema } from "mongoose";

const projectSchema = new mongoose.Schema({
  Title: String,
  FrontEnd: String,
  BackEnd: String,
  Link: String,
  Description: String,
  Status: Boolean,
  Asset: String
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
