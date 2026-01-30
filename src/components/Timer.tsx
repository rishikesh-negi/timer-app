import { useEffect, useState, type FC } from "react";
import Container from "../ui/Container";
import type { Timer as TimerProps } from "../store/timers-context";

const Timer: FC<TimerProps> = function ({ name, duration }) {
  const [remainingTime, setRermainingTime] = useState(duration * 1000);

  useEffect(function () {
    const timerInterval = setInterval(function () {
      setRermainingTime((currTime) => (currTime > 0 ? currTime - 50 : 0));
    }, 50);

    return () => {
      if (remainingTime === 0) clearInterval(timerInterval);
    };
  }, []);

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
