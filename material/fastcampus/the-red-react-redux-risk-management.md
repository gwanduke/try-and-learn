# The RED: React와 Redux로 구현하는 아키텍처와 리스크관리

> 강의자: 김민태님

## 2. 프론트엔드 개발자의 역할과 필수 소프트 스킬

웹은 개방형 기술인가? → 뒷 세력이 있긴 한 것같다.

이제 HTML,JS,CSS 등의 버전명을 매기지 않는데, 구글/페이스북/애플 등의 회사들이 직/간접적으로 영향력을 미치고 있다.

프론트엔드

- 시각요소를 포함하고 있어, 사람의 주관이 포함된다
- 프론트가 거의 마지막 단계
  - 계획이 맞아 들어가지 않는 경우가 많다
  - 하지만 듀 데이트는 거의 변하지 않음

Deno 기술도 한번 주목해볼 필요있음

### 무엇을 학습할 것인가?

개발자 유형

- 그래픽 시스템에 대한 지식이 없는 개발자, 그래픽을 다룰 수 있는 개발자
- UX 지식을 학습하며 적용하는 개발자, UX에 관심이 없는 개발자
- 사람에 관심이 있는 개발자, 관심이 없는 개발자

학습 전략

- 기본소양, 프론트엔드 개발자라면 알아야하는 것
  - 네트워크 지식 (백엔드 개발자 이상으로)
    - TCP/IP 기반 웹에서 개발하기 때문에 꼭!
    - 꾸준히!
    - 크롬 개발자 도구에 등장하는 모든 용어는 다 알아야함
  - 메모리와 관련된 부분
    - 메모리를 캡쳐링하고 스냅샷뜰 수 있는 크롬 기능이 있다.
  - 퍼포먼스와 관련된 부분
    - 여러분야에 걸친 지식을 요구 (메모리와 네트워크 뿐만 아니라)
- 필요한 상황이 생기면 알고 싶지만 쉽게 배울 수 없는 지식
  1. 그래픽스 (접할 기회가 잘 없지만, 알아두는게 좋겠음)
     - 3D이든 2D이든
     - 꾸준히 학습해보는게 좋겠다
  2. 수학
     - 실무에서는 크게 필요하진 않지만
     - 하다보면 수학을 알면 더 쉽게 할 수 있겠다는 생각이 들 때가 있음
       (대수학, 기하학 등의 컴퓨터와 관련된 지식들은 계속 알아갈 필요가 있음)
- 필요할 때 학습해도 충분한 기술
  - 라이브러리, 프레임워크, 언어 등...

### 김민태는?

- 웹어셈블리를 학습 중이고, 마인드맵으로 정리를 해놓고 시작한다.
- 마인드맵을 해놓으면 기술 흐름을 파악할 수 있어서 좋다. (아니면 다른 방법으로 정리를 해두고 흐름을 따라 가는 것이 중요)

### 성장의 원동력

- 훌륭한 동료 그리고 도움을 주려는 나
- 넓은 세상으로의 공유와 피드백 (좋은 피드백이든 나쁜 피드백이든)
- 가르치기
- 기술과 일에만 너무 몰두하지 마시고 개인적인 시간에도 많이 투자해야할 필요있음
  (일로서 에너지를 내는데는 한계가 있다)

## 2. 안정적인 프로덕트를 위한 아키텍쳐 설계와 리스크 관리

- 서비스가 일정 규모이상 성장을 했을 때 문제가 발생
- 스케일에 어떻게 대응할 것인가?
- 현재 상태는 어떤 상태인가?
- 스타트업 vs 일반기업
  - 동일한점
    - 제한된 리소스, 부족한 시간 (팀 자체는 항상 제한된 리소스)
  - 다른점
    - 시니어가 없는 경우 있음 (피드백 받기 힘듬, 잘 만들어졌는지 파악하기 힘듬)
    - 실패 비용 → 개발자가 받는 충격
    - 스타트업은 회사와 프로젝트가 1:1 관계인 경우가 많음
- 제한된 리소스
  - 동료가 부족함
    - 역량의 한계가 올 수 있는데, 그 한계를 객관적으로 드러내는 것이 중요 그리고 나서 조직내에 공개적으로 논하는 것이 좋다.
    - 리스크 줄이기
      1. 필요없는 기능 초대한 배제 (MVP 집중)
      2. 클린 코드에 집중 X, 동작하는 코드가 가장 가치 있는 시기
  - 시간적 부족함
