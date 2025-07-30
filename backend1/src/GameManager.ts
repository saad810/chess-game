import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./game";


export class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null = null;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket: WebSocket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket);
        //stop the game because user has left


    }

    private addHandler(socket: WebSocket) {
        socket.on('message', (data: string) => {
            const message = JSON.parse(data);
            switch (message.type) {
                case INIT_GAME:
                    if (this.pendingUser) {
                        //start the game
                        const game = new Game(this.pendingUser, socket);
                        this.games.push(game);
                        this.pendingUser = null;
                    } else {
                        this.pendingUser = socket;
                    }
                    break;
                case MOVE:
                    const game = this.games.find(g => g.player1 === socket || g.player2 === socket);
                    if (game) {
                        game.makeMove(socket, message.payload);
                    }
                    break;
                default:
                    console.error('Unknown message type:', message.type);
                    break;
            }

        });
    }
}

