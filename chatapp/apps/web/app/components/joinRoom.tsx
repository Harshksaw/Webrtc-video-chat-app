'use client'
import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { useRouter } from "next/navigation";

const JoinRoom: React.FC = () => {
    const { socket } = useContext(SocketContext);
    const router = useRouter();
    const [roomId, setRoomId] = useState("");

    const handleJoinRoom = () => {
        if (roomId.trim()) {
            router.push(`/room/${roomId}`);
        }
    }

    return (
        <div className="space-y-3">
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-gray-800 text-sm sm:text-base">Room ID</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter Room ID"
                    className="input input-bordered w-full focus:input-secondary focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-base sm:text-lg text-gray-900 placeholder:text-gray-400"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom()}
                />
            </div>
            <button
                onClick={handleJoinRoom}
                className="btn btn-secondary w-full btn-lg text-white font-semibold btn-glow hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 text-base sm:text-lg"
                disabled={!roomId.trim()}
            >
           
           
                <span className="text-md sm:text-lg">Join Meeting</span>
            </button>
        </div>
    );
}

export default JoinRoom;
