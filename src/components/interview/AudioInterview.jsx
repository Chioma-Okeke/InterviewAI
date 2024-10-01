import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { pauseAudioInterview } from "../../store/interviewSlice";
import marble from "../../assets/marble.png";
import audio from "../../assets/audio.png";
import DialogBox from "../reusables/DialogBox";

const AudioInterview = () => {
    const [transcript, setTranscript] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [aiResponse, setAiResponse] = useState("");

    const recognitionRef = useRef(null);
    const socket = useRef(null);

    const dispatch = useDispatch();
    const interviewDetails = useSelector(
        (state) => state.interview.interviewDetails
    );
    const isPauseAudioRequested = useSelector(
        (state) => state.interview.isPauseAudioRequested
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
        }

        const handleInterviewerResponse = (response) => {
            const cleanedMessage = response.msg.replace(/^Interviewer:\s*/, "");

            setAiResponse(cleanedMessage);
        };

        socket.current.on("INTERVIEWER_RESPONSE", handleInterviewerResponse);

        return () => {
            socket.current.off(
                "INTERVIEWER_RESPONSE",
                handleInterviewerResponse
            );
            socket.current.disconnect();
            socket.current = null;
        };
    }, [payload]);

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.interimResults = true;

        let debounceTimeout;
        recognitionRef.current.onresult = (event) => {
            const currentTranscript = Array.from(event.results)
                .map((result) => result[0].transcript)
                .join("");
            setTranscript(currentTranscript);

            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                socket.current.emit("message", currentTranscript);
            }, 500); 
        };

        recognitionRef.current.onend = () => {
            setIsRecording(false);
        };

        return () => {
            recognitionRef.current.abort(); 
        };
    }, []);

    const startRecording = () => {
        setTranscript("");
        recognitionRef.current.start();
        setIsRecording(true);

        const timer = setTimeout(() => {
            stopRecording();
        }, 40000); 

        return () => clearTimeout(timer);
    };

    const stopRecording = () => {
        recognitionRef.current.stop();
    };

    useEffect(() => {
        if (aiResponse) {
            const utterance = new SpeechSynthesisUtterance(aiResponse);
            window.speechSynthesis.cancel(); 
            window.speechSynthesis.speak(utterance);
        }
    }, [aiResponse]);

    function closeDialog() {
        dispatch(pauseAudioInterview());
    }

    return (
        <main>
            <div className="relative audio-interview-container w-[90%] mx-auto flex flex-col-reverse items-center mt-[53px] gap-20">
                <div className="relative transcript-box rounded mb-4 w-full max-w-md flex flex-col-reverse items-center gap-16">
                    <div className="relative">
                        <div
                            className={`bg-filter bg-brand-color blur-[250px] rounded-full absolute h-full w-full ${
                                isRecording ? "custom-animate-pulse" : ""
                            }`}
                        ></div>
                        <img src={audio} className={`w-[355.05px]`} />
                    </div>
                    <p  className="h-20 overflow-auto">
                        {transcript || "Speak something..."}
                    </p>
                </div>
                <div className="ai-response-box rounded lg:w-[445px]  max-w-md flex flex-col-reverse items-center gap-6">
                    <img src={marble} className="w-[115px]" />
                    <p  className="h-20 overflow-auto">
                        {aiResponse || "Waiting for AI response..."}
                    </p>
                </div>
            </div>
            <div className="button-container mt-10 w-fit mx-auto">
                {isRecording ? (
                    <button
                        onClick={stopRecording}
                        className="bg-transparent border border-brand-color text-white px-4 py-2 rounded"
                    >
                        Stop Recording
                    </button>
                ) : (
                    <button
                        onClick={startRecording}
                        className="bg-brand-color text-white px-4 py-2 rounded"
                    >
                        Start Recording
                    </button>
                )}
            </div>
            {isPauseAudioRequested && (
                <DialogBox
                    subHeading="Are you sure you want to pause the interview?"
                    message="Pausing will save your progress, but make sure to return soon to complete it"
                    cancelText="Cancel"
                    okText="Pause Interview"
                    close={closeDialog}
                />
            )}
        </main>
    );
};

export default AudioInterview;
