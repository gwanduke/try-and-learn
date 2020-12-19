import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggle }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggle={toggle} />
      ))}
    </ul>
  );
};

export default TodoList;
