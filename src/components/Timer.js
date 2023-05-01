import { useEffect, useState } from "react";

function Timer({ sec, callback }) {

    const [time, setTime] = useState(sec);

    useEffect(() => {
        if (301 === time) {
            callback();
        }

        let intervalId;
        intervalId = setInterval(() => setTime(time + 1), 1000);
        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time]);

    const minutes = Math.floor((time % 360000) / 60);
    const seconds = Math.floor((time % 60));

    return (
        <div className="timer">
            <p className="timer-time text-danger fw-bold fs-5 text-end">
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
            </p>
        </div>
    );
}

export default Timer;