import { useState, useEffect } from "react";
import pauseIcon from "../../assets/pause.svg";
import stopIcon from "../../assets/stop.svg";
import { TfiControlPlay } from "react-icons/tfi";

const Timer = () => {
    const [time, setTime] = useState({ minutes: 0, seconds: 0 });
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => {
                    const updatedSeconds = prevTime.seconds + 1;
                    const updatedMinutes =
                        updatedSeconds === 60
                            ? prevTime.minutes + 1
                            : prevTime.minutes;
                    return {
                        minutes: updatedMinutes,
                        seconds: updatedSeconds % 60,
                    };
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isRunning]);

    const handlePause = () => {
        setIsRunning(false);
    };

    function handlePlay() {
        setIsRunning(false)
    }

    const handleStop = () => {
        setIsRunning(false);
        setTime({ minutes: 0, seconds: 0 });
    };

    return (
        <div className="flex items-center justify-between h-[54px] dark:text-ternary-light">
            <div className="text-2xl  flex items-center gap-2">
                <div className="flex flex-col items-center">
                    {String(time.minutes).padStart(2, "0")}
                    <span className="text-sm">minutes</span>
                </div>
                :
                <div className="flex flex-col items-center">
                    {String(time.seconds).padStart(2, "0")}
                    <span className="text-sm">minutes</span>
                </div>
            </div>
            <div className="flex gap-10 text-sm">
                <div
                    className="flex flex-col items-center cursor-pointer hover:scale-110"
                    onClick={handlePause}
                >
                    <img src={pauseIcon} alt="" className="w-8" />
                    <p className="">Pause</p>
                </div>
                <div
                    className="flex flex-col items-center cursor-pointer hover:scale-110"
                    onClick={handleStop}
                >
                    <img src={stopIcon} alt="" className="w-8" />
                    <p className="">end</p>
                </div>
            </div>
        </div>
    );
};

export default Timer;
