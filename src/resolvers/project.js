import { Project } from "../models";
import { UserInputError } from "apollo-server-express";

export default {
  Query: {
    Project: (parent, args, context, info) => {
      return Project.findById(args.id);
    },
    Projects: (parent, args, contenxt, info) => {
      return Project.find({});
    }
  },
  Mutation: {
    NewProject: async (parent, args, context, info) => {
      const project = await Project.create(args);
      return project;
    },
    UpdateProject: async (parent, args, context, info) => {
      try {
        const updatedProject = await Project.findByIdAndUpdate(args.id, {
          Title: args.Title,
          FrontEnd: args.FrontEnd,
          BackEnd: args.BackEnd,
          Link: args.Link,
          Description: args.Description,
          Status: args.Status,
          Asset: args.Asset
        });
        return updatedProject;
      } catch (err) {
        console.error(err);
      }
    },
    DeleteProject: async (parent, args, context, info) => {
      const deletedProject = await Project.findByIdAndRemove({ _id: args.id });
      return deletedProject ? true : false;
    }
  }
};
