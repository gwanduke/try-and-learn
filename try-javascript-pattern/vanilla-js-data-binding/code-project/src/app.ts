import FormView from "./form-view";
import { mainTemplate } from "./templates";
import { Model, Selector } from "./types";
import { utils } from "./utils";

class App {
  el: HTMLElement;
  form: FormView;
  models: Model[];

  modelState: any;
  removeHandlers: any[];

  constructor(selector: Selector) {
    this.el = utils.el(selector);
  }

  initialize() {
    utils.html(this.el, mainTemplate());
    this.initialize$App(this.el);
    this.form.initialize();
    utils.on(this.el, ".models input", "click", (evnt: any) =>
      this.switchModel(evnt)
    );
  }

  initialize$App(el: HTMLElement) {
    this.form = new FormView(utils.el(".form", <any>el));
    this.modelState = utils.el(".model-state", <any>el);
  }

  logModelState(model: Model) {
    utils.html(this.modelState, JSON.stringify(model));
  }

  bind(formModel: Model) {
    this.form.setModel(formModel);
    this.removeHandlers = [
      formModel.on("change:name", () => this.logModelState(formModel)),
      formModel.on("change:output", () => this.logModelState(formModel)),
      formModel.on("change:time", () => this.logModelState(formModel)),
    ];
  }

  switchModel(evnt: any) {
    const index = +evnt.target.value;
    this.bind(this.models[index]);
  }

  setModels(models: Model[]) {
    this.models = models;
    this.bind(models[0]);
  }

  remove() {
    this.form.setModel(null);
    this.removeHandlers.forEach((removeHandler) =>
      utils.getResult(this, () => removeHandler)
    );
    this.form.remove();
  }
}

export default App;
