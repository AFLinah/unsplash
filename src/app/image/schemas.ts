import { gql } from "apollo-angular";

const baseResponse = `
    edges {
        node {
            id
            fileName
            baseUrl
            description
            blurhashCode
            category
            aiDescription
            user {
                email
                username
            }
        }
    }
    pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
    }
`

const IMAGE_QUERY = gql`
    query MyQuery {
        getImages(first: 20) {
            ${baseResponse}
        }
    }
`

export default IMAGE_QUERY;