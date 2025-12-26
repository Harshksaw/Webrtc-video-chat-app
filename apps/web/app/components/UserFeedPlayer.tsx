
'use client'

import { useEffect, useRef } from "react";

const UserFeedPlayer = ({ stream }: { stream: MediaStream }) => {

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video ref={videoRef}
            muted
            autoPlay
            playsInline
            className="w-full h-full object-cover rounded-xl md:rounded-2xl shadow-xl"
            style={{ transform: "scaleX(-1)" }} // Mirror local video for better UX

        >

        </video>
    )


}

export default UserFeedPlayer;