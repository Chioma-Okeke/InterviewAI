// src/components/AudioInterview.js
import React, { useEffect, useRef, useState } from 'react';

const AudioInterview = () => {
    const [transcript, setTranscript] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const recognitionRef = useRef(null);

    useEffect(() => {
        // Initialize the speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event) => {
            const currentTranscript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');
            setTranscript(currentTranscript);
        };

        recognitionRef.current.onend = () => {
            setIsRecording(false);
        };

        return () => {
            recognitionRef.current.abort(); // Clean up when component unmounts
        };
    }, []);

    const startRecording = () => {
        setTranscript('');
        recognitionRef.current.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        recognitionRef.current.stop();
    };

    // Mock AI response after 2 seconds for demonstration
    const handleAiResponse = () => {
        setTimeout(() => {
            setAiResponse("This is a mock AI response to your question.");
        }, 2000);
    };

    useEffect(() => {
        if (transcript) {
            handleAiResponse();
        }
    }, [transcript]);

    return (
        <div className="audio-interview-container flex flex-col items-center">
            <h2 className="text-xl mb-4">Audio Interview</h2>
            <div className="transcript-box border rounded p-4 mb-4 w-full max-w-md">
                <h3 className="text-lg">Transcript:</h3>
                <p>{transcript || "Speak something..."}</p>
            </div>
            <div className="ai-response-box border rounded p-4 w-full max-w-md">
                <h3 className="text-lg">AI Response:</h3>
                <p>{aiResponse || "Waiting for AI response..."}</p>
            </div>
            <div className="button-container mt-4">
                {isRecording ? (
                    <button onClick={stopRecording} className="bg-red-500 text-white px-4 py-2 rounded">
                        Stop Recording
                    </button>
                ) : (
                    <button onClick={startRecording} className="bg-green-500 text-white px-4 py-2 rounded">
                        Start Recording
                    </button>
                )}
            </div>
        </div>
    );
};

export default AudioInterview;
