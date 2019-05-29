import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    Me: AuthorType @auth
  }

  extend type Mutation {
    SignUp(Email: String!, Password: String!, AuthorName: String!): AuthorType
      @guest
    SignIn(Email: String!, Password: String!): AuthorType @guest
    SignOut: Boolean @auth
  }

  type AuthorType {
    id: ID!
    AuthorName: String!
    Email: String!
    Password: String!
  }
`;
