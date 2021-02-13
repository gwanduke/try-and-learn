function App() {
  return (
    <div className="Todos">
      <h1>Todos</h1>
      <ul>
        <li>
          <input type="checkbox" name="" id="checkbox-1" />
          <label htmlFor="checkbox-1">할일 1</label>
        </li>
        <li>
          <input type="checkbox" name="" id="checkbox-2" />
          <label htmlFor="checkbox-2">할일 2</label>
        </li>
        <li>
          <input type="checkbox" name="" id="checkbox-3" />
          <label htmlFor="checkbox-3">할일 3</label>
        </li>
      </ul>
    </div>
  );
}

export default App;
