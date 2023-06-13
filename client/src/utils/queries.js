import { gql } from '@apollo/client';

export const QUERY_PROJECTS = gql`
  query projects{
    projects {
      _id
      createdAt
      ownerUsername
      title
      description
      fundingGoal
      status
      donations {
        _id
        createdAt
        amount
        username
        comment
        projectId
      }
      comments {
        _id
        createdAt
        username
        comment
        projectId
      }
      milestones {
        _id
        date
        description
        status
      }
      donationCount
    }
  }
`;

export const QUERY_SINGLE_PROJECT = gql`
  query project($id: ID) {
    project(_id: $id) {
      _id
      createdAt
      ownerUsername
      title
      description
      fundingGoal
      status
      donations {
        _id
        createdAt
        amount
        username
        comment
        projectId
      }
      comments {
        _id
        createdAt
        username
        comment
        projectId
      }
      milestones {
        _id
        date
        description
        status
      }
      donationCount
    }
  }
`;
export const QUERY_MESSAGES = gql`
  query messages {
    messages {
      _id
      createdAt
      sender
      receiver
      message
      hasBeenRead
    }
  }
`;

export const QUERY_MESSAGES_RECEIVED = gql`
  query messagesReceived($receiver: String!) {
    messagesReceived(receiver: $receiver) {
      _id
      createdAt
      sender
      receiver
      message
      hasBeenRead
    }
  }
`;

export const QUERY_MESSAGES_SENT = gql`
  query messagesSent($sender: String!) {
    messagesSent(sender: $sender) {
      _id
      createdAt
      sender
      receiver
      message
      hasBeenRead
    }
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      _id
      createdAt
      username
      email
      description
      picture
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      createdAt
      username
      email
      description
      picture
    }
  }

`;

