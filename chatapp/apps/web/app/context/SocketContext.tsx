'use client'
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

import SocketIoClient from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";

const WS_Server = "http://localhost:3001";


export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server, {
    withCredentials: false,
    transports: ["polling", "websocket"]

});

interface Props {
    children: React.ReactNode;
}



export const SocketProvider: React.FC<Props> = ({ children }) => {

    const router = useRouter();
    const [stream, setStream] = useState<MediaStream | null>(null);

    const [user, setUser] = useState<Peer | null>(null);

    const fetchUserFeed = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        setStream(stream);
    }

    useEffect(() => {
        const userId = uuidv4();
        const newPeer = new Peer(userId);




        setUser(newPeer);
        fetchUserFeed();

        const enterRoom = ({ roomId }: { roomId: string }) => {
            router.push(`/room/${roomId}`);

        }

        socket.on("room_created", enterRoom)



    }, []);





    return (
        <SocketContext.Provider value={{ socket, user, stream }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    return context;
};