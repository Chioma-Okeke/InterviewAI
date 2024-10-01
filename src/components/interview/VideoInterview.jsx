import axios from "axios";
import { useRef, useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const VideoInterview = () => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const socket = useRef(null);
    const [isCalling, setIsCalling] = useState(false);
    const [localStream, setLocalStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [aiResponse, setAiResponse] = useState("");
    const [videoSrc, setVideoSrc] = useState("");
    const D_ID_API_KEY = btoa(import.meta.env.VITE_D_ID_API_KEY); 

    const configuration = {
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" }, 
        ],
    };

    const interviewDetails = useSelector(
        (state) => state.interview.interviewDetails
    );


    const payload = useMemo(
        () => ({
            candidateFirstname: interviewDetails.candidateFirstname,
            resumeUrl: interviewDetails.resumeUrl,
            roleName: interviewDetails.roleName,
            experienceLevel: interviewDetails.experienceLevel,
            jobDescription: interviewDetails.jobDescription,
        }),
        [interviewDetails]
    );


    useEffect(() => {
        if (!socket.current) {
            socket.current = io("https://interview-ai-1-8he2.onrender.com/", {
                query: payload,
            });
            const handleInterviewerResponse = async (response) => {
                const cleanedMessage = response.msg.replace(
                    /^Interviewer:\s*/,
                    ""
                );
                setAiResponse(cleanedMessage);
                const talkId = await sendTextToSpeech(cleanedMessage);
                const url = await getSpecificTalk(talkId);
                console.log(url, "url");
                const videoUrl = modifyPendingUrl(url.pending_url);
                setVideoSrc(videoUrl);
            };

            socket.current.on(
                "INTERVIEWER_RESPONSE",
                handleInterviewerResponse
            );

            return () => {
                socket.current.off(
                    "INTERVIEWER_RESPONSE",
                    handleInterviewerResponse
                );
                socket.current.disconnect();
                socket.current = null;
            };
        }
    }, [payload]);

    const modifyPendingUrl = (pendingUrl) => {
        if (!pendingUrl) return "";
        const httpsUrl = pendingUrl
            .replace(
                "s3://d-id-talks-prod/",
                "https://d-id-talks-prod.s3.us-west-2.amazonaws.com/"
            )
            .replace("|", "%7C"); 

        return httpsUrl;
    };

    const sendTextToSpeech = async (text) => {
        try {
            const response = await axios.post(
                "/api",
                {
                    source_url:
                        "https://d-id-public-bucket.s3.us-west-2.amazonaws.com/alice.jpg",
                    script: {
                        type: "text",
                        input: text,
                    },
                },
                {
                    headers: {
                        Authorization: `Basic ${D_ID_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data, "helloo");
            return response.data.id; 
        } catch (error) {
            console.error("Error sending text to D-ID:", error);
            throw error; 
        }
    };

    async function getSpecificTalk(id) {
        try {
            const response = await axios.get(`/getapi/${id}`, {
                headers: {
                    Authorization: `Basic ${D_ID_API_KEY}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data, "uuuuuuu");
            return response.data;
        } catch (error) {
            console.error("Error fetching url");
            throw error;
        }
    }

    // Function to send AI response to D-ID API and get a video stream
    // const handleAiResponse = async (aiMessage) => {
    //     try {
    //         const response = await fetch("https://api.d-id.com/talks", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Access-Control-Allow-Origin": "*",
    //             },
    //             body: {
    //                 source_url: "https://myhost.com/image.jpg",
    //                 script: {
    //                     type: "text",
    //                     input: { aiMessage },
    //                     provider: {
    //                         type: "microsoft",
    //                         voice_id: "en-US-JennyNeural",
    //                         voice_config: {
    //                             style: "Cheerful",
    //                         },
    //                     },
    //                 },
    //             },
    //         });
    //         const data = await response.json();
    //         if (data.streamUrl) {
    //             remoteVideoRef.current.srcObject = await fetchStream(
    //                 data.streamUrl
    //             );
    //         }
    //     } catch (error) {
    //         console.error("Error sending AI response to D-ID API:", error);
    //     }
    // };

    // Function to fetch the video stream from a URL
    // const fetchStream = async (streamUrl) => {
    //     const response = await fetch(streamUrl);
    //     return response.body; // Assuming it returns a readable stream
    // };

    // Clean up the local stream and peer connection when the component unmounts
    useEffect(() => {
        return () => {
            if (localStream) {
                localStream.getTracks().forEach((track) => track.stop());
            }
            if (peerConnection) {
                peerConnection.close();
            }
        };
    }, [localStream, peerConnection]);

    const startCall = async () => {
        try {
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
                    console.log("New ICE candidate", event.candidate);
                    // Here you would send the candidate to the remote peer
                }
            };

            pc.ontrack = (event) => {
                remoteVideoRef.current.srcObject = event.streams[0];
            };

            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            console.log("Offer sent", offer);
            setIsCalling(true);
        } catch (error) {
            console.error("Error starting call:", error);
        }
    };

    const endCall = () => {
        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
        }
        if (peerConnection) {
            peerConnection.close();
        }
        setIsCalling(false);
        setLocalStream(null);
        setPeerConnection(null);
        setVideoSrc("");
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
            {videoSrc && (
                <div className=" mt-4">
                    <video autoPlay width="320" height="240" controls>
                        <source
                            src={videoSrc}
                            type="video/mp4"
                        />
                    </video>
                </div>
            )}
        </div>
    );
};

export default VideoInterview;
