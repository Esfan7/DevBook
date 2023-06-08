import { gql } from '@apollo/client';

export const QUERY_PROJECTS = gql`
  query getProjects {
    projects {
      _id
      title
      description
      fundingGoal
      donations
      status
      milestones {
        date
        description
        status
      }
      comments {
        _id
        timestamp
        username
        content
      }
    }
  }
`;

export const QUERY_SINGLE_PROJECT = gql`
  query getSingleProject($projectId: _id) {
    project(projectId: $projectId) {
      _id
      title
      description
      fundingGoal
      donations
      status
      milestones {
        date
        description
        status
      }
      comments {
        _id
        timestamp
        username
        content
      }
  }
`;

export const QUERY_COMMENTS = gql`
  query getComments {
    comments {
      _id
      timestamp
      username
      content
    }
  }
`;
