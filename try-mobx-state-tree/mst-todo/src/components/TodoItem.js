const TodoItem = ({ todo }) => {
  return (
    <div>
      <input
        className="toggle"
        type="checkbox"
        checked={todo.completed}
        onChange={() => todo.complete()}
      />
      {todo.text}

      <span onClick={() => todo.remove()}>[x]</span>
    </div>
  );
};

export default TodoItem;
