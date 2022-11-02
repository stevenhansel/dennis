import { MutableRefObject, useEffect, useState, useRef } from 'react';

const SECONDS_PER_DAY = 86400;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;

const formatRemainingTime = (seconds: number) => {
    let remainingSeconds = seconds;

    const days = Math.floor(remainingSeconds / SECONDS_PER_DAY);
    remainingSeconds %= SECONDS_PER_DAY

    const hours = Math.floor(remainingSeconds / SECONDS_PER_HOUR);
    remainingSeconds %= SECONDS_PER_HOUR;

    const minutes = Math.floor(remainingSeconds / SECONDS_PER_MINUTE);
    remainingSeconds %= SECONDS_PER_MINUTE;

    const result: string[] = [];
    if (days > 0) {
        result.push(days + 'd');
    }

    if (hours > 0) {
        result.push(hours + 'h');
    }

    if (minutes > 0) {
        result.push(minutes + 'm');
    }

    result.push(remainingSeconds + 's');

    return result.join(' ');
};

const convertDateToSeconds = (date: Date): number => {
    return Math.round(date.getTime() / 1000);
}

const useCountdown = (date: Date) => {
    const [remainingTime, setRemainingTime] = useState(convertDateToSeconds(date) - convertDateToSeconds(new Date()));
    const timeRef: MutableRefObject<NodeJS.Timer | null> = useRef(null);

    useEffect(() => {
        timeRef.current = setInterval(() => {
            setRemainingTime((time) => time - 1);
        }, 1000);

        return () => {
            if (timeRef.current !== null) {
                clearInterval(timeRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (remainingTime <= 0 && timeRef.current !== null) {
            clearInterval(timeRef.current);
        }
    }, [remainingTime])

    return formatRemainingTime(remainingTime);
};

export { useCountdown };