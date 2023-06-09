const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
      _id: ID!
      createdAt: String!
      username: String!
      email: String!
      description: String
      picture: String
    }

    type Project {
      _id: ID!
      createdAt: String!
      ownerUsername: String!
      title: String!
      description: String!
      fundingGoal: Int!
      status: String!
      donations: [Donation]
      comments: [Comment]
      milestones: [Milestone]
      donationCount: Int
    }

    type Milestone {
      _id: ID!
      date: String!
      description: String!
      status: String!
    }

    type Message {
      _id: ID!
      createdAt: String!
      sender: String!
      receiver: String!
      message: String!
      hasbBeenRead: Boolean!
    }

    type Comment {
      _id: ID!
      createdAt: String!
      username: String!
      comment: String!
      projectId: String!
    }

    type Donation {
      _id: ID!
      createdAt: String!
      amount: Int!
      username: String!
      comment: String
      projectId: String!
    }

    type Query {
      projects: [Project]
      project(_id: ID!): Project
      donations: [Donation]
      donation(_id: ID!): Donation
      comments: [Comment]
      comment(_id: ID!): Comment
      users: [User]
      user(_id: ID!): User
      messages: [Message]
      message(_id: ID!): Message
    }
`;
module.exports = typeDefs;
