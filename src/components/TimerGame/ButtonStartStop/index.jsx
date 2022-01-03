import styles from "../TimerGame.module.scss";
const timerStates = Object.freeze({ START: "start", PAUSE: "pause", CONTINUE: "continue", STOP: "stop", RESET: "reset" });

const ButtonStartStop = ({isRunning, setIsRunning, currentTime, initialTime, handleStop, editable}) => {    
    
    const hasStarted = (initialTime !== currentTime) || isRunning;

    return (
        <>
            {!editable && 
                <div>
                    <button 
                        className={styles.start} 
                        onClick={hasStarted ? handleStop : () => setIsRunning(!isRunning)}
                    >
                        {hasStarted ? (currentTime === 0) ? timerStates.RESET : timerStates.STOP : timerStates.START}
                    </button>            
                    { hasStarted && currentTime !== 0 && 
                        <button 
                            className={styles.start} 
                            onClick={() => setIsRunning(!isRunning)}
                        >
                            {isRunning ? timerStates.PAUSE : timerStates.CONTINUE }
                        </button>
                    }
                </div>
            }
                

        </>
        
    );
};

export default ButtonStartStop;