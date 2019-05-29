import { Author } from "../models";
import { UserInputError } from "apollo-server-express";
import { attemptSignIn, signOut } from "../auth";
export default {
  Query: {
    Me: (parent, args, {req}, info) => {
      return Author.findById(req.session.authorId);
    }
  },
  Mutation: {
    SignUp: async (parent, args, { req, res }, info) => {
      //check if author has been found.
      const authorFound = await Author.findOne({ Email: args.Email });
      if (authorFound) {
        throw new UserInputError("Email has been taken.");
      }

      //create new author in the database
      const newAuthor = await Author.create(args);
      req.session.authorId = newAuthor.id;
      return newAuthor;
    },
    SignIn: async (parent, args, { req, res }, info) => {
      //compare user inputs against the data in database

      const author = await attemptSignIn(args.Email, args.Password);
      if(author && author.id){
        req.session.authorId = author.id;
      }
      console.log(req.session.authorId)

      return author;
    },
    SignOut: (parent, args, { req, res }, info) => {
      return signOut(req, res);
    }
  }
};
