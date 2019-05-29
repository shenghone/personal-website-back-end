import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    Project(id: ID!): ProjectType @auth
    Projects: [ProjectType!]!
  }
  extend type Mutation {
    NewProject(
      Title: String!
      FrontEnd: String!
      BackEnd: String!
      Description: String!
      Status: Boolean!
      Link: String!
      Asset: String!
    ): ProjectType! @auth
    UpdateProject(
      id: ID!
      Title: String!
      FrontEnd: String!
      BackEnd: String!
      Link: String!
      Description: String!
      Status: Boolean!
      Asset: String!
    ): ProjectType! @auth
    DeleteProject(id: ID!): Boolean!
  }
  type ProjectType {
    id: ID!
    Title: String!
    FrontEnd: String!
    BackEnd: String!
    Description: String!
    Status: String!
    Asset: String!
    Link: String!
  }
`;
