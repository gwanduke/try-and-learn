import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import Footer from "./Footer";

function App({ store }) {
  return (
    <div>
      <TodoInput isNew addTodo={store.addTodo} />
      <TodoList store={store} />
      <Footer store={store} />
    </div>
  );
}

export default App;
