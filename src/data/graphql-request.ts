import axios from "axios";

const {GRAPHQL_ENDPOINT, GRAPHQL_TOKEN} = process.env;

function graphqlRequest<T>(query: string, variables?: T) {
    return axios({
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'x-hasura-admin-secret': GRAPHQL_TOKEN
        },
        url: GRAPHQL_ENDPOINT,
        data: {query, variables}
    })
        .then(response => response.data)
        .then(({data, errors}) => {
            if(errors) {
                console.error(JSON.stringify(errors, null, 5));
            } else {
                return data;
            }
        })
}

export default graphqlRequest;