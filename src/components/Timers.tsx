import type { FC } from "react";
import { useTimersContext } from "../store/timers-context";
import Timer from "./Timer";

const Timers: FC = function () {
  const { timers } = useTimersContext();

  return (
    <ul>
      {timers.map((timer) => (
        <li key={`${timer.name}${timer.duration}${Math.random()}`}>
          <Timer name={timer.name} duration={timer.duration} />
        </li>
      ))}
    </ul>
  );
};

export default Timers;
