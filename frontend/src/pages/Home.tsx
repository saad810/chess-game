import { useNavigate } from "react-router-dom";



const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-5 gap-12 p-4 py-20">
      <div className="col-span-3">
        {/* chess board */}
        <img src={"/chessboard.png"} className="w-[550px] ml-20" alt="" />
      </div>
      <div className="col-span-2 flex flex-col gap-10">
        <div>
          <h2 className="text-6xl leading-16  font-bold text-amber-50">Play Chess Online</h2>
          <p className="mt-2 text-lg text-amber-50">
            Join a game or create a new one to start playing.
          </p>
        </div>
        <div className="">
          <button className="bg-primary text-white px-24 py-6 rounded hover:opacity-95 transition" onClick={() => navigate("/game")}>
            <span className="select-none text-3xl font-semibold">
              Start Game
            </span>
          </button>
        </div>
      </div>

    </div>
  )
}

export default Home