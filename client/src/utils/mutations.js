import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation addComment($commentText: String!, $commentAuthor: String!){
    addComment(commentText: $commentText, commentAuthor: $commentAuthor){
      _id
      timestamp
      username
      content
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: _id!){
    deleteComment(commentId: $commentId)
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject($input: UpdateProjectINput!) {
    updateProject(input: $input) {
      title
      description
      fundingGoal
      status
      milestones: {
        date
        description
        status
      }
      comments
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation deleteProject($projectId: _id!){
    deleteProject(projectId: $projectId)
  }
`;
// export const ADD_THOUGHT = gql`
//   mutation addThought($thoughtText: String!, $thoughtAuthor: String!) {
//     addThought(thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//       }
//     }
//   }
// `;

// export const ADD_COMMENT = gql`
//   mutation addComment($thoughtId: ID!, $commentText: String!) {
//     addComment(thoughtId: $thoughtId, commentText: $commentText) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         createdAt
//       }
//     }
//   }
// `;
