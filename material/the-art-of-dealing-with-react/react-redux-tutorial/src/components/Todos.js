function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <div>
      <input
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        type="checkbox"
        readOnly={true}
      />
      <span
        style={{
          textDecoration: todo.done ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => onRemove(todo.id)}>삭제</button>
    </div>
  );
}

export default function Todos({
  input,
  todos,
  onChangeInput,
  onInsert,
  onToggle,
  onRemove,
}) {
  const onSubmit = (e) => {
    e.preventDefault();
    onInsert(input);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={(e) => onChangeInput(e.target.value)} value={input} />
        <button type="submit">등록</button>
      </form>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}
