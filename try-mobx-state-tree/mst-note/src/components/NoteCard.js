import React from "react";

const styles = {
  root: {
    width: 300,
    height: 300,
    border: "1px solid black",
  },
  description: {
    backgroundColor: "black",
  },
  input: {
    color: "white",
    backgroundColor: "transparent",
    border: 0,
    padding: 5,
    height: "100%",
    width: "100%",
  },
};

export default ({
  description,
  onChange,
  snapshots,
  onSnapshot,
  onLoadSnapshot,
}) => {
  const [snapshots, setSnapshots] = useState([]);
  function addSnapshot(note) {
    setSnapshots([...snapshots, getSnapshot(note)]);
  }

  function loadSnapshot(note, snapshot) {
    applySnapshot(note, snapshot);
  }

  snapshots = { snapshots };
  onSnapshot = {};
  onLoadSnapshot = {};
  return (
    <div style={styles.root}>
      <div style={styles.description}>
        <textarea
          type="text"
          value={description}
          onChange={onChange}
          style={styles.input}
        />
      </div>
      <div>
        <button onClick={() => addSnapshot(note)}>임시 저장</button>
      </div>
      <div>
        {snapshots.map((snapshot) => (
          <button onClick={() => loadSnapshot(note, snapshot)}>
            {snapshot.createdTimestamp}
          </button>
        ))}
      </div>
    </div>
  );
};
