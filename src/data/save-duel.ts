import graphqlRequest from "./graphql-request";
import {Participant} from "../types";

interface SaveDuelProps {
    winner: Participant;
    loser: Participant;
    game: string;
    number?: string;
}

interface SaveDuelVariables {
    game: string;
    winner: string;
    loser: string;
}

function saveDuel({winner, loser, game, number}: SaveDuelProps): Promise<void> {
    const query = `
        mutation saveDuel($game: uuid!, $winner: uuid!, $loser: uuid!) {
          insert_game_fights(objects: [{game__uuid: $game, winner__uuid: $winner, loser__uuid: $loser}]) {
            affected_rows
          }
          update_game_participants(where: {game_uuid: {_eq: $game}, participant__uuid: {_eq: $loser}}, _set: {alive: false}) {
            affected_rows
          }
        }`;
    const variables: SaveDuelVariables = {
        game: game,
        winner: winner.uuid,
        loser: loser.uuid
    };
    return graphqlRequest<SaveDuelVariables>(query, variables);
}

export default saveDuel;