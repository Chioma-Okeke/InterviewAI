// src/components/VideoInterview.js
import React, { useRef, useEffect, useState } from "react";

const VideoInterview = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [isCalling, setIsCalling] = useState(false);
    const [localStream, setLocalStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const configuration = {
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" }, // STUN server
        ],
    };

    useEffect(() => {
        return () => {
            // Clean up the local stream and peer connection when the component unmounts
            if (localStream) {
                localStream.getTracks().forEach((track) => track.stop());
            }
            if (peerConnection) {
                peerConnection.close();
            }
        };
    }, [localStream, peerConnection]);

    const startCall = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        setLocalStream(stream);
        localVideoRef.current.srcObject = stream;

        const pc = new RTCPeerConnection(configuration);
        setPeerConnection(pc);

        stream.getTracks().forEach((track) => pc.addTrack(track, stream));

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                // Here you would send the candidate to the remote peer
                console.log("New ICE candidate", event.candidate);
            }
        };

        pc.ontrack = (event) => {
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        // Here you would send the offer to the remote peer
        console.log("Offer sent", offer);

        setIsCalling(true);
    };

    const endCall = () => {
        localStream.getTracks().forEach((track) => track.stop());
        peerConnection.close();
        setIsCalling(false);
        setLocalStream(null);
        setPeerConnection(null);
    };

    return (
        <div className="video-call-container flex flex-col items-center">
            <div className="video-container">
                <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    className="local-video border rounded-lg"
                    style={{ width: "300px", height: "200px" }}
                />
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    className="remote-video border rounded-lg"
                    style={{ width: "300px", height: "200px" }}
                />
            </div>
            <div className="button-container mt-4">
                {isCalling ? (
                    <button
                        onClick={endCall}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        End Call
                    </button>
                ) : (
                    <button
                        onClick={startCall}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Start Call
                    </button>
                )}
            </div>
        </div>
    );
};

export default VideoInterview;
