'use client'
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { useParams, useRouter } from "next/navigation";

export default function RoomPage() {
    const { socket } = useContext(SocketContext);
    const params = useParams();
    const router = useRouter();
    const roomId = params.roomId as string;
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!roomId) return;

        socket.emit("join_room", { roomId });

        socket.on("user_joined", ({ userId }: { userId: string }) => {
            console.log("User joined:", userId);
            setIsConnected(true);
        });

        socket.on("user_left", ({ userId }: { userId: string }) => {
            console.log("User left:", userId);
        });

        return () => {
            socket.emit("leave_room", { roomId });
            socket.off("user_joined");
            socket.off("user_left");
        };
    }, [roomId, socket]);

    const handleLeaveRoom = () => {
        socket.emit("leave_room", { roomId });
        router.push("/");
    };

    return (
        <div className="min-h-screen p-3 sm:p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white shadow-lg rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 md:mb-6 border border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                        <div className="flex items-start gap-2 sm:gap-3 w-full sm:w-auto">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mt-1"></div>
                            <div className="flex-1 min-w-0">
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 break-all">
                                    Room: <span className="gradient-text">{roomId}</span>
                                </h2>
                                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                                    {isConnected ? "✓ Connected" : "⏳ Waiting for participant..."}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleLeaveRoom}
                            className="btn btn-error btn-sm sm:btn-md gap-2 shadow-lg hover:shadow-xl transition-all text-white font-semibold w-full sm:w-auto"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Leave Room
                        </button>
                    </div>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                    {/* Local Video */}
                    <div className="relative group">
                        <div className="aspect-video video-placeholder rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden shadow-xl">
                            <div className="text-center px-4">
                                <div className="text-5xl sm:text-6xl mb-3 md:mb-4">📹</div>
                                <p className="text-sm sm:text-base font-semibold text-gray-700">Your Video</p>
                                <div className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full inline-block text-xs sm:text-sm font-medium">
                                    You
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black/60 backdrop-blur-sm text-white px-2 sm:px-3 py-1 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold">
                            Local
                        </div>
                    </div>

                    {/* Remote Video */}
                    <div className="relative group">
                        <div className="aspect-video video-placeholder rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden shadow-xl">
                            <div className="text-center px-4">
                                <div className="text-5xl sm:text-6xl mb-3 md:mb-4">
                                    {isConnected ? "📹" : "⏳"}
                                </div>
                                <p className="text-sm sm:text-base font-semibold text-gray-700">
                                    {isConnected ? "Remote Video" : "Waiting for peer..."}
                                </p>
                                {isConnected && (
                                    <div className="mt-2 px-3 py-1 bg-purple-100 text-purple-800 rounded-full inline-block text-xs sm:text-sm font-medium">
                                        Peer
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black/60 backdrop-blur-sm text-white px-2 sm:px-3 py-1 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold">
                            {isConnected ? "Remote" : "Connecting..."}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-white shadow-lg rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200">
                    <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
                        <button className="btn btn-circle btn-md sm:btn-lg bg-white hover:bg-gray-100 border-2 border-gray-400 shadow-md hover:shadow-xl transition-all" title="Microphone">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </button>
                        <button className="btn btn-circle btn-md sm:btn-lg bg-white hover:bg-gray-100 border-2 border-gray-400 shadow-md hover:shadow-xl transition-all" title="Camera">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <button className="btn btn-circle btn-md sm:btn-lg bg-red-500 hover:bg-red-600 text-white border-none shadow-lg hover:shadow-xl transition-all" title="End Call">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                            </svg>
                        </button>
                        <button className="btn btn-circle btn-md sm:btn-lg bg-white hover:bg-gray-100 border-2 border-gray-400 shadow-md hover:shadow-xl transition-all" title="Share Screen">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex justify-center gap-3 sm:gap-4 md:gap-6 mt-3 sm:mt-4 text-xs sm:text-sm text-gray-700 font-medium flex-wrap">
                        <span className="hidden sm:inline">Microphone</span>
                        <span className="hidden sm:inline">Camera</span>
                        <span className="hidden sm:inline">End Call</span>
                        <span className="hidden sm:inline">Share</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
