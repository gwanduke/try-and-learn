import DiContainer from "./DiContainer";

describe("DiContainer", function () {
  var container;

  beforeEach(function () {
    container = new DiContainer();
  });

  describe("register(name, dependencies, func)", () => {
    it("인자가 하나라도 빠졌거나 타입이 잘못되면 예외를 던진다", () => {
      const badArgs = [
        [],
        ["Name"],
        ["Name", ["Dependency1", "Dependency2"]],
        ["Name", () => {}],
        [1, ["a", "b"], () => {}],
        ["Name", [1, 2], () => {}],
        ["Name", ["a", "b"], "should be a function"],
      ];

      badArgs.forEach((args) => {
        expect(() => container.register.apply(container, args)).toThrowError(
          container.messages.registerRequireArgs
        );
      });
    });
  });

  describe("get(name)", () => {
    it("이름이 등록되어 있지 않으면 undefined를 반환한다", () => {
      expect(container.get("notDefined")).toBeUndefined();
    });

    it("등록된 함수를 실행한 결과를 반환한다", () => {
      const name = "MyName",
        returnFromRegisteredFunction = "something";

      container.register(name, [], () => {
        return returnFromRegisteredFunction;
      });
      expect(container.get(name)).toBe(returnFromRegisteredFunction);
    });

    it("등록된 함수에 의존성을 제공한다", () => {
      let mainFunc;
      const main = "main",
        dep1 = "dep1",
        dep2 = "dep2";

      // main은 dep1, dep2의 의존성이 가지는 함수를 인자로 각각 받는다.
      container.register(main, [dep1, dep2], (dep1Func, dep2Func) => {
        return () => {
          return dep1Func() + dep2Func();
        };
      });

      // dep1에 다음 함수를 등록한다
      container.register(dep1, [], () => {
        return () => 1;
      });

      // dep2에 다음 함수를 등록한다
      container.register(dep2, [], () => {
        return () => 2;
      });

      mainFunc = container.get(main);
      expect(mainFunc()).toBe(3);
    });
  });
});
