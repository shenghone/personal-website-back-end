import { AuthenticationError } from "apollo-server-express";
import { Author } from "../models";

export const attemptSignIn = async (email, password) => {
  try {
    const author = await Author.findOne({ Email: email });
    if (!author) {
      throw new AuthenticationError("User not found.");
    }
    if (!(await author.matchesPassword(password))) {
      throw new AuthenticationError("Incorrect password.");
    }
    return author;
  } catch (err) {
    console.error(err);
  }
};

export const ensureSignIn = req => {
  if (!req.session.authorId) {
    throw new AuthenticationError("Must sign in to continue.");
  }
};

export const ensureSignOut = req => {
  if (req.session.authorId) {
    throw new AuthenticationError("You are already signed in.");
  }
};

export const signOut = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err);
      res.clearCookie(process.env.SESS_NAME);
      resolve(true);
    });
  });
