import {writeFileSync} from "fs";
import {join} from "path";

import gamePage from "./pages/game";
import getGames from "../data/get-games";

function renderPage(html: string, path: string): void {
    writeFileSync(join(process.cwd(), 'public', path), html, "utf8");
}

async function main(): Promise<void> {
    const games = await getGames();
    games.forEach(async game => {
        const html = await gamePage(game.uuid);
        renderPage(html, join('game', `${game.uuid}.html`));
    })
}
main();