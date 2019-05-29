import mongoose, { Schema } from "mongoose";
import { hash, compare } from "bcryptjs";

const authorSchema = new mongoose.Schema({
  Email: String,
  Password: String,
  AuthorName: String
});

authorSchema.pre("save", async function() {
  if (this.isModified("Password")) {
    this.Password = await hash(this.Password, 10);
  }
});

authorSchema.methods.matchesPassword = function(Password) {
  return compare(Password, this.Password);
};

const Author = mongoose.model("Author", authorSchema);

export default Author;
