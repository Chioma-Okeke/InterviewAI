// src/components/AudioInterview.js
import React, { useEffect, useRef, useState } from "react";
import marble from "../../assets/marble.png";
import audio from "../../assets/audio.png";
import DialogBox from "../reusables/DialogBox";
import { useDispatch, useSelector } from "react-redux";
import { pauseAudioInterview } from "../../store/interviewSlice";

const AudioInterview = () => {
    const [transcript, setTranscript] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [aiResponse, setAiResponse] = useState("");
    const recognitionRef = useRef(null);
    const transcriptionRef = useRef(null);
    const isPauseAudioRequested = useSelector((state)=> state.interview.isPauseAudioRequested)
    const dispatch = useDispatch()

    useEffect(() => {
        // Initialize the speech recognition
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event) => {
            const currentTranscript = Array.from(event.results)
                .map((result) => result[0].transcript)
                .join("");
            setTranscript(currentTranscript);
        };

        recognitionRef.current.onend = () => {
            setIsRecording(false);
        };

        return () => {
            recognitionRef.current.abort(); // Clean up when component unmounts
        };
    }, []);

    // useEffect(() => {
    //     if (transcriptionRef.current) {
    //         transcriptionRef.current.scrollTo({
    //             top: transcriptionRef.current.scrollHeight,
    //             behavior: "smooth",
    //         })
    //     }
    // }, [transcript, aiResponse]);

    useEffect(() => {
        if (transcriptionRef.current) {
            setTimeout(() => {
                transcriptionRef.current.scrollTop =
                    transcriptionRef.current.scrollHeight;
            }, 100);
        }
    }, [transcript, aiResponse]);

    const startRecording = () => {
        setTranscript("");
        recognitionRef.current.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        recognitionRef.current.stop();
    };

    // Mock AI response after 2 seconds for demonstration
    const handleAiResponse = () => {
        setTimeout(() => {
            setAiResponse(
                "Can you walk me through a recent design project you worked on?"
            );
        }, 2000);
    };

    useEffect(() => {
        if (transcript) {
            handleAiResponse();
        }
    }, [transcript]);

    function closeDialog () {
        dispatch(pauseAudioInterview())
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
                    <p ref={transcriptionRef} className="h-20 overflow-auto">
                        {transcript || "Speak something..."}
                    </p>
                </div>
                <div className="ai-response-box rounded lg:w-[445px]  max-w-md flex flex-col-reverse items-center gap-6">
                    <img src={marble} className="w-[115px]" />
                    <p ref={transcriptionRef} className="h-20 overflow-auto">
                        {aiResponse || "Waiting for AI response..."}
                    </p>
                </div>
            </div>
            <div className="button-container mt-4">
                {isRecording ? (
                    <button
                        onClick={stopRecording}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Stop Recording
                    </button>
                ) : (
                    <button
                        onClick={startRecording}
                        className="bg-green-500 text-white px-4 py-2 rounded"
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
