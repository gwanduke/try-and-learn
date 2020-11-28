import Binding from "./binding";

class ValueBindingHandler {
  bind(binding: Binding) {
    binding.el.addEventListener("input", () => {
      this.listener(binding);
    });
    this.react(binding);
  }

  react(binding: Binding) {
    const el = binding.el as HTMLInputElement;
    el.value = binding.getValue();
  }

  listener(binding: Binding) {
    const el = binding.el as HTMLInputElement;
    let value = el.value;
    binding.setValue(value);
  }
}

export default ValueBindingHandler;
