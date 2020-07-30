import axios from "axios";
import {DuelResult} from "../types";

interface SlackProps {
    slackUrl: string;
    slackChannel: string;
    resultsUrl: string;
}

function notification(duel: DuelResult, {slackChannel, slackUrl, resultsUrl}: SlackProps): Promise<void> {
    const payload = {
        channel: slackChannel,
        username: "Battle Royale",
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "There has been another encounter:"
                }
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*${duel.winner.name}* has won against *${duel.loser.name}*`
                }
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `Check your results here: <${resultsUrl}|Results>`
                }
            }
        ],
        icon_emoji: ":bowtie:"
    };

    return axios.post(slackUrl, payload)
}

export default notification;