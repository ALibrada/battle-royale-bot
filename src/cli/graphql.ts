import * as yargs from 'yargs'
import run from "../game/graphql-round";
import notification from "../utils/slack-notification";

interface Arguments {
    [x: string]: unknown;
    uuid: string;
    slackUrl?: string;
    slackChannel?: string;
    resultsUrl?: string;
}

const args: Arguments = yargs
    .option('slackUrl',{type: 'string'})
    .option('slackChannel',{type: 'string'})
    .option('resultsUrl',{type: 'string'})
    .option('uuid',{type: 'string', demandOption: true}).argv;

run(args.uuid).then(duel => {
    console.debug(`${duel.winner.name} has defeated ${duel.loser.name}`);
    if (args.slackChannel && args.slackUrl&& args.resultsUrl) {
        return notification(duel, {
            slackChannel: args.slackChannel,
            slackUrl: args.slackUrl,
            resultsUrl: args.resultsUrl
        });
    }
    return Promise.resolve();
});