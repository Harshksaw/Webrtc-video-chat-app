'use client'
import { useRouter } from "next/navigation";
import { createContext, useContext, useReducer, useState, useEffect } from "react";

import SocketIoClient from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";
import { peerReducer } from "../reducers/peerReducer";
import { addPeerAction } from "../actions/peerAction";

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

    const [peers, dispatch] = useReducer(peerReducer, {});

    const fetchUserFeed = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        setStream(stream);
    }

    useEffect(() => {
        const isProduction = process.env.NODE_ENV === "production";
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const url = new URL(backendUrl);

        const newPeer = new Peer(uuidv4(), {
            host: url.hostname,
            port: isProduction ? 443 : parseInt(url.port) || 3001,
            path: "/peerjs",
            secure: isProduction || url.protocol === 'https:',
            debug: 3
        });




        setUser(newPeer);
        fetchUserFeed();

        const enterRoom = ({ roomId }: { roomId: string }) => {
            router.push(`/room/${roomId}`);

        }

        socket.on("room_created", enterRoom)



    }, []);

    useEffect(() => {
        if (!user || !stream) return;

        socket.on("user-joined", ({ peerId }) => {
            const call = user.call(peerId, stream)
            console.log("Calling the new peer", peerId)
            call.on("stream", (remoteStream) => {
                dispatch(addPeerAction(call.peer, remoteStream))

            })
        })

        user.on("call", (call) => {
            console.log("Incoming call from", call.peer)

            call.answer(stream)
            call.on("stream", (remoteStream) => {
                dispatch(addPeerAction(call.peer, remoteStream))
            })
        })



    }, [user, stream]);



    return (
        <SocketContext.Provider value={{ socket, user, stream, peer: peers }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    return context;
};