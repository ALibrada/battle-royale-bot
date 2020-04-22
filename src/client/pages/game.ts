import getGame from "../../data/get-game";
import html from "../utils/html";
import {Fight, Participant} from "../../types";

function participantRow({avatar, name}: Participant): string {
    return `
        <tr>
          <td><img src="${avatar}" alt="${name}"></td>
          <td>${name}</td>
        </tr>
    `;
}

function participantsTable(participants: Participant[]): string {
    const table = participants.map(participantRow).join("\n");
    return `
            <table class="u-full-width">
              <thead>
                <tr>
                  <th>Participant</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                ${table}
              </tbody>
            </table>`;
}

function fightsTable(fights: Fight[]) {
    const table = fights.map(f => `
        <tr>
            <td>
                <img src="${f.winner.avatar}" alt="${f.winner.name}">
            </td>
            <td>
                <img src="${f.loser.avatar}" alt="${f.loser.name}">
            </td>
            <td>${new Date(f.timestamp).toLocaleString()}</td>
        </tr>
        `).join("\n");
    return `
        <table class="u-full-width">
          <thead>
            <tr>
              <th>Winner</th>
              <th>Loser</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${table}
          </tbody>
        </table>`;
}

function gamePage(uuid: string): Promise<string> {
    return getGame(uuid)
        .then(game => {
            const alive = game.alive.map((p) => ({...p.participant}));
            const dead = game.dead.map((p) => ({...p.participant}));
            const fights: Fight[] = game.game_fights;
            const content = `
            <div class="container">
                <h1>${game.name}</h1>
                <div class="row">
                    <h3>Fights</h3>
                    ${fightsTable(fights)}
                </div>
                <div class="row">
                    <div class="six columns">
                        <h4>Alive</h4>
                        ${participantsTable(alive)}
                    </div>
                    <div class="six columns">
                        <h4>Dead</h4>
                        ${participantsTable(dead)}
                    </div>
                 </div>
            </div>`;
            return html({content, title: game.name});
        });
}

export default gamePage;