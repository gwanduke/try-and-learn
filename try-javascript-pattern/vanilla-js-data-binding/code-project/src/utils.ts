import App from "./app";
import FormView from "./form-view";
import { Model, Selector } from "./types";

export function dispatcher() {
  const handlers: any[] = [];

  return {
    add(handler: any) {
      if (!handler) {
        throw new Error("Can't attach to empty handler");
      }
      handlers.push(handler);

      return function () {
        const index = handlers.indexOf(handler);
        if (~index) {
          return handlers.splice(index, 1);
        }
        throw new Error(
          "Ohm! Something went wrong with detaching unexisting event handler"
        );
      };
    },

    notify() {
      const args = [].slice.call(arguments, 0);
      for (const handler of handlers) {
        handler.apply(null, args);
      }
    },
  };
}

export function initEvents(...args: string[]) {
  const events: {
    [key: string]: any;
  } = {};
  for (const key of args) {
    events[key] = dispatcher();
  }
  return {
    on(eventName: string, handler: any) {
      return events[eventName].add(handler);
    },
    trigger(eventName: string) {
      events[eventName].notify();
    },
  };
}

export const utils = {
  html(el: HTMLElement, html: string) {
    el.innerHTML = html;
  },
  el(selector: Selector, inst = document): HTMLElement {
    if (!selector) {
      return null;
    }
    if ("string" === typeof selector) {
      return inst.querySelector(selector);
    }
    return selector;
  },
  on(inst: HTMLElement, selector: string, eventName: string, fn: Function) {
    const handler = function (
      evnt: EventListenerOrEventListenerObject & { target: HTMLElement }
    ) {
      if (evnt.target.matches(selector)) {
        fn(evnt);
      }
    };
    inst.addEventListener(<any>eventName, handler);
    return function () {
      inst.removeEventListener(<any>eventName, handler);
    };
  },
  getResult(inst: FormView | Model | App, getFn: Function) {
    const fnOrAny = getFn && getFn();
    if (typeof fnOrAny === "function") {
      return fnOrAny.call(inst);
    }
    return fnOrAny;
  },
};
