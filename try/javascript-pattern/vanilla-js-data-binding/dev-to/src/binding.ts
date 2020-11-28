import Binder from "./binder";

class Binding {
  prop: "name" | "surname";
  handler: "value" | "text";
  el: Element;

  constructor(prop: "name" | "surname", handler: any, el: Element) {
    this.prop = prop;
    this.handler = handler;
    this.el = el;
  }

  bind() {
    let bindingHandler = Binder.handlers[this.handler];
    bindingHandler.bind(this);
    Binder.subscribe(this.prop, () => {
      bindingHandler.react(this);
    });
  }

  setValue(value: string) {
    Binder.scope[this.prop] = value;
  }

  getValue() {
    return Binder.scope[this.prop];
  }
}

export default Binding;
