import  {
    Routes, Route
} from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";


export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/game" element={<GamePage />} />
        </Routes>
    )
}