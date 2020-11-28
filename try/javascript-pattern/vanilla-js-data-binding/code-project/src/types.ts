import CounterModel from "./models/CounterModel";
import RandomModel from "./models/RandomModel";
import TimerModel from "./models/TimerModel";

export type Selector = string | HTMLElement;
export type Model = CounterModel | RandomModel | TimerModel;
