import { useRef, useEffect } from "react";
import className from "../../../shared/classname";
import styles from "../TimerGame.module.scss";

const getMinutes = seconds => Math.floor(seconds / 60);
const getSeconds = seconds => Math.floor(seconds % 60);
const formatNumber = num => {
    num = parseInt(num);
    return (num >= 0 && num < 10) ? `0${num}` : num ;
} 


const Timer = ({editable, timeCurrently, initialTime, onSetInitialTime, onSetEditable}) => {

    const minutesRef = useRef();
    const secondsRef = useRef();
    const saveErrorRef = useRef(false);

    const saveTime = () => {

        const minute = parseInt(formatNumber(minutesRef.current.value));
        const second = parseInt(formatNumber(secondsRef.current.value));

        if(
            (minute === 0 && second === 0) || minute < 0 || second < 0
        ) {
            saveErrorRef.current = true;
            return;
        }

        onSetInitialTime({minute, second});
        onSetEditable(editable => !editable);

    }

    useEffect(() => {
        if (minutesRef.current) minutesRef.current.value = formatNumber(initialTime.minute);
        if (secondsRef.current) secondsRef.current.value = formatNumber(initialTime.second);
    }, [editable, initialTime.minute, initialTime.second])

    return (
        <>
            <div className={styles.timeSpace}>
                <div className={styles.time}>

                    <div className={styles.minutes}>
                        {editable 
                        ?   <input
                                className={styles.inputTimer}
                                ref={minutesRef}
                                name="minute"
                                type="number"
                                maxLength="2"
                                max="99"
                                min="00"
                                disabled={!editable}
                                //onBlur={handleBlurInput}
                            />
                        :   <p>{formatNumber(getMinutes(timeCurrently))}</p>
                        }
                    </div>

                    <div className={styles.colon}>:</div>

                    <div className={styles.seconds}>
                    
                        {editable 
                        ?   <input
                                className={styles.inputTimer}
                                ref={secondsRef}                        
                                name="second"
                                type="number"
                                maxLength="2"
                                max="59"
                                min="00"
                                disabled={!editable}
                                //onBlur={handleBlurInput}
                            />
                        :   <p>{formatNumber(getSeconds(timeCurrently))}</p>
                        }

                    </div>
                </div>
            </div>
            { editable &&
                <button 
                    {...className(
                        styles.save,
                        {[styles.saveError]: saveErrorRef.current.value})
                    }
                    className={styles.save} 
                    onClick={() => saveTime()}

                >
                    SAVE
                </button>
            }
        </>
        
        
        
    );
};

export default Timer;