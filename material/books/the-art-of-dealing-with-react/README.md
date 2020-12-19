# 리액트를 다루는 기술

> 하루만에 정복하기 홀로 해커톤 🔥
>
> 2020년 12월 11일 18:00 ~ 2020년 12월 12일 18:00

어제 문득 Redux를 다시 한번 돌아봐야겠단 생각이 들었다. 컨셉과 목적만 이해하고 있는 것만으로는 약간 찝찝한 느낌이 있기도하고 가장 대중적인데 실무에서 사용한지는 꽤 되어간다. 그래서 다시 한번 되짚어보는 시간을 갖기로 결심하고, 예전에 Velopert 김민준님을 통해서 Redux를 처음 접했던 기억이 있어서 "리액트를 다루는 기술"을 구입했다. 그리고 `12월 11일 (금) 18:00`에 받았다. 책에 샘플 프로젝트도 있으니 다시 감을 잡는데 도움이 될 것같았다. 물론 공식문서나 나만의 프로젝트도 좋지만, 실무가 아닌 공부를 할 때는 비교적 빠른 시간내에 그리고 명확한 목표를 잡고 공부를 할 수 있는 잘 짜여진 책을 택하는 것이 좋겠단 생각이 들었다. 목표는 과하게도 하루만에 다보기로 작정했다.

대부분은 아는 내용이라 쉽게 쉽게 읽어 넘어갈 수 있었고 정확하게 알지 못했거나 포인트가 되는 부분들은 챕터가 끝나고 따로 기록을 했다. Redux로 실습하는 부분과 프로젝트를 직접 만드는 부분은 실무적으로 그리고 근육이 기억하는데 도움이 될 것같아서 다 따라해봤다. 너무나 초보일 때 봤다면 잘 모르고 힘들었을 것들이 지금은 보이는 것같다. 알게 모르게 이해력이 많이 상승했다.

지금은 `12월 12일 (토) 08:00`. 밤을 꼬박 샜는데 치킨과 햄버거로 3만원을 식비로 지출했다. 하하... 그래도 오랜만에 목표를 가지고 공부하니 행복하다. 이제 약 200페이지, 마지막 프로젝트 챕터만 남겨두고 있는데 잠이 슬슬와서 점심때 쯤 다시 일어나 진행해야할 것 같다.

지금은 `12월 12일 (토) 19:00`. 생각대로 다 끝낼 수는 없었다 하하... 하지만 뒷 내용은 반복되는 부분이라 또 봐야할 것같진 않고 우선은 여기서 마무리하고 다음주에나 한번 복습하는 시간을 가져야겠다. 고생했다.

![새벽 어느 시간](./20201212.jpg)

`12월 16일 (수) 04:00`, 정리 끝 👍

## 목차

