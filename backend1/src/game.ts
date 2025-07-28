import { WebSocket } from "ws";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: string;
    public moves: string[];
    public startTime: Date;


    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = "";
        this.moves = [];
        this.startTime = new Date();
    }

    makeMove(socket: WebSocket, move: string) {
        //validate move
        // is this player's turn
        // is moce valid
        // update the board
        //push the moce
        // check if game is over
        // send updateed board to both players
    }


}