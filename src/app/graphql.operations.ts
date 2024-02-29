import { gql } from "apollo-angular";

const GET_USERS = gql `
    query Users {
        users(first: 10) {
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
mutation CreateUser {
    createUser(
      input: {
        username: "Ariel", 
        email: "ariel@gmail.com", 
        gender: "Female", 
        location: "Antananarivo", 
        bio: "Lorem ipsum dolor sit amet", 
        interests: "Dance", 
        phoneNumber: "347716184", 
        password: "ariel@1234"}
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