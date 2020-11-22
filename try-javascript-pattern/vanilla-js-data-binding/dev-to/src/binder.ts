import TextBindingHandler from "./text-binding-handler";
import ValueBindingHandler from "./value-binding-handler";

export type Scope = { name: string; surname: string };

class Binder {
  static scope: Scope;
  static subscriptions: any[] = [];
  static handlers = {
    value: new ValueBindingHandler(),
    text: new TextBindingHandler(),
  };

  static setScope(scope: Scope) {
    this.scope = scope;
  }

  static redefine() {
    let keys = Object.keys(this.scope);
    keys.forEach((key: "name" | "surname") => {
      let value = this.scope[key];
      delete this.scope[key];
      Object.defineProperty(this.scope, key, {
        get() {
          return value;
        },
        set(newValue) {
          const shouldNotify = value != newValue;
          value = newValue;
          if (shouldNotify) {
            Binder.notify(key);
          }
        },
      });
    });
  }

  static subscribe(key: string, callback: Function) {
    this.subscriptions.push({
      key: key,
      cb: callback,
    });
  }

  static notify(key: string) {
    const subscriptions = this.subscriptions.filter(
      (subscription) => subscription.key == key
    );
    subscriptions.forEach((subscription) => {
      subscription.cb();
    });
  }
}

export default Binder;
