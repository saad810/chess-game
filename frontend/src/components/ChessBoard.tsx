import type { Color, PieceSymbol, Square } from "chess.js"

const ChessBoard = ({ board }: {
  board: ({
    square: Square;
    color: Color;
    type: PieceSymbol
  } | null)[][]
}) => {
  console.log(board)
  return (
    <div>
      {
        board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((square, colIndex) => (
              <div key={colIndex} className={`w-16 h-16 flex items-center justify-center ${((rowIndex + colIndex) % 2 === 0) ? 'bg-amber-50' : 'bg-primary'}`}>
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