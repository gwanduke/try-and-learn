import React from "react";
import {
  atom,
  RecoilRoot,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

const counterAtom = atom({
  key: "counterAtom",
  default: 0,
});

const doubleCountState = selector({
  key: "doubleCountState",
  get: ({ get }) => get(counterAtom) * 2,
});

export default function MyApp() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ResetTrigger />
        <DisplayDouble />
        <Counter />
      </React.Suspense>
    </RecoilRoot>
  );
}

function Counter() {
  const [count, setCount] = useRecoilState(counterAtom);

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
  const countDoubled = useRecoilValue(doubleCountState);

  return (
    <div>
      <pre>{countDoubled} (2배!)</pre>
    </div>
  );
}

function ResetTrigger() {
  const reset = useSetRecoilState(counterAtom);

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
