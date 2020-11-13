import { useState } from "react";

const TodoInput = ({ isNew, addTodo }) => {
  const [text, setText] = useState("");

  const handleSave = (text) => {
    if (text.length !== 0) {
      addTodo(text);
    }
  };

  const handleSubmit = (e) => {
    const text = e.target.value.trim();
    if (e.which === 13) {
      handleSave(text);
      if (isNew) {
        setText("");
      }
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = (e) => {
    if (!isNew) {
      addTodo(e.target.value);
    }
  };

  return (
    <input
      type="text"
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  );
};

export default TodoInput;
