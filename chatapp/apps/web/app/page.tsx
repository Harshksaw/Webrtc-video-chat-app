'use client'
import { SocketProvider } from "./context/SocketContext";
import CreateRoom from "./components/createRoom";
import JoinRoom from "./components/joinRoom";

export default function Home() {
  return (
    <SocketProvider>
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
        <div className="card bg-base-100 shadow-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-8">Video Chat App</h1>
          <div className="space-y-4">
            <CreateRoom />
            <div className="divider">OR</div>
            <JoinRoom />
          </div>
        </div>
      </div>
    </SocketProvider>
  );
}