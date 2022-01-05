import { useState, useRef, useEffect, useContext } from "react";
import styles from "./TimerGame.module.scss";
import gear from "../../assets/images/gear.svg";
import ButtonStartStop from "./ButtonStartStop";
import Timer from "./Timer";
import useInterval from "../../hooks/useInterval";
import className from "../../shared/classname";
import TimeService from "../../services/TimeService";
const buttonIncreaser = Object.freeze({ LEFT: "increase-left", RIGHT: "increase-right" });

const model = {
    defaultValues: {
        minute: 4,
        second: 0,
        intervalDelay: 15,
        increaseValues: {
            minutes: 1
        },
        backgroundSeconds: {
            stop: 5,
            warning: 90
        },
        backgroundColor: {
            default: "#55C6EE", 
            warning: "#e9e906",
            stop: "#b92523" 
        }
    }
}

const TimerGame = () => {   

    const [editable, setEditable] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [initialTime, setInitialTime] = useState({minute: model.defaultValues.minute, second: model.defaultValues.second});
    const [timeCurrently, setTimeCurrently] = useState(TimeService.convertAllToSeconds(initialTime.minute, initialTime.second));
    const countRef = useRef(0);
    const increaserBlock = useRef();
    let backgroundColor = model.defaultValues.backgroundColor.default;

    useEffect(() => {
        countRef.current.value = 0;
    }, []);

    useEffect(() => {
        setTimeCurrently(TimeService.convertAllToSeconds(initialTime.minute, initialTime.second));
    }, [initialTime]);

    const resetTimer = () => {
        setIsRunning(false);
        setTimeCurrently(TimeService.convertAllToSeconds(initialTime.minute, initialTime.second));
        countRef.current.value = 0;
        increaserBlock.current = null;
    }

    const increseTimer = (e) => {
        if (e.target.className.includes("lastPress")) return;
        let seconds = model.defaultValues.increaseValues.minutes * 60;
        increaserBlock.current = e.target.id;

        if(isRunning) {
            setTimeCurrently(timeCurrently + seconds);
            countRef.current.value++;
        }
    };
    
    if(timeCurrently <= model.defaultValues.backgroundSeconds.stop){
        backgroundColor = model.defaultValues.backgroundColor.stop;
    } else if (timeCurrently < model.defaultValues.backgroundSeconds.warning){
        backgroundColor = model.defaultValues.backgroundColor.warning;
    }

    useInterval(() => {
        if(!timeCurrently)
            setIsRunning(false);
        else
            setTimeCurrently(timeCurrently - 1);
    }, isRunning ? model.defaultValues.intervalDelay : 0);

    return (
        
        <div 
            className={styles.mainWrapper} 
            style={{
                "--backgroundGradientColor": backgroundColor 
            }}
        >

            <div className={styles.left} >
                {isRunning && 
                    <p 
                        id={buttonIncreaser.LEFT}
                        {...className({[styles.lastPress]:(increaserBlock.current === buttonIncreaser.LEFT)})}
                        onClick={e => {increseTimer(e)}}
                    >
                        {model.defaultValues.increaseValues.minutes + '+'}
                    </p>
                }
            </div>
            <div className={styles.center} >
                <div 
                    className={styles.count}
                >
                    <div>Score:</div>
                    <input 
                        type="number"
                        className={styles.inputCount}
                        ref={countRef}
                        min="0"
                        disabled
                    />
                </div>


                <div className={styles.timerConteiner}>
                    <div className={styles.wrapper}>
                        <div 
                            {...className(
                                styles.ring, 
                                { [styles.warning]: timeCurrently < model.defaultValues.backgroundSeconds.warning },
                                { [styles.stop]: timeCurrently <= model.defaultValues.backgroundSeconds.stop }
                            )}
                        >
                            <svg width="518" height="518" viewBox="0 0 518 518">
                                <circle strokeWidth="9px" x="0" y="y" cx="259" cy="259" r="254" />
                            </svg>
                        </div>

                        <div className={styles.timer}>
                            

                            <Timer 
                                key={timeCurrently}
                                editable={editable}
                                timeCurrently={timeCurrently}
                                initialTime={initialTime}
                                onSetTimeCurrently={setTimeCurrently}
                                onSetInitialTime={setInitialTime}       
                                onSetEditable={setEditable}
                            />

                            <ButtonStartStop 
                                isRunning = {isRunning}
                                setIsRunning = {setIsRunning}
                                currentTime={timeCurrently}
                                initialTime={TimeService.convertAllToSeconds(initialTime.minute, initialTime.second)}
                                handleStop={resetTimer}
                                editable={editable}
                                //saveTime={saveTime}
                            />

                            { !editable && !isRunning && timeCurrently === TimeService.convertAllToSeconds(initialTime.minute, initialTime.second) &&
                                <button className={styles.settings} onClick={() => setEditable(editable => !editable)}> 
                                    <img src={gear} alt="Settings" />
                                </button>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.right} >
                {isRunning && 
                    <p 
                        id={buttonIncreaser.RIGHT}
                        {...className(
                            { 
                                [styles.lastPress]: increaserBlock.current === buttonIncreaser.RIGHT 
                            }
                        )}
                        onClick={e => {increseTimer(e)}}
                    >
                        {model.defaultValues.increaseValues.minutes + '+'}
                    </p>
                }
            </div>

        </div>
    );
};

export default TimerGame;