- [리액트를 다루는 기술](#리액트를-다루는-기술)
  - [목차](#목차)
  - [정리 및 복습](#정리-및-복습)
    - [✅ 정리](#-정리)
    - [❌ 복습](#-복습)
  - [5장. ref: DOM에 이름 달기](#5장-ref-dom에-이름-달기)
  - [6장. 컴폰넌트 반복](#6장-컴폰넌트-반복)
  - [7장. 컴포넌트 라이프 사이클](#7장-컴포넌트-라이프-사이클)
    - [마운트](#마운트)
    - [업데이트](#업데이트)
    - [언마운트](#언마운트)
    - [전체 구조](#전체-구조)
  - [8장. Hooks](#8장-hooks)
  - [10장. 일정관리 어플리케이션 만들기](#10장-일정관리-어플리케이션-만들기)
  - [11장. 컴폰넌트 성능 최적화](#11장-컴폰넌트-성능-최적화)
  - [12장](#12장)
  - [13장. 리액트 라우터로 SPA 개발 하기](#13장-리액트-라우터로-spa-개발-하기)
  - [14장. 외부 API를 연동하여 뉴스 뷰어 만들기](#14장-외부-api를-연동하여-뉴스-뷰어-만들기)
  - [15장. context API](#15장-context-api)
  - [16장. 리덕스라이브러리 이용하기](#16장-리덕스라이브러리-이용하기)
  - [17장. 리덕스를 사용하여 리액트 애플리케이션 상태 관리하기](#17장-리덕스를-사용하여-리액트-애플리케이션-상태-관리하기)
  - [18장. 리덕스 미들웨어를 통한 비동기 작업 관리](#18장-리덕스-미들웨어를-통한-비동기-작업-관리)
  - [19장. 코드 스플리팅](#19장-코드-스플리팅)
  - [20장. 서버 사이드 렌더링](#20장-서버-사이드-렌더링)
    - [서버사이드 렌더링 구현](#서버사이드-렌더링-구현)
    - [데이터 로딩](#데이터-로딩)
    - [코드 스플릿팅](#코드-스플릿팅)
  - [22장. mongoose를 이용한 MongoDB 연동 실습](#22장-mongoose를-이용한-mongodb-연동-실습)
  - [23장. JWT를 통한 회원 인증 시스템 구현하기](#23장-jwt를-통한-회원-인증-시스템-구현하기)
  - [24장. 프런트엔드 프로젝트: 시작 및 회원 인증 구현](#24장-프런트엔드-프로젝트-시작-및-회원-인증-구현)

## 정리 및 복습

### ✅ 정리

- [x] 12월 15일 복습/정리
- [x] 책에 노트한 내용 복습겸 옮겨적기
- [x] 25장 이후 실습 마무리

엄청나게 어려운 부분은 없었지만 간과한 부분들은 있는 것같다. 내용들을 정리해봤는데 아래 내용만 두세면 돌아보면서 정리해보면 다시 까먹거나 놓칠 일은 없겠다.

### ❌ 복습

- [ ] 1회독
- [ ] 2회독
- [ ] 3회독

## 5장. ref: DOM에 이름 달기

ref 방법 2가지

1. 콜백함수: `<Comp ref={(el) => this.el = el} />`
2. `ref = createRef()` or `const ref = useRef`

## 6장. 컴폰넌트 반복

- [ ] key에 대해서 한번더 정확히 정리해보기

## 7장. 컴포넌트 라이프 사이클

- render: 리액트 요소 반환. DOM접근 또는 state 변화등 금지
- constructor: 초기 state 정의 가능
- getDerivedStateFromProps: (v16.3 이후) props로 받은 값을 state에 동기화할 때 사용. 변경 미필요시 null 반환. 필요시 `{ value: nextProps.value }` 처럼 반환
- componentDidMount: 렌더링 마무리 후 실행. 비동기 작업 처리
- shouldComponentUpdate: props또는 state 변경시 리렌더링 할지 말지 지정하는 메서드
- getSnapshotBeforeUpdate (v16.3 이후) 업데이트 직전의 값을 참고할 일이 있는 경우 사용 (스크롤바 위치 등...)
- componentDidUpdate: 리렌더링 수행 후 실행. 업데이트가 끝난 직후 이므로 DOM관련 처리해도 무방. snapshot 전달받아 처리 가능
- componentWillUnmount: 컴포넌트가 DOM에서 제거될 때 실행. 등록한 이벤트/타이머/직접 생성한 DOM등을 제거하는데 사용
- componentDidCatch: (v16) 렌더링 도중에 에러 발생시 그 내용을 catch (주로 ErrorBooundary를 적용해 처리)

### 마운트

```plain
constructor

getDerivedStateFromProps // props를 state에 동기화

render

componentDidMount
```

### 업데이트

컴포넌트가 업데이트 되는 시점

- props가 변경될 때
- state가 변경될 때
- 부모 컴포넌트가 리렌더링 될 때
- this.forceUpdate로 강제로 렌더링을 트리거할 때

```plain
props변경    부모 리렌더링
    |          |
getDerivedStateFromProps
           |
shouldComponentUpdate <=== state 변경
           |
           | <- (false인 경우 취소)
           |
         render       <=== forceUpdate
           |
getSnapshotBeforeUpdate // 컴포넌트 변화를 DOM에 반영하기 직전에 호출됨
           |
    (브라우저 DOM 변화)
           |
   componentDidUpdate
```

### 언마운트

```plain
언마운트
   |
componentWillUnmount
```

---

- getDerivedStateFromProps (>=16.3)

  ```js
  static getDerivedStateFromProps(nextProps, prevProps) {
    (nextProps.value !== prevState.value) {
      return { value: nextProps.value }
    }
    return null; // state 변경 미필요시 null 반환
  }

  ```

- componentDidMount() { ... }
- shouldComponentUpdate(nextProps, nextState) { ... }
- getSnapshotBeforeUpdate

  ```js
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.array !== this.state.array) {
      const {scrollTop, scrollHeight } = this.list;
      return {scrollTop, scrollHeight}
    }
  }
  ```

- componentDidUpdate(prevProps, prevState, snapshot) { ... }
  - DOM 업데이트가 완료되고 호출되므로 DOM 조작을 해도 무방
- componentWillUnmount() { ... }
  - componentDidMount에서 등록한 이벤트, 타이머 등을 제거하는 작업 진행

### 전체 구조

```plain

Mount                  Update                    Unmount
  |                      |                          |
constructor              |                 componentWillUnmount
         |               |
        getDerivedStateFromProps
         |               |
         |       shouldComponentUpdate
         |     / (true)
        render <-- (forceUpdate)
         |     \
         |        getSnapshotBeforeUpdate
         |               |
componentDidMount componentDidUpdate
```

## 8장. Hooks

- useState
- useEffect
- useReducer
- useMemo
- useCallback: 함수를 재사용 (렌더링이 자주발생하는 경우, 함수가 매번 재생성되므로 사용 고려해볼만함)
- useRef: 렌더링과 관련없는 값을 관리할 때, 이를 사용해 처리할 수 잇음
- 커스텀 hooks

## 10장. 일정관리 어플리케이션 만들기

- react-icons 라이브러리: 아이콘을 손쉽게 사용하는데 편리했음
- 자바스크립트 프로젝트에서 `jsconfig.json`을 추가해주면 자동완성이 제대로 동작하도록 처리 가능

## 11장. 컴폰넌트 성능 최적화

- 리액트 상태를 불변성을 지켜 업데이트 해주는 것은 중요: React.memo 등을 잉요해 성능 최적화에 용이. 불변성이 지켜지지 않으면 내부값이 변경되어도 감지 불가 (=> shallow compare 하므로)
- react-virtualized를 이용해 리스트 최적화 가능 (엘리먼트 재사용)
  - 이를 위해서는 각 항목의 실제 크기를 px 단위로 알아낼 필요가 있음
- 부모 컴포넌트가 리렌더링 되면 자식도 컴포넌트도 리렌더링 된다.
  - => 여기서의 렌더링은 V-DOM의 렌더링으로서 최적화할 필요가 있다.
  - => 자식 컴포넌트에서 렌더링 되지 않아야하는 경우를 알고 처리해줄수 있다.
- shouldComponentUpdate를 활용하고, 브라우저의 performance 탭을 사용할 수 있다.

보통 리스트에서 이런 처리가 필요한 경우가 많다.

- [ ] 단순히 props를 동일하게 넘기는 것만으로는 최적화는 일어나지 않는가? 꼭 React.memo 같은 기법을 사용해야만 하는가

## 12장

immer를 이용하면 불변을 mutable하게 다룰 수 있음

## 13장. 리액트 라우터로 SPA 개발 하기

- withRouter: 라우트로 사용된 컴포넌트가 아니더라도 match, location, history에 접근 가능하게 해줌

## 14장. 외부 API를 연동하여 뉴스 뷰어 만들기

- useEffect에 등록되는 함수는 async로 작성하면 안된다.

## 15장. context API

- v16.3 이후 많이 개선됨
- 클래스 컴포넌트에서 `static contextType`으로 지정하면, `this.context`로 조회 가능
- 사용고려?
  - 환경설정, 사용자 정보 등에 활용 (전역적으로 여기저기서 사용되는 경우 활용)
  - 하지만 모든 상황에 대처는 불가하므로 state 관리 라이브러리 도입을 고려해야할 수 있음 (미들웨어, 개발자 도구, 유지 보수성 등...)

## 16장. 리덕스라이브러리 이용하기

- 액션: 액션 객체는 type필드가 필수임
- 액션 creator
- reducer: 변화를 일으키는 함수
- store
  - dispatch
  - subscribe

리듀서는 순수해야하므로, 데이터베이스 접근, 네트워크 요청, new Date(), math.random 같은 함수 등도 사용해서는 안됨

- 세가지 규칙
  - 단일 스토어
  - 읽기 전용 상태: 리덕스는 불변성을 유지해 내부적으로 변경을 얕은 비교할 수 있도록 해주어야함
  - 리듀서는 순수함수: 이전상태, 액션을 받으며 이 외에 다른 값에는 의존해서는 안됨

## 17장. 리덕스를 사용하여 리액트 애플리케이션 상태 관리하기

폴더 구조는 다음 두가지가 주로 쓰임

1. ducks 패턴: 기능, 모듈로 나누는 방법
2. action, aciton type, reducer로 나누는 방법

- 라이브러리
  - redux-actions: payload가 강제됨. 리듀서와 액션 creator를 만드는데 편리함 제공
- 액션타입을 `모듈이름/액션이름`으로 정의해줌으로서 이름 충돌을 방지할 수 있공
- hooks
  - useSelector: 상태 조회
  - useDispatch: 액션 디스패치
  - useStore: 스토어에 직접 접근해야하는 경우 사용. 거의 사용되지 않음

connect함수를 사용해 컨테이너 컴포넌트를 만든 경우, 컨테이너 컴포넌트의 props가 변경되지 않는 경우 리렌더링이 자동으로 방지됨 (memo 자동 적용됨, 아닌 경우 따로 처리 필요(useSelector 사용 포함))

## 18장. 리덕스 미들웨어를 통한 비동기 작업 관리

```plain
액션 -> 미들웨어 -> 리듀서 -> 스토어
```

```js
// middleware signature
const mid = (store) => (next) => (action) => {
  // todo
};
```

- 리듀서가 액션을 처리하기 전에 미들웨어가 동작함 (액션 취소, 다른 액션 추가 디스패치 등...)
- `next(action)`로 다음 미들웨어 또는 (마지막인 경우)리듀서 호출
- `next()`를 호출하지 않는 경우 액션 무시
- 라이브러리
  - redux-thunk: 함수 형태의 액션을 디스패치 할 수 있음 `(dispatch, getState) => { ... }`
  - redux-saga: 어떤 액션이 디스패치 되면 정해진 로직에 따라 다른 액션 디스패치
    - 기존 요청 취소 처리, 웹소켓, API 실패시 재 요청 등의 상황에 유리
- 제너레이터
  - 처음 만들어지면 함수 흐름은 멈춘 상태
  - `next()`가 호출되면 yield가 있는 곳까지 호출되고 다시 멈춤 (반복)

미들웨어 없이 컴포넌트에서 API 요청해도 괜찮지만, 미들웨어를 사용하면 더 편리하게 처리 가능

- [ ] 미들웨어 없이 컴포넌트에서 사용하는 것과 thunk 사용시의 편리함의 차이?

## 19장. 코드 스플리팅

- CRA의 기본 splitChunks는 build시 내 코드와 node_modules 코드를 기본적으로 분리함
- dynamic import된 파일은 웹팩에 의해 자동으로 chunk 됨
- (v16.6 이후)
  - `React.lazy`는 컴포넌트를 렌더링하는 시점에서 비동기적으로 로딩할 수 있게 해주는 유틸 함수
  - `Suspense`는 코드 스플리팅된 컴포넌트를 로딩하도록 발동 + 로딩이 끝나지 않았을 때 fallbak ui 보여줄 수 있음

## 20장. 서버 사이드 렌더링

- 장점
  - SEO: 크롤러의 올바른 정보 수집
  - 느린 네트워크 환경에서 빠른 초기 렌더링 (초기 렌더링 + API 호출 지연시간 최소화)
- 단점
  - 서버 리소스 사용
  - 과부하 발생 우려, 캐싱/로드 밸런싱 등의 처리 필요
  - 프로젝트 구조 복잡해짐
  - 아래 이유로 깜빡임 발생 가능 (이를 해결함으로 복잡성 증가)

서버 사이드 렌더링은 다음 이유로 깜빡임이 발생할 수 있음. 그래서 loadable compoennts 등의 라이브러리를 이용해 필요한 파일 경로를 추출하여 초기 렌더링시 스크립트/스타일을 삽입해주어야함

1. 서버 사이드 렌더링된 결과물이 브라우저에 나타남
2. 자바스크립트 로딩 시작
3. 자바스크립트가 실행되면서 불러와지지 않은 컴포넌트 (chunked된)을 Null로 렌더링
4. 코드 스플리팅된 컴포넌트들이 로딩된 이후 올바르게 나타남

### 서버사이드 렌더링 구현

- 서버를 위한 엔트리 파일 생성(renderToString 이용)
- 서버 엔트리용 웹팩 설정
  - css, 이미지 등은 서버 렌더링시 중요하지 않지만, 파일에 대한 경로나 className등을 참조할 수 있어 처리 필요 (하지만 결과물에는 포함 X)
  - 브라우저 환경과 달리, node_modules에 바로 접근 가능하므로 번들링시 node_modules를 제외시켜도 무방
- build 스크립트 구성 (기존 build.js를 참고, 근본적으로는 webpack 명령을 실행하는 스크립트일 뿐임)
- 서버에서는 asset을 제외한, 모든 path에 대해서 렌더링된 앱을 string으로 클라이언트로 전달해야한다.
  - css는 head에 끼워넣고
  - chunks는 body 태그 닫히기 전에 처리

### 데이터 로딩

> 데이터 로딩을 처리하는 방법은 실습한 방법 외에도 다양하다.

- 서버
  - 서버에서는 componentDidMount 같은 라이프사이클 메서드는 불리지 않는다 (useEffect 포함)
  - 서버사이드 렌더링시에는 이미 있는 정보를 요청하지 않도록 처리해주는 것이 중요하다 (보통 데이터 여부에 따라, 코드상 개발자의 조건 처리 필요)
  - 서버에서는 **렌더링 전**에 데이터를 따로 호출해 준비해야함(store에)
    - 처리 위치: constructor 또는 render 함수 자체에서 처리
  - `PreloadContext`를 이용, 처리해야할 작업들을 promise로서 이 컨텍스트에 준비하고 처리
    - 서버 환경에서만 Provider로 `{ done: false, promises: [] }` 같은 구조를 넘겨 처리
  - redux를 사용하는 경우, 요청이 들어올 때 마다 스토어를 새로 만들어 주어야함 (여러 사용자가 사용하는 환경임을 기억)
- 클라이언트
  - HTML string내에 실제 스크립트 실행전에, 전체 상태를 담고있는 상태 스크립트를 삽입해줌으로서 `서버 <-> 클라이언트`간 상태유지
  - 클라이언트 store 초기화시 이 상태 값을 사용
- redux-saga 는 다음 순서로 처리
  - `const sagaPromise = sagaMiddleware.run(rootSaga).toPromise()` (task를 프로미즈로서 취급)
  - `store.dispatch(END)` (액션을 모니터링하는 사가 모두 종료)
  - `await sagaPromise` (프로미즈 종료시 데이터 준비완료로 판단)

필요한 데이터가 준비될 때 까지 기다린다는 개념만 이해하면 위와 같은 아이디어로 처리 가능함

### 코드 스플릿팅

서버에서...

`loadable-components`를 사용하는 경우, 다음 순서로 처리 가능

1. 필요한 곳에서 코드 스플릿팅 적용 (`loadable(() => import(...))`)
2. 웹팩, babel 플러그인 적용 (`lodable-stats.json` 생성. 이는 chunk에 대한 정보를 포함함)
3. 위 파일에서 chunk 경로를 추출해 서빙되는 HTML에 추가 (`@loadble/server` 패키지에서 json파일로 부터 추출하는 유틸 제공 `new ChunkExtractor({ statsFile })`, `<ChunkExtractorManager extractor={extractor}>`)
   - 컴포넌트 렌더링 이후 다음을 호출하면 파악가능
     - `extractor.getScriptTags()`
     - `extractor.getLinkTags()`
     - `extractor.getStyleTags()`

클라이언트에서...

- `loadableReady`를 이용해 스크립트가 모두 로딩되고난 후에 `ReactDOM.hydrate` 호출
- production 모드가 아닌 경우(dev-server 이용하므로), `ReactDOM.render` 호출

## 22장. mongoose를 이용한 MongoDB 연동 실습

- RDBMS
  - 데이터 스키마가 고정적
  - 수평확장에 불리 (스케일 업 하는 편이 쉬움)
  - 까다로운 조건으로 데이터 필터링 또는 ACID를 지켜야한다면 RDBMS가 유리
- NoSQL
  - 유동적인 스키마
  - 분산 처리하여 확장하기 쉽게 설계됨
  - 문서 == 레코드
  - 컬렉션 == 테이블
  - 관계의 표현은 RDBMS 처럼 아이디를 가지는게 아니라, 데이터 전체를 nest해버림 (sub-document라 부름)
- mongoose
  - 스키마: 필드 형식 정의
  - 모델: 실제 작업을 처리하는 인스턴스

> 스키마 걱정없이 바로 앱을 작성할 수 있어서 편리했음. 특별히 어려운 점은 없었다.

## 23장. JWT를 통한 회원 인증 시스템 구현하기

- 토큰은 주로 `HMAC SHA256` or `RSA SHA256` 이용
- 토큰에는 상태가 포함되어, 서버에서는 이를 관리하거나 추가적으로 조회하는 리소스가 덜든다.
- localStorage 또는 sessionStorage에 보관하는 경우: XSS에 취약
- 쿠키도 동일한 문제 있으나
- 쿠키+httpOnly: 자바스크립트를 통해 쿠키조작 불가해 악성 스크립트로 부터 비교적 안전. 하지만 CSRF 공격에 취약 => CSRF는 Referer검증 등의 기법으로 막을 수 있음 (XSS는 여러 안전장치를 동원해도 막기 힘듬)

## 24장. 프런트엔드 프로젝트: 시작 및 회원 인증 구현

- token은 cookie를 이용하지만, 사용자 정보는 localStorage에 저장하고 로그인 유지하기도 함. (앱 접속시 토큰으로 확인하고 로그인 취소하는 전략)

- [ ] css-in-js (styled-components)를 사용하면 어떤 이점이 있을까? 클래스는 어떻게 조직될까?
