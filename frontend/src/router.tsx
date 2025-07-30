import {
    Routes, Route
} from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import Layout from "./layout/layout";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/game" element={<GamePage />} />
            </Route>
        </Routes>
    )
}