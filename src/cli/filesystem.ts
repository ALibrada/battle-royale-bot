import * as yargs from 'yargs'
import run from "../game/filesystem";

interface Arguments {
    [x: string]: unknown;
    seed: string;
    file: string;
}

const args: Arguments = yargs
    .option('seed', { type: 'string', demandOption: true })
    .option('file',{type: 'string', demandOption: true}).argv;

run(args.seed, args.file);