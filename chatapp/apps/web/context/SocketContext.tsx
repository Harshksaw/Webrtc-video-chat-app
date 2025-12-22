import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";

const WS_Server = "http://localhost:5500";

interface ISocketContext {
    socket: Socket;
}

const SocketContext = createContext<ISocketContext | null>(null);

const socket = io(WS_Server);

interface Props {
    children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    return context;
};