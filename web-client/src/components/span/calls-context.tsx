import { ReactiveMap } from "@solid-primitives/map";
import { createContext, useContext, JSXElement, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { UiSpan } from "~/lib/span/format-spans-for-ui";

export type Durations = {
  start: number;
  end: number;
  shortestTime?: number;
  longestTime?: number;
  average: number;
  counted: number;
};

type CallsContextType = ReturnType<typeof makeCallsContext>;
const CallsContext = createContext<CallsContextType>();

export function CallsContextProvider(props: { children: JSXElement }) {
  const callsContext = makeCallsContext();
  return (
    <CallsContext.Provider value={callsContext}>
      {props.children}
    </CallsContext.Provider>
  );
}

function makeCallsContext() {
  const [granularity, setGranularity] = createSignal(1000);
  const [durations, setDurations] = createStore<Durations>({
    start: Date.now() * 1e6,
    end: Date.now() * 1e6,
    shortestTime: undefined,
    longestTime: undefined,
    average: 0,
    counted: 0,
  });

  return {
    spans: new ReactiveMap<bigint, UiSpan>(),
    granularity: {
      granularity,
      setGranularity,
    },
    durations: {
      durations,
      setDurations,
    },
    spanPointer: 0,
  };
}

export function useCalls() {
  const context = useContext(CallsContext);

  if (!context) throw new Error("Calls context could not be retrieved");

  return context;
}
