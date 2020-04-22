import * as yargs from 'yargs'
import run from "../game/graphql-round";

interface Arguments {
    [x: string]: unknown;
    uuid: string;
}

const args: Arguments = yargs
    .option('uuid',{type: 'string', demandOption: true}).argv;

run(args.uuid);