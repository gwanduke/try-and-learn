const { default: Aop } = require("./Aop");

const Target = function () {
  var self = this;
  this.targetFn = function () {
    expect(this).toBe(self);
  };
};

describe("Aop", () => {
  let argPassingAdvice; // 타겟에 인자를 전달할 어드바이스
  let argsToTarget; // targetObj.targetFn에 전달할 인자들
  let targetObj;
  let executionPoints; // 실행 이벤트가 담긴 배열
  const targetFnReturn = 123;

  beforeEach(() => {
    targetObj = {
      targetFn: function () {
        executionPoints.push("targetFn");
        argsToTarget = Array.prototype.slice.call(arguments, 0);

        return targetFnReturn;
      },
    };

    executionPoints = [];

    argPassingAdvice = function (targetInfo) {
      targetInfo.fn.apply(this, targetInfo.args);
    };

    argsToTarget = [];
  });

  describe("Aop.next(context, targetinfo)", () => {
    let advice = function (targetInfo) {
      return Aop.next.call(this, targetInfo);
    };
    let originalFn;
    beforeEach(() => {
      originalFn = targetObj.targetFn;
      Aop.around("targetFn", advice, targetObj);
    });

    it("targetInfo.fn에 있는 함수를 호출한다", () => {
      targetObj.targetFn();
      expect(executionPoints).toEqual(["targetFn"]);
    });
    it("targetinfo.args에 인자를 전달한다", () => {
      targetObj.targetFn("a", "b");
      expect(argsToTarget).toEqual(["a", "b"]);
    });
    it("targetInfo 함수에서 받은 값을 반환한다", () => {
      let ret = targetObj.targetFn();
      expect(ret).toEqual(targetFnReturn);
    });
    it("주어진 콘텍스트에서 타깃 함수를 실행한다", () => {
      let targetInstance = new Target();
      let spyOnInstance = jest.spyOn(targetInstance, "targetFn");
      Aop.around("targetFn", advice, targetInstance);
      targetInstance.targetFn();
      expect(spyOnInstance).toHaveBeenCalled();
    });
  });

  describe("Aop.around(fnName, advice, targetObj)", () => {
    it("타깃 함수를 호출 시 어드바이스를 실행하도록 한다", () => {
      const targetObj = {
        targetFn: () => {},
      };

      let excutedAdvice = false;
      const advice = () => {
        excutedAdvice = true;
      };

      Aop.around("targetFn", advice, targetObj);
      targetObj.targetFn();
      expect(excutedAdvice).toBe(true);
    });

    it("어드바이스가 타깃 호출을 래핑한다", () => {
      const wrappingAdvice = (targetInfo) => {
        executionPoints.push("wrappingAdvice - 처음");
        targetInfo.fn();
        executionPoints.push("wrappingAdvice - 끝");
      };

      Aop.around("targetFn", wrappingAdvice, targetObj);
      targetObj.targetFn();
      expect(executionPoints).toEqual([
        "wrappingAdvice - 처음",
        "targetFn",
        "wrappingAdvice - 끝",
      ]);
    });

    it("마지막 어드바이스가 기존 어드바이스에 대해 실행되는 방식으로 체이닝할 수 있다", () => {
      const adviceFactory = (adviceID) => {
        return (targetInfo) => {
          executionPoints.push("wrappingAdvice - 처음 " + adviceID);
          targetInfo.fn();
          executionPoints.push("wrappingAdvice - 끝 " + adviceID);
        };
      };

      Aop.around("targetFn", adviceFactory("안쪽"), targetObj);
      Aop.around("targetFn", adviceFactory("바깥쪽"), targetObj);
      targetObj.targetFn();

      expect(executionPoints).toEqual([
        "wrappingAdvice - 처음 바깥쪽",
        "wrappingAdvice - 처음 안쪽",
        "targetFn",
        "wrappingAdvice - 끝 안쪽",
        "wrappingAdvice - 끝 바깥쪽",
      ]);
    });

    it("어드바이스에서 타깃으로 일반 인자를 넘길 수 있다", () => {
      Aop.around("targetFn", argPassingAdvice, targetObj);
      targetObj.targetFn("a", "b");
      expect(argsToTarget).toEqual(["a", "b"]);
    });

    // TODO: 왜 안되지...
    // it.only("타깃의 반환값도 어드바이스에서 참조할 수 있다.", () => {
    //   Aop.around("targetFn", argPassingAdvice, targetObj);
    //   const returnedValue = targetObj.targetFn();
    //   expect(returnedValue).toBe(targetFnReturn);
    // });

    it("타깃 함수를 해당 객체의 콘텍스트에서 실행한다", () => {
      const targetInstance = new Target();
      const spyOnInstance = jest.spyOn(targetInstance, "targetFn");
      Aop.around("targetFn", argPassingAdvice, targetInstance);
      targetInstance.targetFn();
      expect(spyOnInstance).toHaveBeenCalled();
    });

    it("어드바이스를 타깃의 콘텍스트에서 실행한다", () => {
      const advice = function () {
        expect(this).toBe(targetObj);
      };
      Aop.around("targetFn", advice, targetObj);
      targetObj.targetFn();
    });
  });
});
