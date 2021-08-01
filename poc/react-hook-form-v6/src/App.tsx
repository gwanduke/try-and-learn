import { TabForm } from "./pages/TabForm/TabForm";
import { SubmitButtonForm } from "./pages/SubmitButtonForm/SubmitButtonForm";
import { ControllerForm } from "./pages/ControllerForm/ControllerForm";
import { ControllerFormYup } from "./pages/ControllerFormYup/ControllerFormYup";
import { ConditionalForm } from "./pages/ConditionalForm/ConditionalForm";
import { NestedForm } from "./pages/NestedForm/NestedForm";
import { IsolationForm } from "./pages/IsolationForm/IsolationForm";
import { UncontrolledFormat } from "./pages/UncontrolledFormat/UncontrolledFormat";

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      {/* <IsolationForm /> */}
      {/* <NestedForm /> */}
      {/* <ConditionalForm /> */}
      {/* <ControllerFormYup /> */}
      {/* <ControllerForm /> */}
      {/* <SubmitButtonForm /> */}
      {/* <TabForm /> */}
      <UncontrolledFormat />
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
