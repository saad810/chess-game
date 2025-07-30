import { useEffect, useState } from "react";
import ChessBoard from "../components/ChessBoard"
import Button from "../components/ui/Button"
import useSocket from "../hooks/useSocket";
import { ERROR, GAME_OVER, INIT_GAME, MOVE } from "../utils/constants";
import { Chess } from "chess.js";

const GamePage = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());


  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("Message received:", message);
        switch (message.type) {
          case INIT_GAME:
            console.log("Game initialized");
            // initialize the chess
            setChess(new Chess());
            // create a new board state
            setBoard(chess.board());
            break;
          case MOVE:
            // console.log("Move received:", message.data);
            const move = message.payload;
            chess.move(move);
            setBoard(chess.board());
            console.log("Move made")
            // Handle move logic here

            break;
          case GAME_OVER:
            console.log("Game over:", message.data);
            // Handle game over logic here
            break;
          case ERROR:
            console.error("Error:", message.data);
            // Handle error logic here
            break;
          default:
            console.warn("Unknown message type:", message.type);
            break;
        }
      };
    }
  }, [socket]);


  if (!socket) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="grid grid-cols-6 gap-12 p-4 py-20">
        <div className="col-span-4 flex items-center justify-center select-none"><ChessBoard board={board} /></div>
        <div className="col-span-2">

          <h1 className="text-2xl font-bold text-white">Game Page</h1>
          <Button onClick={() => socket.send(JSON.stringify({ type: INIT_GAME }))}>
            Start New Game
          </Button>
          <div className="mt-4">
            {/* Additional game information or controls can go here */}
          </div>
        </div>

      </div>

    </section>
  )
}

export default GamePage