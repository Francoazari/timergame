const errorMessage = Object.freeze({ MINUTE: "minute", SECOND: "second", BOTH: "both" });

class TimeService {

    convertAllToSeconds(minutes, seconds){
        return seconds += minutes * 60;
    }

    formatNumber(num) {
        num = parseInt(num);
        num = (isNaN(num)) ? 0 : num ;
        return (num >= 0 && num < 10) ? `0${num}` : num ;
    }

    getMinutes(minutes) {
        return Math.floor(minutes / 60);
    }

    getSeconds(seconds) {
        return Math.floor(seconds % 60);
    }

    convertSecondsToMinutes(minutes, seconds){
        if(seconds > 59){
            minutes += this.getMinutes(seconds);
            seconds = Math.floor(seconds % 60);
        }
        return {minute: minutes, second: seconds}
    }

    validateMinutesAndSeconds(minute, second){

        let error = null;

        if ((minute === "" || second === "") ||
            (minute < 0 && second < 0) || 
            (minute === 0 && second === 0)) {
            error = errorMessage.BOTH;
        } else if (minute < 0) {
            error = errorMessage.MINUTE;
        } else if (second < 0) {
            error = errorMessage.SECOND;
        }

        if(error) return error;
    }

}

export default new TimeService();