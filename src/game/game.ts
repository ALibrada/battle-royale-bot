import seedrandom from "seedrandom";
import {Participant, DuelResult} from "../types";

class Game {
    rng: any;
    participants: Participant[];

    constructor(seed: string, participants: Participant[], roundNumber: number = 0) {
        this.rng = require("random");
        this.rng.use(seedrandom(seed));
        for (let i = 0; i <= roundNumber; i++) {
            this.rng.next();
        }
        this.participants = participants;
    }

    private getRandomNumber(low: number, high: number): number {
        const result: number = this.rng.int(low, high);
        console.debug(`Generating random number between ${high} and ${low}: ${result}`);
        return result;
    }

    private getRandomParticipant(): number {
        const randomIndex: number = this.getRandomNumber(0, this.participants.length - 1);
        return randomIndex;
    };

    private getSelectedParticipants(): Participant[] {
        let index1: number = this.getRandomParticipant();
        let index2: number = this.getRandomParticipant();
        while (index1 === index2) {
            index2 = this.getRandomParticipant()
        }
        return [this.participants[index1], this.participants[index2]];
    }

    public duel(): DuelResult {
        const participants = this.getSelectedParticipants();
        const winnerIndex: number = this.getRandomNumber(0, 1);
        if (winnerIndex === 1) {
            return {winner: participants[1], loser: participants[0]}
        } else {
            return {winner: participants[0], loser: participants[1]}
        }
    }

}

export default Game;