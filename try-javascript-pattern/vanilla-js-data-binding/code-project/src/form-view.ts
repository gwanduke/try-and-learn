import { formTemplate } from "./templates";
import { Model } from "./types";
import { utils } from "./utils";

class FormView {
  targetElement: HTMLElement;
  name: HTMLElement & { value?: any };
  output: any;
  currentTime: any;
  onInputNameRemove: any;
  onInputOutputRemove: any;
  syncNameRemove: any;
  syncOutputRemove: any;
  syncCurrentTimeRemove: any;

  constructor(element: HTMLElement) {
    this.targetElement = element;
  }

  getName() {
    return this.name.value;
  }

  setName(val: string) {
    if (val !== this.name.value) {
      this.name.value = val;
      this.name.dispatchEvent(new Event("input"));
    }
  }

  getOutput() {
    return this.output.value;
  }

  setOutput(val: string) {
    if (val !== this.output.value) {
      this.output.value = val;
      this.output.dispatchEvent(new Event("input"));
    }
  }

  setCurrentTime(val: string) {
    if (val != this.currentTime.innerText) {
      this.currentTime.innerText = val;
    }
  }

  setModel(model: Model) {
    this.unbind();
    if (!model) {
      return;
    }
    this.setName(model.prop("name"));
    this.setOutput(model.prop("output"));
    model && this.bind(model);
  }

  initialize() {
    utils.html(this.targetElement, formTemplate());
    this.initialize$FormView(this.targetElement);
  }

  initialize$FormView(el: any) {
    this.name = utils.el(".name", el);
    this.output = utils.el(".output", el);
    this.currentTime = utils.el(".current-time", el);
  }

  bind(model: Model) {
    // update data from DOM to model
    this.onInputNameRemove = utils.on(
      this.targetElement,
      ".name",
      "input",
      () => model.prop("name", this.getName())
    );
    this.onInputOutputRemove = utils.on(
      this.targetElement,
      ".output",
      "input",
      () => model.prop("output", this.getOutput())
    );
    // update data from model to DOM
    this.syncNameRemove = model.on("change:name", () =>
      this.setName(model.prop("name"))
    );
    this.syncOutputRemove = model.on("change:output", () =>
      this.setOutput(model.prop("output"))
    );
    this.syncCurrentTimeRemove = model.on("change:time", () =>
      this.setCurrentTime(model.prop("time"))
    );
  }

  unbind() {
    utils.getResult(this, () => this.onInputNameRemove);
    utils.getResult(this, () => this.onInputOutputRemove);
    utils.getResult(this, () => this.syncNameRemove);
    utils.getResult(this, () => this.syncOutputRemove);
    utils.getResult(this, () => this.syncCurrentTimeRemove);
  }
}

export default FormView;
