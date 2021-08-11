import { atom, Provider, useAtom } from "jotai";
import React, { PropsWithChildren } from "react";
import { useAtomValue, useUpdateAtom } from "jotai/utils";

const counterAtom = atom(0);

const doubleCountState = atom((get) => {
  return get(counterAtom) * 2;
});

const MyProvider = ({ children }: PropsWithChildren<{}>) => {
  return <Provider>{children}</Provider>;
};

function App() {
  return (
    <MyProvider>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ResetTrigger />
        <DisplayDouble />
        <Counter />
      </React.Suspense>
    </MyProvider>
  );
}

function Counter() {
  const [count, setCount] = useAtom(counterAtom);

  return (
    <div>
      {count}
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        +
      </button>
    </div>
  );
}

function DisplayDouble() {
  const countDoubled = useAtomValue(doubleCountState);

  return (
    <div>
      <pre>{countDoubled} (2배!)</pre>
    </div>
  );
}

function ResetTrigger() {
  const reset = useUpdateAtom(counterAtom);

  return (
    <div>
      <button
        onClick={() => {
          reset(0);
        }}
      >
        리셋
      </button>
    </div>
  );
}

export default App;
