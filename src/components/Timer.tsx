import { useEffect, useRef, useState, type FC } from "react";
import Container from "../ui/Container";
import {
  useTimersContext,
  type Timer as TimerProps,
} from "../store/timers-context";

const Timer: FC<TimerProps> = function ({ name, duration }) {
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const { isRunning } = useTimersContext();
  const interval = useRef<number | null>(null);

  useEffect(() => {
    if (interval?.current && remainingTime <= 0)
      clearInterval(interval.current);
  }, [remainingTime]);

  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      interval.current = setInterval(function () {
        setRemainingTime((currTime) => Math.max(currTime - 50, 0));
      }, 50);
    }

    if (interval.current && !isRunning) clearInterval(interval.current);

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [isRunning, remainingTime, duration]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container asElement="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime} />
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
};

export default Timer;
