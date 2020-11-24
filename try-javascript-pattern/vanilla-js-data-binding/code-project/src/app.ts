import FormView from "./form-view";
import { mainTemplate } from "./templates";
import { Model, Selector } from "./types";
import { utils } from "./utils";

class App {
  form: FormView;
  models: Model[];

  $targetElement: HTMLElement;
  $modelState: HTMLElement;
  removeHandlers: any[];

  constructor(selector: Selector) {
    this.$targetElement = utils.el(selector);
  }

  initialize() {
    utils.html(this.$targetElement, mainTemplate());

    this.form = new FormView(utils.el(".form", <any>this.$targetElement));
    this.$modelState = utils.el(".model-state", <any>this.$targetElement);

    utils.on(this.$targetElement, ".models input", "click", (evnt: any) =>
      this.switchModel(evnt)
    );
  }

  changeModel(model: Model) {
    this.form.setModel(model);
    this.removeHandlers = [
      model.on("change:name", () => this.logModelState(model)),
      model.on("change:output", () => this.logModelState(model)),
      model.on("change:time", () => this.logModelState(model)),
    ];
  }

  logModelState(model: Model) {
    utils.html(this.$modelState, JSON.stringify(model));
  }

  // 등록된 모델을 변경함
  switchModel(evnt: any) {
    const index = +evnt.target.value;
    this.changeModel(this.models[index]);
  }

  // 모델 inject
  setModels(models: Model[]) {
    this.models = models;
    this.changeModel(models[0]);
  }
}

export default App;
