import graphqlRequest from "./graphql-request";

interface GameParticipantRequest {
    participant: ParticipantRequest;
}

interface ParticipantRequest {
    name: string;
    avatar: string;
    uuid: string;
}

interface GameFightRequest {
    winner: ParticipantRequest;
    loser: ParticipantRequest;
    timestamp: string;
    number: number;
}

interface GameRequest {
    name: string;
    seed: string;
    alive: GameParticipantRequest[];
    dead: GameParticipantRequest[];
    game_fights: GameFightRequest[];
}

interface Request {
    game: GameRequest[];
}

interface GetGameVariables {
    uuid: string;
}

async function getGame(uuid: string): Promise<GameRequest> {
    const query = `
    query getGame($uuid: uuid) {
      game(where: {uuid: {_eq: $uuid}}) {
        name
        seed
        alive: game_participants(where: {alive: {_eq: true}}, order_by: {participant: {name: asc}}) {
          participant {
            name
            avatar
            uuid
          }
        }
        dead: game_participants(where: {alive: {_eq: false}}, order_by: {participant: {name: asc}}) {
          participant {
            name
            avatar
            uuid
          }
        }
        game_fights {
          winner {
            name
            avatar
          }
          loser {
            name
            avatar
          }
          timestamp
        }
      }
    }
    `;
    const variables: GetGameVariables = {uuid};
    const data: Request = await graphqlRequest<GetGameVariables>(query, variables);
    const game = data.game[0];
    return game;
}

export default getGame;