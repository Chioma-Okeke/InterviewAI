import React, { useEffect, useRef, useState, useMemo } from "react";
import Logo from "../../assets/logo-black-white.svg";
import SendIcon from "../../assets/send.svg";
import { useDispatch, useSelector } from "react-redux";
import DialogBox from "../reusables/DialogBox";
import { pauseTextInterview } from "../../store/interviewSlice";
import io from "socket.io-client";

const TextInterview = () => {
    const [messages, setMessages] = useState([]);
    const chatBoxRef = useRef(null);
    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch();
    const isPauseTextRequested = useSelector(
        (state) => state.interview.isPauseTextRequested
    );
    const interviewDetails = useSelector(
        (state) => state.interview.interviewDetails
    );

    const {
        candidateFirstname,
        resumeUrl,
        roleName,
        experienceLevel,
        jobDescription,
    } = interviewDetails;

    // Wrap the payload in useMemo
    const payload = useMemo(() => ({
        candidateFirstname,
        resumeUrl,
        roleName,
        experienceLevel,
        jobDescription,
    }), [candidateFirstname, resumeUrl, roleName, experienceLevel, jobDescription]);

    console.log(payload, "payload");

    // Initialize the socket connection
    const socket = useRef(null);

    useEffect(() => {
        socket.current = io("https://interview-ai-1-8he2.onrender.com/", {
            query: payload,
        });

        // Clean up the socket connection on component unmount
        return () => {
            socket.current.disconnect();
        };
    }, [payload]);

    // Listen for messages from the server
    useEffect(() => {
        const handleInterviewerResponse = (response) => {
            console.log(response, "res from socket");
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: response.msg, sender: "AI" },
            ]);
        };

        const handleInterviewCompleted = (response) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: response.msg, sender: "AI" },
            ]);
        };

        const handleIncompleteInterviewData = (response) => {
            window.alert("INCOMPLETE INTERVIEW DETAILS SENT TO SERVER");
            window.alert(response);
        };

        const handleServerError = () => {
            window.alert("SERVER ERROR");
        };

        socket.current.on("INTERVIEWER_RESPONSE", handleInterviewerResponse);
        socket.current.on("INTERVIEW_COMPLETED", handleInterviewCompleted);
        socket.current.on("INCOMPLETE_INTERVIEW_DATA", handleIncompleteInterviewData);
        socket.current.on("SERVER_ERROR", handleServerError);

        // Clean up socket listeners on unmount
        return () => {
            socket.current.off("INTERVIEWER_RESPONSE", handleInterviewerResponse);
            socket.current.off("INTERVIEW_COMPLETED", handleInterviewCompleted);
            socket.current.off("INCOMPLETE_INTERVIEW_DATA", handleIncompleteInterviewData);
            socket.current.off("SERVER_ERROR", handleServerError);
        };
    }, []);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTo({
                top: chatBoxRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();

        if (inputValue.trim() === "") return; // Prevent sending empty messages

        const newMessage = {
            id: Date.now(),
            text: inputValue,
            sender: "user", // Identify the user as the sender
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        socket.current.emit("message", inputValue); // Emit the message to the server
        setInputValue(""); // Clear input field after sending
    };

    function closeDialog() {
        dispatch(pauseTextInterview());
    }

    return (
        <main>
            <div
                className={`z-10 flex flex-col gap-[6px] lg:min-h-[588px] 2xl:h-[80vh] mb-3 chat-container rounded-lg shadow-lg max-w-[762px] mx-auto text-primary-dark dark:text-primary-light ${
                    messages.length > 0 ? "mt-0" : " mt-[35px]"
                }`}
            >
                <div
                    ref={chatBoxRef}
                    className="overflow-y-auto h-[85vh] pr-1 scroller"
                >
                    <img
                        src={Logo}
                        alt="Logo Icon"
                        className="w-[61px] mx-auto mb-10"
                    />
                    <div className=" h-72 chat-messages flex flex-col">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message p-2 rounded-lg mb-8 text-sm lg:text-base ${
                                    message.sender === "user"
                                        ? "dark:bg-hover-dark rounded-3xl p-4 self-end leading-[26px] max-w-[336px] lg:max-w-[598px]"
                                        : "self-start w-full"
                                }`}
                            >
                                {message.sender !== "user" ? (
                                    <div className="flex gap-6">
                                        <img src={Logo} alt="" />
                                        <span>{message.text}</span>
                                    </div>
                                ) : (
                                    <span>{message.text}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSendMessage} className="h-[10%]">
                    <div className="flex dark:bg-hover-dark rounded-3xl justify-between px-4 py-[10px]">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-grow bg-transparent focus:outline-none leading-[20px]"
                            placeholder="Message InterviewAI"
                        />
                        <button
                            type="submit"
                            className={`dark:bg-primary-light rounded-full p-2 transition-all duration-500 ${
                                inputValue
                                    ? "dark:bg-primary-light"
                                    : "dark:bg-[#676767]"
                            }`}
                            disabled={!inputValue}
                        >
                            <img src={SendIcon} alt="" />
                        </button>
                    </div>
                </form>
            </div>
            {isPauseTextRequested && (
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

export default TextInterview;