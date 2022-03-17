# Try and Learn

공부한 것들을 정리하는 곳. 큰 프로젝트 구현은 여기서 하지 않고, 간단한 예제 구현이나 POC 정도를 진행하고 간단하게 정리해본다.

## 📖 목차

- [Try and Learn](#try-and-learn)
  - [📖 목차](#-목차)
  - [Try - 기록, 코드, 개념 정리](#try---기록-코드-개념-정리)
    - [상태관리 라이브러리](#상태관리-라이브러리)
    - [Form 라이브러리](#form-라이브러리)
    - [Test & Mock](#test--mock)
    - [CSS](#css)
    - [기타](#기타)
  - [책/강의/튜토리얼 학습 로그](#책강의튜토리얼-학습-로그)
    - [📕 종이책](#-종이책)
    - [🌏 공개된 자료](#-공개된-자료)
    - [튜토리얼 (유료)](#튜토리얼-유료)

## Try - 기록, 코드, 개념 정리

> 📝 블로그에 포스팅된 글 / 직접 작성한 글

### 상태관리 라이브러리

- [Recoil](./try/recoil)
- [Jotai](./try/jotai)
- [Zustand](./try/zustand/README.md)
- Redux
  - [redux-toolkit](./try/redux-toolkit)
- MobX
  - [MobX.js.org](./try/mobx/mobx-js-org)
  - [Reinventing MobX](./try/mobx/reinventing-mobx) (MobX 만들기)
  - [Mobx State Tree (MST)](./try/mobx-state-tree)
- [react-query](./try/react-query)
- 궁금해서 정리!
  - 📝 [Jotai vs Recoil](./readings/jotai-vs-recoil)

### Form 라이브러리

- [react-hook-form](./try/react-hook-form)
- [yup](./try/yup)
- POC
  - [react-hook-form-v6](./poc/react-hook-form-v6): 훌륭하지만 double nested 필드를 처리하는데 특정 케이스 문제가 있다. 예를 들어 setValue를 하면 값이 사라지거나 반영되지 않는 현상이 있다. defaultValues를 잘 관리해야만한다. 하지만 다소 Flat한 폼을 구현한다면 가볍고 심플한 react-hook-form을 추천하는 바이다. => v7 이후 부터는 발견했던 대부분의 문제가 해결되었다. 강력 추천!
  - [formik-v2](./poc/formik-v2)

### Test & Mock

- [Miragejs](./try/miragejs)
- [📝 고찰 - 어떻게 테스트를 작성해야할까?](./try/javascript-test/consideration-how-to-write-test.md)

### CSS

- [z-index](./try/css/z-index.md)
- [dark-mode](./try/css/dark-mode)
- 애니메이션
  - [animation 라이브러리](./poc/animation)

### 기타

- **[Basics](./try/basics)**
- [Chrome Extension](./try/chrome-extension)
- **JavaScript Core**
  - [Generator](./try/javascript-core/generator)
  - [Iterator](./try/javascript-core/iterator)
  - [File](./try/javascript-core/File)
- **JavaScript Pattern**
  - [Data Binding](./try/javascript-pattern/vanilla-js-data-binding)
- [Nest.js](./try/nestjs)
- **ReactJS**
  - [Build your own React](./try/reactjs/build-your-own-react) (React 만들기)
  - [📝 React V-DOM에 대한 고찰](./try/reactjs/react-v-dom-study)
  - [📝 리액트 이벤트 시스템 - Synthetic Event](./try/reactjs/synthetic-event)
  - [react-spring](./try/react-spring)
- **Web**
  - [📝 브라우저는 어떻게 렌더링 되는가?](https://gwanduke.tistory.com/entry/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%A0%8C%EB%8D%94%EB%A7%81-%EB%90%98%EB%8A%94%EA%B0%80)
- **WebRTC**
  - [data-channel](./try/web-rtc/data-channel)
  - [taking-still-photos](./try/web-rtc/taking-still-photos)
- **[Webpack HMR](./try/webpack-hmr)**
- Git
  - [브랜치 전략](./try/git/strategy.md)

## 책/강의/튜토리얼 학습 로그

> ✅ 후기 작성 or 복습 완료, 📝 거의 완료, 🔥 진행중, ✋ 중단

(순서는 중요하지 않다.)

### 📕 종이책

- ✋ [자바스크립트 패턴과 테스트](./material/books/javascript-pattern-and-test)
- 📝 [JavaScript Patterns](./material/books/javascript-patterns)
- ✋ [Node.js 디자인 패턴](./material/books/nodejs-design-pattern)
- ✋ [리팩토링 자바스크립트](./material/books/refactoring-javascript)
- 📝 [Node.js 교과서](./material/books/nodejs-textbook)
- 📝 [리액트를 다루는 기술 (개정판)](./material/books/the-art-of-dealing-with-react)

### 🌏 공개된 자료

- ✋ [모던 자바스크립트 튜토리얼](./material/internet/modern-javascript-tutorial)
- ✋ [Notes on TypeScript](./material/internet/notes-on-typescript)

### 튜토리얼 (유료)

- egghead.io
  - 📝 [Epic React](./material/egghead/epic-react)
  - 📝 [Testing JavaScript](./material/egghead/testing-javascript)
- Fast Campus
  - 📝 [The RED: React와 Redux로 구현하는 아키텍처와 리스크관리](./material/fastcampus/the-red-react-redux-risk-management.md)
- Udemy
  - HTML/CSS, Animation
    - ✅ [Build Responsive Real World Websites with HTML5 and CSS3](./material/udemy/build-responsive-real-world-websites)
    - 📝 [Creative CSS Animations Transitions And Transforms Course](./material/udemy/creative-css-animations-transitions-and-transforms-course)
    - 📝 [Interactive Web Animation 2020 [JavaScript, SVG, CSS & HTML]](./material/udemy/interactive-web-animation-2020)
    - 📝 [Learn SVG Animation - With HTML, CSS & Javascript](./material/udemy/learn-svg-animation)
  - JavaScript, ReactJS
    - 📝 [Microfrontends with React: A Complete Developer's Guide](./material/udemy/microfrontends-with-react)
    - 📝 [React - The Complete Guide (incl Hooks, React Router, Redux)](./material/udemy/react-the-complete-guide)
    - 📝 [The Complete JavaScript Course 2020](./material/udemy/the-complete-javascript-course-2020)
    - ✋ [Microservices with Node JS and React](./material/udemy/microservices-with-node-js-and-react)
    - 📝 [Modern React with Redux [2020 Update]](./material/udemy/modern-react-with-redux)
  - Tools
    - ✋ [Docker Mastery: with Kubernetes +Swarm](./material/udemy/docker-mastery-with-kubernetes-swarm.md)
    - ✅ [Webpack 5: The Complete Guide For Beginners](./material/udemy/webpack5-the-complete-guide-for-beginners)
