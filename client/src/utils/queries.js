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

export const QUERY_COMMENTS = gql`
  query comments {
    comments {
      _id
      createdAt
      username
      comment
      projectId
    }
  }
`;

export const QUERY_SINGLE_COMMENT = gql`
query Query($id: ID) {
  comment(_id: $id) {
    _id
    createdAt
    username
    comment
    projectId
  }
}
`;
