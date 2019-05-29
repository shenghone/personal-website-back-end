import mongoose, { Schema } from "mongoose";

const articleSchema = new mongoose.Schema({
  Title: String,
  Content: String,
  Status: Boolean
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
