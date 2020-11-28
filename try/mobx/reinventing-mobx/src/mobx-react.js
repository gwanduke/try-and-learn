import { createReaction } from "./mobx";
import { useRef, useState } from "react";

function useForceUpdate() {
  const [_, set] = useState(0);
  return () => set((x) => !x);
}

export function observer(baseComponent) {
  const wrappedComponent = () => {
    const forceUpdate = useForceUpdate();
    const reaction = useRef(null);

    if (!reaction.current) {
      reaction.current = createReaction(forceUpdate);
    }

    let output;
    reaction.current.track(() => {
      output = baseComponent();
    });

    return output;
  };

  return wrappedComponent;
}
