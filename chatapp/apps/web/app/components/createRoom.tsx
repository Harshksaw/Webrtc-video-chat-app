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
        <button onClick={initRoom}
            className="btn btn-primary w-full"
        >
            Start a New Meeting
        </button>
    );
}
export default CreateRoom;