import React, { useState } from "react";
import TodoList from "./TodoList";

const TodoApp = () => {
  const [todos, setTodos] = useState(() =>
    Array(2000)
      .fill()
      .map((_, index) => ({ name: `Todo ${index}`, id: index, checked: false }))
  );

  const toggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              checked: !todo.checked,
            }
          : todo
      )
    );
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoList todos={todos} toggle={toggle} />
    </div>
  );
};

export default TodoApp;
