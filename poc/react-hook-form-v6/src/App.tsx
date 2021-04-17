import { SubmitButtonForm } from "./pages/SubmitButtonForm/SubmitButtonForm";

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      <SubmitButtonForm />
      <br />
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <div
      style={{
        backgroundColor: "#ccc",
      }}
    >
      여기는 Footer
    </div>
  );
}

export default App;