- MVP?
  - 서비스 관점
    1. 개발자가 판단한 MVP가 정답인지 의심하라
    2. 직관이 통하는 세계가 존재함을 인정하라. 직관은 과학이 아님을 인정하라.
       (기획자(도메인 전문가)에 의견을 존중하라)
    3. 개발자의 역할은 직관의 실패 리스크를 최소화하며 피봇할 수 있게 지원하는 것이다.
       (MVP가 문제가 생겼을 때 대처할 수 있는 방법을 고려해두는게 중요)
  - 기술 관점
    1. 어떤 기술이 적정기술인가?
    2. 최대한 포기하라, 포기할것과 포기하지 못하는 것을 분류하고 검토하라
    3. 기술보다 중요한건 속도. 언제나 서비스의 `생존`이 최우선

#### 웹개발을 설계하는 방식

- 브라우저 개발을 위해서 고민해야하는 부ㅜㄴ들?
- 앱이 있는 서비스는 PC는 보조적인 수단으로 바뀜

브라우저 웹 앱

- 컨텐츠형 SNS형, 싷시간 형, 커머스형, 교육... 등...
- 유형과 무관한 공통 고려사항

  → 웹에 대한 근본적인 철학과 특정 고려하라!
  (어떤 환경에서든 잘 실행 → 크로스 브라우징 고려)

  → 기술이 서비스 성공의 촉매 역할을 할 수 있다. (접근성, SEO, 위트 등...)

  → 서비스 디스크립션이나 메타데이터등을 기획에 설명해서 받을 필요가 있다.

  → 모든것이 공유될 수 있는 자원이라는 것을 고려 (SEO, OG최적화, 소스코드...)

  → 외부 서비스 연동 정보를 관리하라 (API Key, 인증서 등...)

  → 디자인과 디테일한 요소 고려

  - 신규 서비스의 어설픈 UX는 좋은 이미지를 만들 수 없고 가치 하락 (바로 이탈)
  - 발빠른 테스트와 릴리즈를 위한 아키텍쳐를 처음부터 고려
    (A/B테스트, 부분 업데이트등 가능한 격리된 컴포넌트 구조 설계)
  - UX의 견고함과 기능이 경함을 벌이면 `UX의견고함`을 선택
  - 가능하면 최신기술 활용
    - 최신 기술의 사용이 매력 포인트가 될 수 있음
  - 낮은 버전의 브라우저 환경을 과감히 버려라
  - 사용자 로그를 수집하라, 그리고 분석하라
    - 로그는 필수 요소, 분석 인프라가 없더라도 초기부터 로그 수집하라
    - 로그 분석 인프라를 마련하고 지속적으로 발전시켜라

모바일 웹 앱

- 요즘은 대부분 앱 서비스
- 순수한 네이티브 앱이란 존재하는가?
  - → 모든 화면을 네이티브 앱으로 개발하진 않음
  - → 웹뷰를 이용한 개발을 주로함
- 어떤 부분을 고려해야하는가?
  - 네이티브앱을 컨테이너로 사용 + 단일 웹뷰 (앱스토어 규약 위반 가능성있음)
    → 푸시, 카메라, 네이티브 인증 등을 네이티브로 구현한다면 가능할 수도
  - 네이티브 앱 패키징 아키텍쳐
    - 네이티브 + 멀티 웹뷰: 웹뷰간 데이터 교환 방법을 초기부터 고안해야함. 앱에 저장소를 만들고 웹뷰에게 인터페이스 제공해야함
  - 네이티브 + RN : 변화가 많은 지면은 RN으로 개발, 그 외 지면은 네이티브 개발
    (역량이쓴ㄴ 네이티브 개발자가 필요할 수도있음. 왜냐면 크래시 등의 대응이 난이도가 있을 수 있음)
