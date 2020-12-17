import React, { useState, Suspense } from "react";
// import notify from "./notify";
const SplitMe = React.lazy(() => import("./notify"));

function App() {
  const [visible, setVisible] = useState(false);

  const onClick = () => {
    setVisible(true);
  };

  return (
    <div className="App">
      <button onClick={onClick}>Hi</button>
      <Suspense fallback={<div>loading...</div>}>
        {visible && <SplitMe />}
      </Suspense>
    </div>
  );
}

export default App;
