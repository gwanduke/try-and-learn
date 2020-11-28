let accessedObservables = [];
const derivationGraph = {};

export function createReaction(onChange) {
  return {
    track: (trackFunction) => {
      // 1. find observables
      accessedObservables = [];
      trackFunction();
      console.log("accessedObservables", accessedObservables);

      // 2. re-run runner very time `1.` changes
      accessedObservables.forEach((key) => {
        derivationGraph[key] = derivationGraph[key] || [];
        derivationGraph[key].push(onChange);
      });
    },
  };
}

export function observable(targetObject) {
  return new Proxy(targetObject, {
    get(obj, key) {
      accessedObservables.push(key);
      return obj[key];
    },
    set(obj, key, value) {
      obj[key] = value;
      derivationGraph[key].forEach((runner) => runner());

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set
      return true;
    },
  });
}

export function autorun(runner) {
  const reaction = createReaction(runner);
  reaction.track(runner);
}
