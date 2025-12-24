'use client'
import { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { useRouter } from "next/navigation";

const CreateRoom: React.FC = () => {
    const { socket } = useContext(SocketContext);
    const router = useRouter();

    useEffect(() => {
        socket.on("room_created", ({ roomId }: { roomId: string }) => {
            console.log("Room created:", roomId);
            router.push(`/room/${roomId}`);
        });

        return () => {
            socket.off("room_created");
        };
    }, [socket, router]);

    const initRoom = () => {
        socket.emit("create_room");
    }

    return (
        <button
            onClick={initRoom}
            className="btn btn-primary w-full btn-lg text-white font-semibold btn-glow hover:scale-105 transition-transform text-base sm:text-lg"
        >
        
        
            <span className="text-base sm:text-lg">Start a New Meeting</span>
        </button>
    );
}
export default CreateRoom;