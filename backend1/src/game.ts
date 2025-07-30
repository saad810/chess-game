import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { ERROR, GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess;
    public startTime: Date;
    private moveCount: number = 0;


    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        // notify about start of game
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }
        }))
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"black"
            }
        }))
    }

    makeMove(socket: WebSocket, move: {
        from: string;
        to: string;
    }) {
        //validate moveboard
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            return
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            return
        }

        // make move
        try {
            this.board.move(move);
            
        } catch (error) {
            console.error("Invalid move:", error);
            socket.send(JSON.stringify({
                type: ERROR,
                payload: {
                    message: "Invalid move"
                }
            }));
            return;
        }

        // check if game is over
        if (this.board.isGameOver()) {
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white',
                }
                
            }))
            this.player2.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white',
                }
                
            }))
            return;
        }

   
        if (this.moveCount % 2 === 0) {
            console.log("Player 1 made a move:", move);
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        } else {
            console.log("Player 2 made a move:", move);
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }));
        }
        this.moveCount++;
    }


}