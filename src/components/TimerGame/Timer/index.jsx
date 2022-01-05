import { useRef, useState, useEffect } from "react";
import className from "../../../shared/classname";
import styles from "../TimerGame.module.scss";
import TimeService from "../../../services/TimeService";

const error = Object.freeze({ MINUTE: "minute", SECOND: "second", BOTH: "both" });



const Timer = ({editable, timeCurrently, initialTime, onSetInitialTime, onSetEditable}) => {

    const minutesRef = useRef();
    const secondsRef = useRef();
    const [hasError, setHasError] = useState();

    const saveTime = () => {

        const minute = parseInt(TimeService.formatNumber(minutesRef.current.value));
        const second = parseInt(TimeService.formatNumber(secondsRef.current.value));

        let validateErrors = TimeService.validateMinutesAndSeconds(minute, second);

        if(!validateErrors){
            onSetInitialTime(TimeService.convertSecondsToMinutes(minute, second));
            onSetEditable(editable => !editable);
        }else{
            setHasError(validateErrors);
        }
    }

    const validateInput = e => {
        if (e.which < 48 || e.which > 57 || e.target.value.length > 1) e.preventDefault();
    }

    useEffect(() => {
        if (minutesRef.current) minutesRef.current.value = TimeService.formatNumber(initialTime.minute);
        if (secondsRef.current) secondsRef.current.value = TimeService.formatNumber(initialTime.second);
    }, [editable, initialTime.minute, initialTime.second])

    return (
        <>
            <div className={styles.timeSpace}>
                <div className={styles.time}>

                    <div className={styles.minutes}>
                        {editable 
                        ?   <input
                                {...className(
                                    styles.inputTimer,
                                    {[styles.hasError]: hasError === error.BOTH || hasError === error.MINUTE})
                                }
                                ref={minutesRef}
                                name="minute"
                                type="number"
                                max="99"
                                min="00"
                                disabled={!editable}
                                onKeyPress={validateInput}
                            />
                        :   <p>{TimeService.formatNumber(TimeService.getMinutes(timeCurrently))}</p>
                        }
                    </div>

                    <div className={styles.colon}>:</div>

                    <div className={styles.seconds}>
                    
                        {editable 
                        ?   <input
                                {...className(
                                    styles.inputTimer,
                                    {[styles.hasError]: hasError === error.BOTH || hasError === error.SECOND })
                                }
                                ref={secondsRef}                        
                                name="second"
                                type="number"
                                max="59"
                                min="00"
                                disabled={!editable}
                                onKeyPress={validateInput}
                            />
                        :   <p>{TimeService.formatNumber(TimeService.getSeconds(timeCurrently))}</p>
                        }

                    </div>
                </div>
            </div>
            { editable &&
                <button 
                    {...className(
                        styles.save,
                        {[styles.hasError]: hasError})
                    }
                    onClick={() => saveTime()}

                >
                    SAVE
                </button>
            }
        </>
        
        
        
    );
};

export default Timer;