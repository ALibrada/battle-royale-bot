import graphqlRequest from "./graphql-request";

interface Game {
    uuid: string;
    name: string;
}

function getGames(): Promise<Game[]> {
    const query = `
        query getGames{
            game {
                uuid
                name
            }
        }`;
    return graphqlRequest<{}>(query)
        .then(data => data.game)
}

export default getGames;