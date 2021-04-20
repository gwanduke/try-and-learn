// import { TabForm } from "./pages/TabForm/TabForm";
// import { SubmitButtonForm } from "./pages/SubmitButtonForm/SubmitButtonForm";
// import { ControllerForm } from "./pages/ControllerForm/ControllerForm";
// import { ControllerFormYup } from "./pages/ControllerFormYup/ControllerFormYup";
// import { ConditionalForm } from "./pages/ConditionalForm/ConditionalForm";
import { NestedForm } from "./pages/NestedForm/NestedForm";

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      <NestedForm />
      {/* <ConditionalForm /> */}
      {/* <ControllerFormYup /> */}
      {/* <ControllerForm /> */}
      {/* <TabForm /> */}
      <br />
      {/* <SubmitButtonForm /> */}
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
