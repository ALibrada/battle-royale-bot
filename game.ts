import random from "random";
import seedrandom from "seedrandom";

interface Participant {
    name: string;
    avatar: string;
}

function getRandomNumber(low: number, high: number): number {
    const result: number = random.int(low, high);
    console.debug(`Generating random number between ${high} and ${low}: ${result}`);
    return result;
}

function getRandomParticipant(participants: Participant[]): number {
    const randomIndex: number = getRandomNumber(0, participants.length - 1);
    return randomIndex;
};

function getSelectedParticipants(participants: Participant[]): Participant[] {
    let index1: number = getRandomParticipant(participants);
    let index2: number = getRandomParticipant(participants);
    while (index1 === index2) {
        index2 = getRandomParticipant(participants)
    }
    return [participants[index1], participants[index2]];
}

function getParticipants(): Participant[] {
    const data = require("./data.json");
    return data;
}

interface DuelResult {
    winner: Participant;
    loser: Participant;
}

function fight(participants: Participant[]): DuelResult {
    const winnerIndex: number = getRandomNumber(0, 1);
    if (winnerIndex === 1) {
        return {winner: participants[1], loser: participants[0]}
    } else {
        return {winner: participants[0], loser: participants[1]}
    }
}

function game(participants: Participant[]): DuelResult {
    const duelMembers = getSelectedParticipants(participants);
    console.log(`${duelMembers[0].name} will fight against ${duelMembers[1].name}`);
    const duelResult: DuelResult = fight(duelMembers);
    console.log(`${duelResult.winner.name} has defeated ${duelResult.loser.name}`);
    return duelResult;
}

function removeElementFromArray(participants: Participant[], participant: Participant): void {
    const index = participants.indexOf(participant);
    participants.splice(index, 1);
}

function run(seed: string): void {
    random.use(seedrandom(seed));

    const participants: Participant[] = getParticipants();
    while(participants.length > 1) {
        const result: DuelResult = game(participants);
        removeElementFromArray(participants, result.loser);
        console.log(`${participants.length} remaining`);
    }
    console.log(`${participants[0].name} has won the Battle Royale`);
}