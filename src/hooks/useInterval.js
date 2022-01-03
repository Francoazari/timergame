import { useEffect, useRef } from "react";

/**
 * Sets an interval
 *
 * @param {Function} callback - The interval callback
 * @param {number | null} delay - The interval delay. Setting it to null clears the interval
 */
const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const callback = () => savedCallback.current();

        if (delay) {
            const interval = setInterval(callback, delay);
            return () => clearInterval(interval);
        }
    }, [delay]);
};

export default useInterval;
