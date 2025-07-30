import { useEffect, useState } from "react";

const useSocket = () => {
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "ws://localhost:8080";
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        const ws = new WebSocket(SOCKET_URL);
        ws.onopen = () => {
            console.log("WebSocket connection established");
            setSocket(ws);
        };
        ws.onclose = () => {
            console.log("WebSocket connection closed");
            setSocket(null);
        };
        return () => {
            //   if (ws) {
            ws.close();
            //   }
        }

    }, []);

    return socket;
}



export default useSocket