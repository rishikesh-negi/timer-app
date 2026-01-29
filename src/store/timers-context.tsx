import { createContext, type ReactNode } from "react";

type Timer = {
  name: string;
  duration: string;
};

// Type for the timers' state:
type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

// Type for the timers' state combined with state-manipulating functions. To be used as the type argument of createContext:
type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

const TimersContext = createContext<TimersContextValue | null>(null);

type TimersContextProviderProps = {
  children: ReactNode;
};

export default function TimersContextProvider({
  children,
}: TimersContextProviderProps) {
  const ctx: TimersContextValue = {
    timers: [],
    isRunning: false,
    addTimer(timerData) {},
    startTimers() {},
    stopTimers() {},
  };

  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}
