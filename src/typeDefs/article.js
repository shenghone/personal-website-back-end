import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    Articles: [ArticleType!]!
    Article(id: ID!): ArticleType
  }

  extend type Mutation {
    NewArticle(
      Title: String!
      Content: String!
      Status: Boolean!
    ): ArticleType! @auth
    UpdateArticle(
      id: ID!
      Title: String!
      Status: Boolean!
      Content: String!
    ): ArticleType! @auth
    DeleteArticle(id: ID!): Boolean
  }

  type ArticleType {
    id: ID!
    createdAt: String
    Title: String!
    Content: String!
    Status: Boolean!
  }
`;
