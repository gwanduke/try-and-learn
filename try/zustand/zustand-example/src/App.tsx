import create from "zustand";

const useStore = create<{
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
}>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

function BearCounter() {
  const bears = useStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}

function Controls() {
  const increasePopulation = useStore((state) => state.increasePopulation);
  const removeAllBears = useStore((state) => state.removeAllBears);
  return (
    <>
      <button onClick={increasePopulation}>one up</button>
      <button onClick={removeAllBears}>reset</button>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BearCounter />
      <Controls />
    </div>
  );
}

export default App;
