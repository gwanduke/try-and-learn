import App from "./app";
import CounterModel from "./models/CounterModel";
import RandomModel from "./models/RandomModel";
import TimerModel from "./models/TimerModel";

const app = new App("body");
const models = [new TimerModel(), new CounterModel(), new RandomModel()];
app.initialize();
app.setModels(models);
