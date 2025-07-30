import ChessBoard from "../components/ChessBoard"

const GamePage = () => {
  return (
    <section>
      <div className="grid grid-cols-6 gap-12 p-4 py-20">
        <div className="col-span-4"><ChessBoard /></div>
        <div className="col-span-2">

          <h1 className="text-2xl font-bold text-white">Game Page</h1>
          <button className="bg-primary text-white px-4 py-2 rounded">Start New Game</button>
          <div className="mt-4">
            {/* Additional game information or controls can go here */}
          </div>
        </div>
      </div>

    </section>
  )
}

export default GamePage