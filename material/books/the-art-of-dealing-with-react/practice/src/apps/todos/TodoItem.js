import React from "react";

const TodoItem = ({ todo, toggle }) => {
  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <span>
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={() => toggle(todo.id)}
        />
      </span>
      <span>{todo.name}</span>
    </div>
  );
};

export default TodoItem;
