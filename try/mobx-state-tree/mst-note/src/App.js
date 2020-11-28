import React, { useEffect, useState } from "react";
import NoteCard from "./components/NoteCard";
import Note from "./entities/Note";
import { observer } from "mobx-react";
import { applySnapshot, getSnapshot } from "mobx-state-tree";

const App = observer(() => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    addNote();
  }, []);

  function addNote() {
    const newNote = Note.create({
      description: "",
    });
    setNotes([...notes, newNote]);
  }

  return (
    <div>
      {notes.map((note) => (
        <NoteCard
          description={note.description}
          onChange={(e) => note.setDescription(e.target.value)}
        />
      ))}

      <div>
        <button onClick={addNote}>Add</button>
      </div>
    </div>
  );
});

export default App;
