# React - The Complete Guide (incl Hooks, React Router, Redux)

## 목차

- [React - The Complete Guide (incl Hooks, React Router, Redux)](#react---the-complete-guide-incl-hooks-react-router-redux)
  - [목차](#목차)
  - [❌ 복습 및 정리](#-복습-및-정리)
  - [섹션 1:Getting Started](#섹션-1getting-started)
  - [섹션 2:Refreshing Next Generation JavaScript](#섹션-2refreshing-next-generation-javascript)
  - [섹션 3:Understanding the Base Features & Syntax](#섹션-3understanding-the-base-features--syntax)
  - [섹션 4:Working with Lists and Conditionals](#섹션-4working-with-lists-and-conditionals)
    - [더 알아보기](#더-알아보기)
  - [섹션 5:Styling React Components & Elements](#섹션-5styling-react-components--elements)
    - [더 알아보기](#더-알아보기-1)
  - [섹션 6:Debugging React Apps](#섹션-6debugging-react-apps)
  - [섹션 7:Diving Deeper into Components & React](#섹션-7diving-deeper-into-components--react)
    - [더 알아보기](#더-알아보기-2)
  - [섹션 8:A Real App: The Burger Builder (Basic](#섹션-8a-real-app-the-burger-builder-basic)
  - [섹션 9:Reaching out to the Web (Http / Ajax)](#섹션-9reaching-out-to-the-web-http--ajax)
  - [섹션 10:Burger Builder Project: Accessing a](#섹션-10burger-builder-project-accessing-a)
  - [섹션 11:Multi-Page-Feeling in a Single-Page-App:](#섹션-11multi-page-feeling-in-a-single-page-app)
  - [섹션 12:Adding Routing to our Burger Project](#섹션-12adding-routing-to-our-burger-project)
  - [섹션 13:Forms and Form Validation](#섹션-13forms-and-form-validation)
  - [섹션 15:Adding Redux to our Project](#섹션-15adding-redux-to-our-project)
  - [섹션 16:Redux Advanced](#섹션-16redux-advanced)
  - [섹션 17:Redux Advanced: Burger Project](#섹션-17redux-advanced-burger-project)
  - [섹션 18:Adding Authentication to our Burger](#섹션-18adding-authentication-to-our-burger)
  - [섹션 19:Improving our Burger Project](#섹션-19improving-our-burger-project)
  - [섹션 20:Testing](#섹션-20testing)
  - [섹션 21:Deploying the App to the Web](#섹션-21deploying-the-app-to-the-web)
  - [섹션 22:Bonus: Working with Webpack](#섹션-22bonus-working-with-webpack)
  - [섹션 23:Bonus: Next.js](#섹션-23bonus-nextjs)
  - [섹션 24:Bonus: Animations in React Apps](#섹션-24bonus-animations-in-react-apps)
  - [섹션 25:Bonus: A Brief Introduction to Redux Saga](#섹션-25bonus-a-brief-introduction-to-redux-saga)
  - [섹션 26:React Hooks](#섹션-26react-hooks)
  - [섹션 27:Using Hooks in the Burger Builder](#섹션-27using-hooks-in-the-burger-builder)
  - [섹션 28:Bonus: Replacing Redux with React Hooks](#섹션-28bonus-replacing-redux-with-react-hooks)
  - [섹션 29:Bonus: Building the Burger CSS](#섹션-29bonus-building-the-burger-css)
  - [섹션 30:Next Steps and Course Roundup](#섹션-30next-steps-and-course-roundup)

## ❌ 복습 및 정리

## 섹션 1:Getting Started

- 왜 리액트인가?
  - UI 상태를 일반 JavaScript로 다루기가 어려워졌다.
  - 앱이 터져나가는 것을 방지하는 것이 아닌, 비지니스 로직에 집중하기 위해
- SPA vs MPA
  - SPA
    - HTML 페이지 한개, 내용은 클라이언트에서 (re)렌더링됨
    - 하나의 `ReactDOM.render()`
  - MPA
    - 여러 HTML 페이지 (각 경로마다 다른 HTML)
    - 각 위젯(영역)마다 사용하는 기술이 다를 수 있고, 만약 그게 리액트라면 `ReactDOM.render()`가 여러번 호출되어 페이지가 그려질 것임

## 섹션 2:Refreshing Next Generation JavaScript

- default export, named export
- \* 로 모든 named export를 참조할 수 있음
- Array functions
  - [`find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
  - [`concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat?v=b)
  - [`slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
  - [`splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

## 섹션 3:Understanding the Base Features & Syntax

- [리액트에서 지원되는 이벤트 목록](https://reactjs.org/docs/events.html#supported-events)
- setState가 전달받은 프로퍼티들로 일부만 업데이트하는 반면, useState는 그런 특성을 가지지 않고 넘긴 데이터로 대체함

## 섹션 4:Working with Lists and Conditionals

### 더 알아보기

- [Lists & Keys](https://reactjs.org/docs/lists-and-keys.html)

## 섹션 5:Styling React Components & Elements

### 더 알아보기

- [라이브러리 - Radium](https://github.com/formidablelabs/radium): style내에서 :hover, @media 등 사용가능
- [CSS Module](https://github.com/css-modules/css-modules)
  - 자동으로 class명을 만들어준다 보면 되겠다
  - `:global` prefix를 갖는 클래스로 정의하면, 자동으로 변환된 클래스가 아니라 개발자가 정의한 클래스명이 나올 것이다.

## 섹션 6:Debugging React Apps

- [브라우저 디버거](https://developers.google.com/web/tools/chrome-devtools/javascript/)를 사용하면 break point 등을 걸고 그 내용을 확인할 수 있기 때문에 편리하다
- [ErrorBoundary](https://reactjs.org/docs/error-boundaries.html)를 사용하면 에러 로그 등을 수집하기 편리하다.

## 섹션 7:Diving Deeper into Components & React

- props를 이용해 초기화 해야하는 경우 constructor에서 state 초기화 처리
- creation, props change, state change

### 더 알아보기

- 컴포넌트 라이프 사이클 vs React Hooks

## 섹션 8:A Real App: The Burger Builder (Basic

## 섹션 9:Reaching out to the Web (Http / Ajax)

## 섹션 10:Burger Builder Project: Accessing a

## 섹션 11:Multi-Page-Feeling in a Single-Page-App:

## 섹션 12:Adding Routing to our Burger Project

## 섹션 13:Forms and Form Validation

## 섹션 15:Adding Redux to our Project

## 섹션 16:Redux Advanced

## 섹션 17:Redux Advanced: Burger Project

## 섹션 18:Adding Authentication to our Burger

## 섹션 19:Improving our Burger Project

## 섹션 20:Testing

## 섹션 21:Deploying the App to the Web

## 섹션 22:Bonus: Working with Webpack

## 섹션 23:Bonus: Next.js

## 섹션 24:Bonus: Animations in React Apps

## 섹션 25:Bonus: A Brief Introduction to Redux Saga

## 섹션 26:React Hooks

## 섹션 27:Using Hooks in the Burger Builder

## 섹션 28:Bonus: Replacing Redux with React Hooks

## 섹션 29:Bonus: Building the Burger CSS

## 섹션 30:Next Steps and Course Roundup
