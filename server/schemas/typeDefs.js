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

    input MilestoneInput {
      status: String!
      date: String!
      description: String!
    }

    type Message {
      _id: ID!
      createdAt: String!
      sender: String!
      receiver: String!
      message: String!
      hasBeenRead: Boolean!
    }

    type Comment {
      _id: ID!
      createdAt: String!
      username: String!
      comment: String!
      projectId: String
    }

    type Donation {
      _id: ID!
      createdAt: String!
      amount: Int!
      username: String!
      comment: String
      projectId: String
    }

    type Auth {
      token: ID
      user: User
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
      messagesSent(sender: String!): [Message]
      messagesReceived(receiver: String! hasBeenRead: Boolean): [Message]
      message(_id: ID!): Message
    }

    type Mutation {
      addUser(username: String!, email: String!, description: String, picture: String): User
      updateUser(_id: ID!, username: String, email: String, description: String): User
      deleteUser(_id: ID!): User
      addProject(ownerUsername: String!, title: String!, description: String!, fundingGoal: Int!, status: String!): Project
      updateProject(_id: ID!,title: String, description: String, fundingGoal: Int, status: String, donations: String, comments: String, milestones: String): Project
      addMileStoneToProject(_id: ID!, milestone: MilestoneInput!): Project
      deleteMileFromProject(projectId: ID!, milestoneId: ID!): Project
      deleteProject(_id: ID!): Project
      addMessage(sender: String!, receiver: String!, message: String!): Message
      deleteMessage(_id: ID!): Message
      addDonation(amount: Int!, username: String!, comment: String!, projectId: String!): Donation
      deleteDonation(_id: ID!): Donation
      addComment(username: String!, comment: String!, projectId: String!): Comment
      deleteComment(_id: ID!): Comment
    }
`;
module.exports = typeDefs;