- 앱 피키징 아키텍쳐와 무관한 고려사항

  1. 네비게이션 룰을 확립 (특정 화면 직접 랜딩을 위한 앱스킴 디자인)
     딥링크(같은 화면이라도 네이티브 일수도, 웹뷰일수도 있는데, 모든 화면의 딥링크를 잘 만들어두는게 중요) → 이후 확장성을 고려해 초기의 룰을 잘 디자인 해놓아야한다. (앱 업데이트를 강제할 수없다)
     유니버셜링크를 딥링크 스킴으로 가져가는 것도 괜찮다. (웹과 앱의 URL이 동일)
     (앱이 설치가 되어있으면 앱으로, 아니면 웹으로 실행되는 방법) ⇒ 모바일.데스크탑웹으로 확장할 계획이 있다면
  2. 공개용 웹뷰와 내부용 웹뷰를 분리하라

     - 이벤트 지면 → 공개/공유용 URL 노출
     - 웹뷰 → URL에 신경을 쓰지 않기 때문에 보안이슈가 생길 수도 있음

     ⇒ 외부/내부용 웹 서비스 서버를 운영하는 것이 좋겠다.
     (API연동 토큰 및 앱 메타 정보 등 서버가 필요로 하는 정보를 어떻게 관리할지 고려)

  3. 개발환경에 대한 구축
     - 웹뷰와 데스크탑 브라우저는 다름
     - 같은 기기 내 웹뷰, 브라우저 등도 차이가 존재
     - 시뮬레이터와 실기기에서 작동하는 것도 차이가 존재함
     - 각각에 대해 개발자가 경험할 수 있ㄴ ㄴ환경을 미리 준비하고 개발자간 쉽게 방법을 공유할 수 있도록 문서화하고 변경사항을 업데이트해야함
  4. 런타임에 발생하는 오류 수집 (사용자 로그 수집은 당연)
     (Sentry 등 운영, 우리는 디바이스를 수급하지 못하는 경우도 많음)

- 마이너
  1. 캐싱을 적극적으로 활용해라 (모바일은 네트워크가 불안정하므로 (엘베등))
     (자연스러운 UX : 이번 버전을 보여주고, 오류에 대한 내용을 보여주는 등의 방법 적용)
  2. 웹뷰의 라이프사이클을 인지할 수 있는 인터페이스를 마련하라
  - 네이티브앱이 웹뷰를 노출시킬때, 다른 화면에 의해서 안보이는 경우도 있다.
  - 탭간에 네이티브, 웹뷰가 전환되는 경우가 잇는데 내부적으로 시간이 흘렀을 수도 있다. 그럼 다시 리프레쉬 하는 등의 처리가 필요하다. 네이티브앱은 그런 foreground 상태를 체크해 웹뷰쪽으로 전달할 수 있기 때문에 이런 인터페이스를 마련해두는게 좋다. 미리 마련해두면 버전 업데이트가 되지 않아도 웹에서 처리할 수 있기 때문에 좋다
  3. 접근성을 언제나 고려하라 → 접근성 스펙 고려 항상

### 2-4신규 개발 관점에서의 리스크 관리

1. 개발은 혼자하는게 아니므로 "커뮤니케이션"

   - 대표적인 소프트 스킬
   - ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1f1b7a72-5aff-46d9-b734-889d839de952/Screen_Shot_2020-11-26_at_14.56.39.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1f1b7a72-5aff-46d9-b734-889d839de952/Screen_Shot_2020-11-26_at_14.56.39.png)

## 3. React와 Redux로 구현하는 아키텍쳐와 리스크 관리

### 3-1. 프론트엔드와 프레임워크

- 최신 기술이 좋은 것만은 아님 현재 구성원들이 잘 할 수 있는 기술을 선택하는 것도 중요함

### 3-2. React로 구현하는 아키텍쳐와 리스크 관리법

- 리액트를 어떻게 하면 가장 잘 이해하고 학습할 수 있을 것인가?

  - → 같은 컨셉으로 만들어보자
  - → 분석하는 것은 이미 라이브러리의 불륨이 크기 때문에 분석하기엔 좀 방대한 면이 있다.

- 리액트가 JSX라는 문법을 가지고 있지만, 이는 바벨이 처리. 우리도 마찬가지도 JSX 플러그인을 사용할 것임

```jsx
@babel/cli
@bacel/core
@babel/preset-react

build: babel src -d build -w
```

- 리액트는 기본적으로 virtual-dom을 가지고 있는데, 어떻게 만들 수 있을까?
- virtual-dom은 기본적으로 HTML 태그를 변환시키는 구조가 될텐데... 어떻게 변환할 수 있을까?

