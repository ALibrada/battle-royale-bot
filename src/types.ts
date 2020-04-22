interface Participant {
    name: string;
    avatar: string;
    uuid: string;
}

interface DuelResult {
    winner: Participant;
    loser: Participant;
}

interface Fight extends DuelResult {
    timestamp: string;
}

export {Participant, DuelResult, Fight}