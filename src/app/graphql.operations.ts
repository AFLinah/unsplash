import { gql } from "apollo-angular";

const GET_USERS = gql `
    query Users {
        users(last: 10) {
            edges {
                node {
                    username
                    email
                    gender
                    location
                    website
                    bio
                    interests
                    phoneNumber
                }
            }
            pageInfo{
                endCursor
                startCursor
                hasNextPage
                hasPreviousPage
            }
        }
    }
`;

export { GET_USERS };

export const CREATE_USER = gql`
  mutation CreateUser (
    $username: String!,
    $email: String!,
    $gender: String!,
    $location: String!,
    $website: String!,
    $bio: String!,
    $interests: String!,
    $phoneNumber: String!,
    $password: String!
  ) {
      createUser(
        input: {
          username: $username, 
          email: $email, 
          gender: $gender, 
          location: $location, 
          website: $website,
          bio: $bio, 
          interests: $interests, 
          phoneNumber: $phoneNumber, 
          password: $password
        }
      ) {
        user {
          username
          email
          gender
          location
          website
          bio
          interests
          phoneNumber
        }
      }
    }
  `;