import type { Color, PieceSymbol, Square } from "chess.js"
import { useState } from "react";

const ChessBoard = ({ board, socket }: {
  board: ({
    square: Square;
    color: Color;
    type: PieceSymbol
  } | null)[][];
  socket: WebSocket | null;
}) => {
  // console.log(board)
  console.log("[board]:", board);
  const [from, setFrom] = useState<Square | null>(null);
  const [to, setTo] = useState<Square | null>(null);
  return (
    <div>
      {
        board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((square, colIndex) => (
              <div onClick={
                () => {
                  // Handle square click logic here
                  console.log(`Square clicked: Row ${rowIndex}, Col ${colIndex}`, square);
                  if(!from) {
                    setFrom(square?.square ?? null);
                    console.log("From:", square?.square);
                  }else{
                    setTo(square?.square ?? null);
                    console.log("To:", square?.square);
                    
                  }

                }
              } key={colIndex} className={`w-16 h-16 flex items-center justify-center ${((rowIndex + colIndex) % 2 === 0) ? 'bg-amber-50' : 'bg-primary'}`}>
                {square ? (
                  <span >{square.type}</span>
                ) : null}
              </div>
            ))}
          </div>
        ))
      }
    </div>
  )
}

export default ChessBoard