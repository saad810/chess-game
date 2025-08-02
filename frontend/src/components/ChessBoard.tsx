import type { Color, PieceSymbol, Square } from "chess.js"
import { useState } from "react";
import { MOVE } from "../utils/constants";

const ChessBoard = ({ board, socket, setBoard, chess }: {
  board: ({
    square: Square;
    color: Color;
    type: PieceSymbol
  } | null)[][];
  socket: WebSocket;
  chess: any;
  setBoard: any;
}) => {
  // console.log(board)
  console.log("[board]:", board);
  const [from, setFrom] = useState<Square | null>(null);
  return (
    <div>
      {
        board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((square, colIndex) => {
              const squareRepresentation = (String.fromCharCode(97 + (colIndex % 8)) + "" + (8 - rowIndex)) as Square
              return (

                <div onClick={
                  () => {
                    // Handle square click logic here
                    console.log(`Square clicked: Row ${rowIndex}, Col ${colIndex}`, square);
                    if (!from) {
                      setFrom(square?.square ?? null);
                      console.log("From:", square?.square);
                    } else {

                      console.log("To:", squareRepresentation);
                      socket?.send(JSON.stringify({
                        type: MOVE,
                        payload: {
                          from: from,
                          to: squareRepresentation
                        }
                      }));
                      chess.move({ from: from, to: squareRepresentation });
                      
                      setFrom(null);
                      setBoard(chess.board());
                      console.log("Move sent:", {
                        from: from,
                        to: squareRepresentation
                      });


                    }
                  }
                  } key={colIndex} className={`w-16 h-16 flex items-center justify-center ${((rowIndex + colIndex) % 2 === 0) ? 'bg-amber-50' : 'bg-primary'}`}>
                  {square ? (
                    <span >{square? <img className="w-12" src={`/chess/${square?.color === "b" ? square.type : `${square?.type?.toUpperCase()} copy`}.png`}></img> : null}</span>
                  ) : null}
                </div>
              )
            })}
          </div>
        ))
      }
    </div>
  )
}

export default ChessBoard