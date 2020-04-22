import {readFileSync} from "fs";
import {join} from "path";
import {Participant,DuelResult} from "../types";
import Game from "./game";

function getParticipants(filePath: string): Participant[] {
    const file = readFileSync(join(process.cwd(), filePath), "utf8");
    return JSON.parse(file);
}

function removeElementFromArray(participants: Participant[], participant: Participant): void {
    const index = participants.indexOf(participant);
    participants.splice(index, 1);
}

function run(seed: string, filePath: string): void {
    const participants: Participant[] = getParticipants(filePath);
    const game = new Game(seed, participants);
    while (participants.length > 1) {
        const duelResult: DuelResult = game.duel();
        removeElementFromArray(participants, duelResult.loser);
        console.log(`${participants.length} remaining`);
    }
    console.log(`${participants[0].name} has won the Battle Royale`);
}

export default run;