```jsx
// index.js
<div id="root">
  <span>lablal</span>
</div>

{
  tagName: 'div',
  props: {
    id: 'root',
    classname: 'container',
  },
  children: [
    {
      tagName: 'span',
      props: {},
      children: ['blablal']
    }
  ]
}

```

```jsx
// react.js

const hooks = [];
let currentComponent = -1;

// 자바스크립트에서는 이 함수가 클래스인지 함수인지 확인할 길은 없다.
// 그래서 Component를 상속하도록 해 프로토타입 체인에 의해 이 클래스의 인스턴스인지
// 확인해 처리를 하는게 좋겠다.
export class Component {
}

export function useState(initValue) {
  // let value = initValue;
  const position = currentComponent;

  if (hooks[position]) {
    hooks[position] = initValue;
  }

  return [
    hooks[position],
    (nextValue) => {
      hooks[position] = nextValue;
    }
  ];
}

function renderRealDOM(vdom) {
  if (typeof vdom === 'string') {
    return document.createTextNode(vdom);
  }
  if (vdom === undefined) return;

  const $el = document.createElement(vdom.tagName);

  vdom.children.map(renderRealDOM).forEach((node) => {
    $el.appendChild(node)
  })

  return $el;
}

export function render(vdom, container) {

  // 이전 상태를 가지려면 어떻게 하면 될까? => 가장 간단한 방법은 클로져
  if (prevVdom !== nextVdom) {
  }
  container.appendChild(renderRealDOM(vdom))
}

export cont render (function() {
  let prevVdom = null;

  return (nextVdon, container) => {
    if (prevVdom === null) {
      prevVdom = nextVdom;
    }

    // diff

    return container.appendChild(renderRealDOM(nextVdom));
  }
})();

export function createElement(tagName, props, ...children) {
  document.createElement(tagName)...

  if (typeof tagName === 'function') {
    if (tagName.prototype instanceof Component) {
      // 인스턴스라 클래스는 상태 유지가 가능하겠구나!
      const instance = new tagName({ ...props, children });
      return instance.render();
    } else {
      currentComponent++;

      // hooks는 반드시 함수형 컴포넌트 안에서만, 항상 동일한 순서로
      // 그 이유가 hooks가 항상 동일한 순서로 호출되어야함!
      return tagName.apply(null, [props, ...children]);
    }
  }

  return {
    tagName,
    props,
    children
  }

}

```

```jsx
/* @jsx createElement */
import { render, createElement, Component } from './react';

class YourTitle extends Component {
  render() {
    return <p>타이틀</p>
  }
}

function Title() {
  return (
    <h2>정말 동작?</h2>
  )
}

render(<Title />, document.getElementById('root'));

const

```

hooks는 리액트가 데이터를 관리하고 함수에 제공해주는 방법

- 어떻게 마지막 상태를 알고 넘겨줄까?
  - 아이디어
    - → 어짜피 VDOM을 가지고 DOM을 렌더링할 때 vdom내에 존재하는 함수들은 개수와 순서가 똑같잖아
    - → 그러니까 그 함수가 상태를 원하면 그 위치에 저장했던 상태를 전달해주면 되겠네?

### 3-3 Redux를 통한 실전 리스크 관리법

```jsx
// redux.js
export function createStore(reducer, middlewares = []) {
  let state;
  const handler = [];

  // 뭘 어떻게 수정할 것인가?
  function dispatch(action) {
    // middlewares(dispatch, action);

    state = reducer(state, action);
    handler.forEach((listener) => {
      listener();
    });
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    handler.push(listener);
  }

  middlewares = Array.from(middlewares).reverse();
  let lastDispatch = dispatch;

  middlewares.forEach((m) => {
    lastDispatch = m(store)(lastDispatch);
  });

  return {
    dispatch: lastDispatch,
    getState,
    add,
  };
}
```

