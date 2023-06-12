import { gql } from '@apollo/client';



export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $description: String, $picture: String) {
    addUser(username: $username, email: $email, description: $description, picture: $picture) {
      _id
      createdAt
      username
      email
      description
      picture
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $username: String, $email: String, $description: String) {
    updateUser(_id: $id, username: $username, email: $email, description: $description) {
      _id
      createdAt
      username
      email
      description
      picture
    }
  }
`;

export const DELETE_USER = gql`
  mutation updateUser($id: ID!) {
    deleteUser(_id: $id) {
      _id
      createdAt
      username
      email
      description
      picture
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation AddProject($ownerUsername: String!, $title: String!, $description: String!, $fundingGoal: Int!, $status: String!) {
    addProject(ownerUsername: $ownerUsername, title: $title, description: $description, fundingGoal: $fundingGoal, status: $status) {
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

export const UPDATE_PROJECT = gql`
mutation UpdateProject($id: ID!, $description: String, $title: String, $fundingGoal: Int, $status: String) {
  updateProject(_id: $id, description: $description, title: $title, fundingGoal: $fundingGoal, status: $status) {
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

export const ADD_MILESTONE = gql`
mutation Mutation($id: ID!, $milestone: MilestoneInput!) {
  addMileStoneToProject(_id: $id, milestone: $milestone) {
    _id
    createdAt
    ownerUsername
    title
    description
    fundingGoal
    status
    donationCount
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
  }
}

`;

export const ADD_MESSAGE = gql`
mutation addMessage($sender: String!, $receiver: String!, $message: String!) {
  addMessage(sender: $sender, receiver: $receiver, message: $message) {
    _id
    createdAt
    sender
    receiver
    message
    hasBeenRead
  }
}

`;

export const ADD_DONATION = gql`
mutation addDonation($amount: Int!, $username: String!, $comment: String!, $projectId: String!) {
  addDonation(amount: $amount, username: $username, comment: $comment, projectId: $projectId) {
    _id
    createdAt
    amount
    username
    comment
    projectId
  }
}
`;

export const ADD_COMMENT = gql`
mutation addComment($username: String!, $comment: String!, $projectId: String!) {
  addComment(username: $username, comment: $comment, projectId: $projectId) {
    _id
    createdAt
    username
    comment
    projectId
  }
}

`;
