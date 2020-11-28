# Two-Way Data Binding in Pure JavaScript

> [https://www.codeproject.com/Articles/5264704/Two-Way-Data-Binding-in-Pure-JavaScript](https://www.codeproject.com/Articles/5264704/Two-Way-Data-Binding-in-Pure-JavaScript)

## 소개

자바스크립트를 이용해 어떤 엘리먼트에 이벤트를 탈/부착 하는 것은 상대적으로 쉽습니다. 더 힘든 것은 많은 생성으로 어플리케이션이 더 커지고 어지러워질 때 입니다. 결국 모든 것을 제어하기 힘들어 지거나 이벤트 핸들러의 목적을 알아내기 힘들어집니다. 이벤트 핸들러를 위한 계획에는 목적이 있습니다. Though, when trying to update or find an issue within the solution would become just a task to fix the case, 많은 시간을 소비하는 대신에 이들 이벤트 핸들러들이 무엇인지 부터 알아봅시다.

## 코드 계획과 좋은 아키텍쳐에 대한 짧은 이야기

일반적으로 코드 생성은 Ajax 요청이나 이벤트를 탈/부착, 뷰를 보여주고 숨기는 것들 등이 됩니다. 이들은 결정하기 쉽습니다. 왜냐하면 이들은 대부분 같이 오기 때문입니다.Or there could be enough repetition that the tension appears to over-code all repeated similarities into the high-level solution. 때로는 좋은 접근입니다. 때로는 너무 많은 제한을 야기합니다. 하지만 이 모든 파트를 약간의 수정으로 카피/페이스트하는 것은 나쁜 아이디어 같지는 않습니다. 이는 지루한 작업이되고, When it comes time to investigate the code and grep (find) all values, all similar code parts can be easily located over lookup search terms or regex

계획을 가지는 것은 항상 좋습니다. 멍청한 계획일지라도요. 계획이 없는것도 계획입니다. 계획은 코드 작성 중간에 일어납니다. The good solution, the finished one is the solution with the plan/idea that was from the beginning or emerged during implementation.

## 작은 JS 어플리케이션의 큰 구조

이는 못참는 성격의 독자는 넘어가도 좋습니다. 메인 파트는 `Introducing data binding (more rules/more planning)` 이후 입니다. 제목을 쉽게 설명해서 작은 어플리케이션에 대해서 생각해봅시다. 어떻게 구조화되고 구현될까요? participants가 뭘까요? Where is the place that would allow to give more attention to data binding and less focus on the other stuff.

participants가 위치해야합니다. participants는 서로 통신하며 이는 데이터를 교환한다는 뜻입니다. 우리는 이를 어플리케이션이라 부를것입니다. 코드가 많이 작성되어 반복되는 코드가 위치하는 곳을 생각해보자. 나는 유틸리티에 대해서 얘기하고 있다. 그리고 그곳에는 데이터 바인딩을 하는 몇몇 participants가 존재하는데. 아마도 UI를 만들기 위한 템플릿 같은 것들이다.

이 간단한 어플리케이션 구조는 데이터 바인딩 구현에 초점을 맞추고 돕는다.

```js
class App {
  // 어플리케이션을 실행하기위한 가장 요구되어지는 부분
  constructor(selector) {}

  // 바인딩으로부터 요구되어지는 프로퍼티를 만들 것임
  // 그러나 생성자의 일부는 아니다
  initialize() {}

  // initialize를 위한 더 많은 프로퍼티를 만들것이다.
  // can be used several times or just to easily locate when reading code
  initialize$App(el) {}

  // 이는 헬퍼 메소드이다.
  // 프로세스를 이해하기 위한 유용한 정보를 보여줄 것이다.
  logModelState(model) {}

  // databinding에 관련된 것들을 가질 것이다
  bind(formModel) {}

  // 모든 것을 정리한다. initial mehotd에 의해 제공된
  remove() {}
}

setTimeout(() => {
  // 아직 동작하는 코드는 없다.
  // 그러나 어떻게 사용될지에 대한 단서가 있다.
  // body element와 함께하는 실제 어플리케이션이다.
  const app = new App("body");

  // 몇몇 모델들. 예를들어 단지 하나다.
  const model = new TimerModel();

  // 이는 어플리케이션을 초기화하는 부분이다.
  app.initialize();

  // 이는 어플리케이션에 UI로 부터 입력을 읽는 능력을 부여한다.
  app.bind(model);
});
```

어플리케이션의 가장 중요한 부분은 사용자 입력이다. 어플리케이션의 보임. UI는 우리에게 읽고 사용자 입력을 처리하는 것을 허용하다. 작은 UI. 몇몇 필드와 간단한 디버깅을 가진을 만들어보자. UI는 아마도 다음과 같이 생겼을 것이다.

```js
// 메인 폼을 위한 템플릿
// will hold the main UI that is not related to the subject
// but it is important as it would hold the form with fields
const mainTemplate = (data) => `
  <div>
    <div class="form">
    </div>
    <pre class="model-state">
    </pre>
  </div>
`;

// form을 위한 템플릿 (우리의 메인 포커스)은 사용자 입력을 돕는다.
// UI는 데이터 바인딩과 함께 participate할 것이다.
const formTemplate = (date) => `
  <div class="form-item">
    <label>
      Enter your name: <input type="text" class="name" size="40" value="" />
    </label>
  </div>
  <div class="form-item">
    <label>
      Base64 code name: <input type="text" class="output" size="40" value="" />
    </label>
  </div>
  <div class="form-item">
    <span class="current-time">
    </span>
  </div>
`;
```

이는 커뮤니케이션이기 때문에, 적어도 두명의 참가자가 있어야합니다. 첫번째는 폼을 보여준ㄴ 것이고 두번째는 input을 UI로 부터 처리하고 결과를 보여주는 것입니다. 그리고 약간의 디버그 정보.

뷰와 모델:

```js
// 첫번째 참가자
// UI를 읽고 데이터를 모델로 전달

class FormView {
  // 일반적으로 폼 UI에 가장 요구되어진다 이벤트를 만들고 이벤트 핸들러를 등록하는 것이
  constructor(selector) {}

  // UI 빌드 초기에 필요한 프로퍼티들을 만든다
  initialize() {}

  // UI의 부분인 프로퍼티를 만든다.
  initialize$FormView(el) {}

  // UI를 이벤트 프로퍼티로 bind
  bind(model) {}

  // 이벤트로부터 프로퍼티를 제거
  unbind() {}

  // 초기화 메서드로부터 제공된 모든 것들을 클린업
  remove() {}
}

class TimerModel {
  // 이는 만들 것이다 부분을 모델을 실행하는데, 데이터바인딩 로직이 여기 만들어짐
  constructor() {}

  // databinding의 부분인 프로퍼티를 더 만든다.
  initialize() {}

  // 어플리케이션의 비지니스로직을 시뮬레이트 할 것이다
  processForm() {}

  // 이벤트 리스너를 해제한다.
  // 리소스를 제거한다 (타이머 함수 같은)
  remove() {
    utils.getResult(this, () => this.processFormRemove);
    clearInterval(this.timer);
  }
}
```

메인 구조가 끝났다. 여전히 UI에는 아무것도 보잊 않느다. 이제 내부 구현에 대해서 생각할 차례이다. 먼저 UI를 보여주자. UI는 Templates로 부터 온다. HTML을 렌더링하는 툴이 있어야한다. 만약 UI가 있다면 DOM엘리먼트를 위치시키고 attach/detach 이벤트 핸들러를 해야한다. 이는 간딴하고 다재다능하고 아마도 새로운 신선한 아이디어이어야 할 것이다.

```js
// 코드내에서 여러번 반복적으로 사용되는 툴들을 가짐
// 그리고 서로다른 네임스페이스로 추출될 수 있다.
const utils = {
  // template에서 HTML을 UI로 렌더링한다.
  html(el, html) {
    // 한줄의 처리로는 프로덕션에서는 충분하지 않을 것이다. 하지만 우리 예제에서는 충분하다.
    el.innerHTML = html;
  },

  // 폼 객체를 유지하기위해 엘리먼트를 위치시킨다.
  // 메서드는 현대 WEB API에 기반한다.
  // jQuery의 best practice를 참고해
  el(selecot, inst = document) {
    // null 또는 undefined가 전달 될 수 있다고 예상된다
    if (!selector) {
      return null;
    }
    // 셀렉터가 문자열이나 엘리먼트 인스턴스라고 예상된다
    if ('string' === typeof selector) {
      return inst.querySelector(selector);
    }

    return selector;
  },

  // 이벤트 핸들러를 DOM element에/로부터 뗴고 붙인다.
  // 이 메서드는 eventHandler를 제거하는 또다른 함수를 리턴할 것이다.
  // I have a long thought about what would give small code and
  // ended up with this solution
  on(inst, selector, eventName, fn) {
    // 잠재적인 메모리 누수와 사용하기 불편할 것같다
    const handler = function (e) => {
      // 이 컨벤션으로, 이벤트 버블 기능을 사용할 수 있다.
      // 이벤트 핸들러는 부모 엘리먼트에 부착될 수 있다.
      // Attaching event handlers to parent element will allow to
      // re-render internal html of the view many times without re-attaching
      // event handlers to child elements
      if (e.target.matches(selector)) {
        fn(e);
      }
    }

    // 메모리 누수가 생길 수 있다.
    inst.addEventListener(eventName, handler);

    // 불편함을 고쳐보자. 핸들러를 해제하는 함수를 리턴하자. 이제 on 메서드는
    // 더 편리ㅏ게 사용된다. 그러나 확실한 접근으로 이벤트 리스너 엘리먼트에서
    // 이벤트 핸들러를 제거한다.
    return function () {
      inst.removeEventListener(eventName, handler);
    }
  },

  // 메서드를 평가하는 툴이다.
  // 메서드가 객체에 존재하면, 평가된다.
  // 코드 구현에 ifs를 피하기 위해서 사용한다
  getResult(inst, getFn) {
    const fnOrAny = getFn && getFn();
    if (typeof fnOrAny === 'function') {
      return fnOrAny.call(inst);
    }
    return fnOrAny;
  }
}
```

이제 UI를 만들 수 있다. App와 FormView의 생성자를 생각해보자. UI가 없는 클래스는 의미 없다. 이들은 한개의 selector 인자를 받는다 method 시그니쳐로.

이 라인을 생성자에 넣자 `this.el = utils.el(selector);`:

```js
constructor(selector) {
  // 인스턴스에 el 프로퍼티를 만든다
  // 메인 엘리먼트는 더 많은 UI 엘리먼트를 안에 가진다.
  this.el = utils.el(selector);
}
```

작은 룰. 경우에는 DOM element와 작동하는 뷰이다. DOM 엘리먼트를 el 프로퍼티 내에 유지할 것이다. el 변수가 인스턴스에 있으므로, HTML을 렌더링 하는데 사용하자. 그리고 이는 HTML을 렌더링하는 것이기 때문에, 나는 생성자 안에 유지하는게 맞는지 확신이 없다. 그래서 initialize 메서드에 분리해서 그 목적에 맞게 작성해주는 것이 좋다 생각해 그렇게 했다.

App의 업데이트된 initialize 메서드이다:

```js
initialize() {
  utils.html(this.el, mainTemplate({}));
  this.initializeApp(this.el);
  this.form.initialize();
}
```

The updated `initialize` 메서드FormView의 :

```js
initialize() {
  utils.html(this.el, formTemplate({}));
  this.initialize$FormView(this.el);
}
```

추측하건대 당신은 두가의 더많은 메서드 콜을 수행해야합니다. : `initialize$App` and `initialize$FormView` 입니다. 기억하나요, 계획을 언급했던걸? 좋은 나쁘든 이는 중요하지 않습니다. 지금 DOM 엘리먼트를 위한 프로퍼티를 intialize 메서드 안에 만드는게 좋은지 나쁜지는 판단하기 어렵습니다. 나는 명령을 분리하기로 결정했습니다. 이게 나쁜 계획이라면, 이를 분리해 부모의 initialize 메서드로 빼낼겁니다. 만약 좋다면 이대로 유지할겁니다.

initialize$App과 initialize$FormView 메서드의 구현입니다:

```js
initialize$FormView(el) {
    this.name = utils.el('.name', el);
    this.output = utils.el('.output', el);
    this.currentTime = utils.el('.current-time', el);
}
...
initialize$App(el) {
    this.form = new FormView(utils.el('.form', el));
    this.modelState = utils.el('.model-state', el);
}
```

각 메서드들은 인스턴스에 더 많은 프로퍼티를 만드는 책임이 있습니다. 그리고 이러한 프로퍼티들을 업데이트하고 구성하는 유일한 곳이비다. 뷰가 렌더링될 때 마다, 이러한 메서드들은 호출되어집니다. 새로운 폼 엘리먼트와 함께 프로퍼티들을 갱신하면서

어플리케이ㅕㄴ은 시작할 수 있습니다. 그리고 간단한 폼 with 2개의 필드와 텍스트 박스와 함께. 어떤것도 제대로 된게 업ㄱㅅ지만, 가장 흥미로운 부분이 올것입니다 데이터 바인딩이 소개되는

## Introducing DataBinding (More Rules/More plannig)

데이터 바인딩의 첫번째 일은 변경을 감지하는 것입니다. 예제에서, 변경은 view/UI 에서 부터 모델로 그리고 변경이 모델에서 뷰로 전달됩니다. 간단한 부분은 view/UI로부터 받는 값으로 결과를 조절하는 것입니다.

한번 변경으로 끝나지 않는 다는 것을 고려해서. input/text-box가 있습니다. 텍스트는 입력되고 삭제되고, 복붙되고 많이 일어납니다 (사용자가 마지막 입력을 마칠 때 까지). 텍스트 박스는 기본값을 가질 수 있습니다. 이는 미래 코드 업데이트를 할 수 있습니다. (에, introduce fields validation, updates to UI design). 뷰를 위한 모델은 다른 모델로 대체될 수 있습니다. 다른 초기화 필드 값을 가진. 뷰는 모델과 나이스하게 디커플되어야합니다. 포인트는 뷰는 단지 뷰만으로 충분해야합니다. (모델에 붙지 않더라도)

집중은 데이터 (UI로 부터 오는) 대신에 폼에 입력되어지는 에 집중한다. 다음 룰. 데이터는 getter setter를 통해 읽고 써질 수있다. 두 장점와 하나의 drawback이 있다. 쉽게 읽고 쓸수있다 값을 fields로 부터, future 업데이트를 UI로 부터 한다. input을 replace한다 복잡한 드랍다운 미리 정의된 값들로 그리고 검색 제안들로. rule을 명확하게 바인딩하는데 도움을 줄것이다. 그리고 drawback, 더 많은 getter, setter를 작성해야한다.

만약 더 많은 코드에 대해서라면, 다른 룰이 있다. getter setter 페어를 constructor와 initialie 메서드 사이에 유지하자. 이 접근으로, 게터 세터가 어디에 있는지 확실하게 알 수 있다.

The getters and setters for both inputs, "**Enter your name**" and "**Base64 code name**".

Part of the class `FormView`:

```js
getName() {
    return this.name.value;
}
setName(val) {
    if (val !== this.name.value) {
        this.name.value = val;
    }
}
getOutput() {
    return this.output.value;
}
setOutput(val) {
    if (val !== this.output.value) {
        this.output.value = val;
    }
}
setCurrentTime(val) {
    if (val != this.currentTime.innerText) {
        this.currentTime.innerText = val;
    }
}
```

UI에 데이터를 읽고 쓰는 것은 쉽다. 변경된 데이터를 담는 변수를 전달할 필요는 없다. 뷰를 전달하고 getter와 setter를 참조하면 그만이다. 이는 다른 가능성을 여는데, 이제 DOM event 핸들러는 더 간단한 방법으로 작성 가능하다.

그리고 만약 이벤트 핸들러에 대해서 얘기한다면, 거기에는 많다. 다음 룰의 좋은 단서이다. 이제, 네이밍이다. 이벤트 핸들러의 이름을 다음 패턴으로 짓자 `on<EventName><FieldName>` eg. `onInputName` 이벤트 핸들러는 view/UI로 부터 값을 모델로 전달한다

View 에서 Model로의 핸들러. 한가지 룰: 핸들러들을 FormView의 unbind method다음에 놓자.

```js
onInputName() {
  this.model.prop('name', this.getName());
}

onInputOutput() {
  this.model.prop('output', this.getOutput());
}
```

`this.model` - 이것은 내가 예제를 후회할 것이다. 이는 뷰와 모델을 강하게 묶는다. 데이터 바인딩에 대한 것이기 때문에, 간결성을 더하기 위해 forrm과 엮자. 명백히, 실제 어플리케이션에서는 view는 모델과 decoupled되어야한다. 이는 마지막에 최적화하는 좋은 후보이다.

첫번째 데이터 바인딩 명령을 할 차례이다. 이벤트 핸들러를 관련된 엘리먼트에 부착한다. 다시 규칙. 모든 이벤트를 우리가 부착하려는 그리고 bind 메서드 안의 부분에 유지하자.

update `bind` method:

```js
// 모델 인자는 솔루션을 최적화하는데 단서가 될 것이다.
bind(model) {
  // update data from DOM to model
  this.onInputNameRemove = utils.on(this.el, '.name', 'input', () => this.onInputName());
  this.onInputOutputRemove = utils.on(this.el, '.output', 'input', () => this.onInputOutput());
}
```

`this.onInputNameRemove` 그리고 `this.onInputOutputRemove` 는 이벤트 핸들러를 폼으로부터 떼는 것이다. 이들은 unbind 메서드라 불린다.

`unbind` 메서드 업데이트:

```js
unbind() {
  // DOM 엘리먼트로부터 이벤트 핸들러 떼기
  utils.getResult(this, () => this.onInputNameRemove);
  utils.getResult(this, () => this.onInputOutputRemove);
}
```

뷰/UI에서 모델로 데이터를 업데이트 하는 방법은 준비되었다. 이느 ㄴ쉽다. 왜냐면 DOM 엘리먼트가 addEventListenerdhk removeEventListenr 메서드를 가지기 때문이다. 모델은 단지 클래스이다. 모델을 소비하는 데이터 바인딩은 상태변경을 알릴 방법이 필요하다.

간편한 방법은 모델이 `on` 메서드를 가지고 있으면 좋겠다. utils.on 처럼. 그리고 다른 중요한 메서드는 trigger이다. 이 메서드를 통해 모델은 어떤 듣고있는 참여자들에게 변경에 대해 통지한다. 비록 어떤 클래스던지 간에 notify interface를 구현할 수 있다면 좋겠지만. 나중에는 유용할지 모르지만 지금은 작게 유지하고, 데이터 바인딩을 하는데 충분하다.

다음 아래 몇개 메서드를 보자:

```js
// notify about changes
function dispatcher() {
  const handlers = [];

  return {
    add(handler) {
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
          "Oh! Something went wrong with detaching unexisting event handlers"
        );
      };
    },
  };
}

function initEvents() {
  const args = [].slice.call(arguments, 0);
  const events = {};
  for (const key of args) {
    events[key] = dispatcher();
  }

  return {
    on(eventName, handler) {
      return events[eventName].add(handler);
    },
    trigger(eventName) {
      events[eventName].notify();
    },
  };
}
```

이 틀같이, 이벤트를 만들 수 있다. attach/detach 이벤트 리스너들, 변경에 대해 통지하는. 첫번째 후보는 모델이다. 그리고 두번째는 FormView이다.

다음 코드는 Model이 notify about changes 하도록 허락한다.

```js
// 이는 변경에 대해 통지하는 우리의 전체 모델이다.
class TimerModel {
  constructor() {
    // 이벤트를 만들어보자
    const { on, trigger } = initEvents(
      this,
      "change:name", // name 프로퍼티 변경 통지
      "change:output", // output 프로퍼티 변경 통지
      "change:time" // time 프로퍼티 변경 통지
    );

    // 이제 모델은 변경을 발생시키고 구독하도록 허락될 것이다.
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
    this.timer = setInterval(() => this.prop("time", newDate()), 1000);
    this.processFormRemove = this.on("change:name", () => this.processForm());
  }

  // 아마도 모델의 모든 필드에 getter/setter를 쓰는 것은 지루할 것이다.
  // 여기 통합 메서드를 제공한다.
  prop(propName, val) {
    if (arguments.length > 1 && this.state.val !== val) {
      this.state[propName] = val;
      this.trigger("change:" + propName);
    }
    return this.state[propName];
  }

  // 커스텀 비지니스 로직
  processForm() {
    setTimeout(() => {
      this.prop("output", btoa(this.prop("name")));
    });
  }

  // 모델을 정리하는 메서드를 잊지마라
  remove() {
    utils.getResult(this, () => this.processFormRemove);
    clearInterval(this.timer);
  }
}
```

FormView도 동일하게 만ㄷ르어보자

```js
class FormView {
  constructor(selector) {
    const { on, trigger } = initEvents(this, 'change:model');
    this.on = on;
    this.trigger = trigger;
    this.el = utils.el(selector);
  }
}
...
```

이제 `FormView`는 더 많은 데이터 바인딩 커맨드로 조정될 수 있다. 이제 데이터를 모델로 부터 뷰로 전달할 것이다. 멋진것은 어떤 반복적인 일들도 utility 라이브러리도 빠져나가 있다는 것이다. 적어도 한 곳에서 처리하려고 시도했다. Try hard to not spread over the whole component solution. The bind, unbind methods and following event handlers methods would be better to keep as close to each other as possible. That would help for future maintenance, maybe refactoring.

`bind`, `unbind` 의 풀버전 메서드 그리고 `FormView` 클래스의 이벤트 핸들러이다.

```js
// UI에 이벤트 프로퍼티를 바인딩
bind(model) {
  // DOM으로 부터 모델로 데이터 업데이트
  this.onInputNameRemove = utils.on(this.el, '.name', 'input', () => this.onInputName());
  this.onInputOutputRemove = utils.on(this.el, '.output', 'input', () => this.onInputOutput());
  this.syncNameRemove = model.on('change:name', () => this.syncName());
  this.syncOutputRemove = model.on('change:output', () => this.syncOutput());
  this.syncCurrentTimeRemove = model.on('change:time', () => this.syncCurrentTime());
}

// 이벤트들로 부터 프로퍼티를 제거
unbind() {
  utils.getResult(this, () => this.onInputNameRemove);
  utils.getResult(this, () => this.onInputOutputRemove);
  utils.getResult(this, () =. this.syncNameRemove);
  utils.getResult(this, () => this.syncOutputRemove);
  utils.getResult(this, () =. this.syncCurrentTimeRemove);
}

// transfer data from view/UI to model
onInputName() {
  this.model.prop('name', this.getName());
}
onInputOutput() {
  this.model.prop('output', this.getOutput());
}

// 데이터를 model에서 view/UI로 전달
syncName(event) {
  this.setName(this.model.prop('name'));
}
syncOutput(event) {
  this.setOutput(this.model.prop('output'));
}
syncCurrentTime() {
  this.setCurrentTime(this.model.prop('time'));
}
```

이제 한개 스텝이 남았다. 이게 모든게 동작하도록 해줄 것이다. 첫번째로는 더 많은 메서드를 만드는 것이다. 이는 `setModel`이 될 수도 있고 `syncModel`이 될 수도 있다. 첫번째는 모델을 세팅하고 모델 변경 이벤트를 FormView에 발생하는 것이다. 두번째는 이벤트 핸들러다. 그리고 작은 업데이트 (생성자 메서드로의) Such an event handler는 데이터 바인딩의 부분이 아니다. 하지만 FormView 클래스에서 중요한 역할을 할 것이다.

FormView 클래스에서 더 많은 변화:

```js
class FormView {
  constructor(selector) {
    this.syncModelRemove = this.on('change:model', () => this.syncModel());
  }
...
  setModel(val) {
    if (val !== this.model) {
      this.model = val;
      this.trigger('change:model');
    }
  }
...
  syncModel() {
    this.unbind();
    this.setName(this.model.prop('name'));
    this.setOutput(this.model.prop('output'));
    this.model && this.bind(this.model);
  }
...
}
```

그리고 체리 온더 파이 는 `App::bind` 메서드이다. 이 모든걸 실행하는

```js
class App {
  ...
  // there we will keep stuff related to databinding
  bind(formModel) {
    this.form.setModel(formModel);
  }
}
...
```

만약 모든게 완벽하다면, 두개의 인풋이 존재하고, 첫번째 인풋에 타이핑을 하면 두번째 인풋은 base64로 인코딩될 것이다. 첫번째 인풋은 initial value로 시작할 것이다.

이제 결론:

1. 양방향 데이터 바인딩은 순수 자바스크립트에서 가능하다
2. 만약 데이터 바인딩이 getters/setters 기반이라면, 거기에는 많을 것이다 이런게
3. 모든ㄴ 필드는 적어도 두개의 이벤트 리스너를 요구한다. 양방향 데이터 바인딩을 위해서
4. 좋은 Observer design pattern을 위한 구현이 있어야한다
5. 코드는 어지럽혀지기 쉽다. 몇가지 룰을 세팅하는 것이 좋다. 미래의 개발자들을 위해 모든 구현이 망쳐지지 않도록
6. 양방향 데이터 바인딩을 조정하는 것은 남은 작업 같다. 반복되는 부분을 분리된 라이브러리로 추출해내는. 그러나 라이브러리의 효율성이 떨어지는 추출물을 사용하는 것이 구성 요소의 한 곳에 명령을 바인딩하는 것보다 얼마나 어려운가?
7. 좋은 데이터 바인딩은 뷰와 모델을 디커플하는데 좋다

그리고 이제 decoupling에 대해서 얘기해보자. 나의 후회되는 부분이 있다. 모델이 뷰에 커플링되어있다. 이는 데이터 바인딩 커맨드에 집중함으로서 해결된다. For the most patient one that passed all that way till the end. Here is an example of how to decouple the model from the view.

Let's make some code cleaning tasks in the class FormView. Remove that last part with event handler in the constructor, setModel and syncModel methods. Then clean up the constructor. And update setModel and bind method with the code from below:

```js
class FormView {
  constructor(selector) {
    this.el = utils.el(selector);
  }
...
  setModel(model) {
    this.unbind();
    if(!model) {
      return;
    }
    this.setName(model.prop('name'));
    this.setOutput(model.prop('output'));
    model && this.bind(model);
  }
...
  bind(model) {
    // update data from DOM to model
    this.onInputNameRemove = utils.on(this.el, '.name', 'input', () => model.prop('name', this.getName()));
    this.onInputOutputRemove = utils.on(this.el, '.output', 'input', () => model.prop('output', this.getOutput()));
    this.syncNameRemove = model.on('change:name', () => this.setName(model.prop('name')));
    this.syncOutputRemove = model.on('change:output', () => this.setOutput(model.prop('output')));
    this.syncCurrentTimeRemove = model.on('change:time', () => this.setCurrentTime(model.prop('time')));
  }
...
}
```
