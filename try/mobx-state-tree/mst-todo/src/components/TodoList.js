import { observer } from "mobx-react";
import TodoItem from "./TodoItem";

const TodoList = observer(({ store }) => {
  const renderToggleAll = () => {
    if (store.todos.length > 0) {
      return (
        <span>
          <input
            className="toggle-all"
            id="toggle-all"
            type="checkbox"
            checked={store.completedCount === store.todos.length}
            onChange={() => store.completeAll()}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </span>
      );
    }
  };

  const { filteredTodos } = store;

  return (
    <section className="main">
      {renderToggleAll()}
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
});

export default TodoList;
