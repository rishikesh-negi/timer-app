import { type FC } from "react";
import { useTimersContext } from "../store/timers-context";
import Button from "../ui/Button";

const Header: FC = function () {
  const { isRunning, stopTimers, startTimers } = useTimersContext();

  return (
    <header>
      <h1>React Timer</h1>

      <Button onClick={isRunning ? stopTimers : startTimers}>
        {isRunning ? "Stop" : "Start"} Timers
      </Button>
    </header>
  );
};

export default Header;
