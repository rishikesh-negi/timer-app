import { createContext, useContext, useReducer, type ReactNode } from "react";

export type Timer = {
  name: string;
  duration: number;
};

// Type for the timers' state:
type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

// Type for the timers context value. Used as the first type argument of createContext:
type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

type TimersContextProviderProps = {
  children: ReactNode;
};

// Initial state for the timers reducer:
const initialState: TimersState = {
  isRunning: false,
  timers: [],
};

/*
// Type for the reducer actions for the timers reducer:
type TimersAction = {
  type: "ADD_TIMER" | "START_TIMERS" | "STOP_TIMERS";
  payload?: unknown;
};
// This type for the reducer actions allows for accessing the "payload" property even for actions that don't need it. The "payload" property can also be "null" since it needs to be an optional property. So, to use the payload, we would have to do some tedious type narrowing or use an "as" or non-null assertion, none of which are ideal. Additionally, the "unknown" type is not suitable for the payload property. We must define the precise type in most cases. However, if we do define the precise type, we might have to change or update it many times as and when more actions get added to the reducer function. Therefore, this type is not ideal.
*/

// A better way to type the reducer actions using discriminated unions:
type StartTimersAction = { type: "START_TIMERS" };
type StopTimersAction = { type: "STOP_TIMERS" };
type AddTimerAction = { type: "ADD_TIMER"; payload: Timer };

type TimersAction = StartTimersAction | StopTimersAction | AddTimerAction;

const TimersContext = createContext<TimersContextValue | null>(null);

function timersReducer(state: TimersState, action: TimersAction): TimersState {
  switch (action.type) {
    case "ADD_TIMER":
      return {
        ...state,
        timers: [
          ...state.timers,
          { name: action.payload.name, duration: action.payload.duration },
        ],
      };
    case "START_TIMERS":
      return { ...state, isRunning: true };
    case "STOP_TIMERS":
      return { ...state, isRunning: false };
    default:
      throw new Error(`Unknown action received: ${action as never}`);
  }
}

export default function TimersContextProvider({
  children,
}: TimersContextProviderProps) {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData) {
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    startTimers() {
      dispatch({ type: "START_TIMERS" });
    },
    stopTimers() {
      dispatch({ type: "STOP_TIMERS" });
    },
  };

  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}

export function useTimersContext() {
  const timersCtx = useContext(TimersContext);

  if (timersCtx === null)
    throw new Error("Context was used outside its provider!");

  return timersCtx;
}
