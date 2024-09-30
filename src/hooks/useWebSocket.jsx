// src/hooks/useWebSocket.js
import { useContext, useEffect, useRef } from "react";
import io from "socket.io-client";
import { AuthContext } from "../contexts/AuthContext";
import { useSelector } from "react-redux";

const SOCKET_SERVER_URL = "https://interview-ai-1-8he2.onrender.com/";

const useWebSocket = (onMessage) => {
    const { userData } = useContext(AuthContext);
    const interviewDetails = useSelector(
        (state) => state.interview.interviewDetails
    );
    const socketRef = useRef();
    // Destructure the properties
    const {
        candidateFirstname,
        resumeUrl,
        roleName,
        experienceLevel,
        jobDescription,
    } = interviewDetails;

    // Use the destructured values to create your payload
    const payload = {
        candidateFirstname,
        resumeUrl,
        roleName,
        experienceLevel,
        jobDescription,
    };

    useEffect(() => {
        // Connect to the WebSocket server
        socketRef.current = io(SOCKET_SERVER_URL, {
            query: payload,
        });

        // Listen for incoming messages
        socketRef.current.on("INTERVIEWER_RESPONSE", (message) => {
            console.log(message, "coming in")
            if (onMessage) {
                onMessage(message);
            }
        });

        // Listen for messages from the server
        socketRef.current.on("INTERVIEW_COMPLETED", (message) => {
            if (onMessage) {
                onMessage(message);
            }
        });

        // Listen for messages from the server
        socketRef.current.on("INCOMPLETE_INTERVIEW_DATA", (response) => {
            // Sample Response
            // { candidateFirstname, roleName, experienceLevel, jobDescription  }
            // check null field

            window.alert("INCOMPLETE INTERVIEW DETAILS SENT TO SERVER");
            window.alert(response);
        });

        // Listen for messages from the server
        socketRef.current.on("SERVER_ERROR", (response) => {
            // Sample Response
            // "a string"
            window.alert("SERVER ERROR");
        });

        // Clean up the connection on component unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, [interviewDetails, onMessage]);

    return socketRef;
};

export default useWebSocket;
