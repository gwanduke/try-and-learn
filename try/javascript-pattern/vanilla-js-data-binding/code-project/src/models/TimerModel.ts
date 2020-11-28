import { initEvents, utils } from "../utils";

class TimerModel {
  on;
  trigger;
  state: any;
  timer: any;
  processFormRemove: any;

  constructor() {
    const { on, trigger } = initEvents(
      "change:name",
      "change:output",
      "change:time"
    );
    this.on = on;
    this.trigger = trigger;
    this.state = {
      name: "initial value",
      output: "",
      time: new Date(),
    };
    this.initialize();
  }

  initialize() {
    this.timer = setInterval(() => this.prop("time", new Date()), 1000);
    this.processFormRemove = this.on("change:name", () => this.processForm());
  }

  prop(propName: string, val?: any) {
    if (arguments.length > 1 && this.state.val !== val) {
      this.state[propName] = val;
      this.trigger("change:" + propName);
    }
    return this.state[propName];
  }

  processForm() {
    setTimeout(() => {
      this.prop("output", btoa(this.prop("name")));
    });
  }

  remove() {
    utils.getResult(this, () => this.processFormRemove);
    clearInterval(this.timer);
  }
}

export default TimerModel;
