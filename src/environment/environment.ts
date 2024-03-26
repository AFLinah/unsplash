export const environment = {
    mode: "dev", // prod, staging
    dev: {
        API_URL: 'http://localhost:8000',
        GRAPHQL_SERVER: 'http://localhost:8000/api/v1/graphql'
    },
    prod: {
        API_URL: 'http://localhost:8000',
        GRAPHQL_SERVER: 'http://localhost:8000/api/v1/graphql'
    }
}