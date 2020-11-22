import Binding from "./binding";

class TextBindingHandler {
  bind(binding: Binding) {
    this.react(binding);
  }

  react(binding: Binding) {
    const el = binding.el as HTMLElement;
    el.innerText = binding.getValue();
  }
}

export default TextBindingHandler;
