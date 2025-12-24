'use client'
import CreateRoom from "./components/createRoom";
import JoinRoom from "./components/joinRoom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="text-center mb-6 md:mb-8 space-y-2 max-w-2xl px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold gradient-text mb-3 md:mb-4">
          Video Chat App
        </h1>
        <p className="text-gray-700 text-base sm:text-lg md:text-xl font-medium">
          Connect instantly with crystal clear video calls
        </p>
      </div>

      <div className="card bg-white shadow-2xl p-6 sm:p-8 md:p-10 max-w-md w-full card-hover border border-gray-200">
        <div className="space-y-5 md:space-y-6">
          <CreateRoom />
          <div className="divider text-gray-500 font-medium">OR</div>
          <JoinRoom />
        </div>
      </div>

      <div className="mt-6 md:mt-8 text-center text-sm md:text-base text-gray-600 font-medium">
        <p>🔒 Secure • ⚡ Fast • ✓ Reliable</p>
      </div>
    </div>
  );
}