```jsx
import { createStore } from "./redux.js";

const COUNTER = "count";

// 커링 컨셉을 이용ㅎㄴ다
// redux가 제공하는 기능을 여기서도! => store
// monkey dispatching -> redux doc 확인
// (제공받은 미들웨어 순서에 따라 리덕스 안쪽에서 재조립 <- 이 때 커링)

const middleware1 = (store) => (dispatch) => (action) => {
  console.log("mid1");
  dispatch(action);
};
const middleware2 = (store) => (dispatch) => (action) => {
  console.log("mid2");
  dispatch(action);
};

function middleware(dispatch, action) {
  return function (action) {};
}

function reducer(state, action) {
  if (action.type === COUNTER) {
    return { ...state, counter: action.palyalod.counter };
  }

  return state;
}

function actionzCreator(type, payload) {
  return { type, payload };
}

const store = createStore(reducer, [middleware1, middleware2]);

function listener() {
  console.log(store.getState());
}

store.subscribe(listenr);

store.dispatch({ type: COUNTER, payload: { counter: 1 } });
```

#### 3-4. javascript 최신 스펙을 통해 알 수 있는 인사이트

- stage 0 - 제안 단계
- stage 1
- stage 2 - draft
- stage 3 - 개발
- stage 4 - 거의 표준화

객체 머징

- for문 이용
- Object.assign({}, srcObj, targetObj)
- { ...srcObj, ...targetObj }

배열 머징

- targetArr.concat(sourceArr);
- [...targetArr, ...sourceArr]

⇒ 문법 체계가 좀 더 명확한 방식으로 바뀌어 간다

클래스

- function Person(name) { [this.name](http://this.name) = name;}
  Person.prototype.getName = function () { return this.name; }
- class Person { ... }

### 세션

- 도구선택: 마지막 릴리즈도 중요 → 지속적으로 잘 운영될 것같은 도구를 선택하는 것이 중요
- 구성

  - Presentational, Container 또는 페이지를 조합하는 역할을 하는가 등을 구분해서 폴더 구성을 하는 것이 더 좋을 수도 있다.

    ⇒ 추후 다시 보았을 때 시간이 오래 걸릴 수도

  - 컨테이너에서 UI가 한번에 보이지 않아서 오히려 프리젠터를 컨테이너로 옮겨서 처리하는 것도 괜찮다
    (눈에 한번에 보임)
    (처음부터 컴포넌트를 잘게 쪼개는 것을 권하진 않음)
  - 폴더명에 index.js만 계속있으면
    - 개발하면서 검색이 힘든 점
    - 폴더에 특정적인 이름이 들어가 잇는게 앱이 커지면서 덩치가 커짐
    - ⇒ 그래서 파일에 이름을 주는 것이 좋음 (폴더와 파일의 디펜던시를 낮게 가져감)
    - ⇒ 폴더는 도메인 (hooks, conatiner 등을 나타내는게 좋음)
    - ⇒ 폴더의 그룹핑

---

- 비지니스와 네트워크 호출 응답 부분을 완전히 분리해주는게 좋다.

FAQ

- CDN 캐싱 무효화 등...
- 백엔드 인프라 어느정도 까지 알아야할까?
  - RDB, NOSQL에 되어있는지 서버 구성이 어떻게 되어있는지 등은 파악되어야함
  - 대부분의 기술 요소는 알아야하지 않을까?
- 소프트 스킬
  - 어려운 측면들이 많다.
  - 이론을 학습한다고 내 것이 되는 것은 아님.
  - 주니어 때에는 어떤 소프트 스킬보다는 태도가 중요. (내가 틀렸을 수도 있다. 오픈 마인드)
- 주니어 개발자가 꼭 알고있으면 좋을 지식?
  - 기반 지식을 알아야 도움이 될 것

기술면접 빈출 질문

- 프론트엔드에서 상태관리는 어떻게 하는게 좋을까요?

  → 각각의 상태관리 솔루션에 대해서 어떤 장단점이 있는지?
  → 등의 구체적인 생각을 담아 답변하는게 중요

- 자바스크립트 함수의 특징 / 용도를 설명

  → 너무 추상적인 답변은 X

  → 구체적으로 설명하고 시간제한이 없다는 것은
  ⇒ 이 부분에 대해서 할얘기가 너무 많아, 그러니까 계속 얘기를 풀어낼 수 있어야함

- 특정 상태의 변화를 추적하려면 ?
  - 예전에는 딱히 좋은 방법이 없었는데 최근엔 Proxy 를 이용하면 가능할 것
  - ⇒ 형태의 답변
- 질문을 잘 듣고 분석하는 것도 중요하다.
