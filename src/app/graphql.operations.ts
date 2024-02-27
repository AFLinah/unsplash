import { gql } from "apollo-angular";

const GET_USERS = gql `
    query Users {
        users(first: 4) {
            edges {
                node {
                    email
                    firstName
                    gender
                    id
                    isActive
                }
            }
        }
    }
`

export { GET_USERS };