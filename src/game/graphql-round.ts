import getGame from "../data/get-game";
import saveDuel from "../data/save-duel";
import Game from "./game";
import {DuelResult, Participant} from "../types";

async function run(uuid: string): Promise<void> {
    const data = await getGame(uuid);
    const participants: Participant[] = data.alive.map(p => p.participant);
    const game = new Game(data.seed, participants);
    const duelResult: DuelResult = game.duel();
    await saveDuel({winner: duelResult.winner, loser: duelResult.loser, game: uuid});
}

export default run;