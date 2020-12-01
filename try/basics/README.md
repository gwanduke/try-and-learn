# 기본기

아는 내용일지라도 막상 누군가 물어보면 당황할 수가 있다. 인터뷰를 위한 질문아니냐고 반문할 수도 있지만 알아둬서 나쁠건 없다고 생각한다. 의외로 이런 질문들을 접하다보면 느낌상으로 아는데 정확하게 대답을 못하는 질문들이 꽤나 있다.

그러니까 한번 할 때 제대로 정리해두자.

- [더 찾아보고 개선한 답변](./my-answer-improved.md)

## 목차

- [기본기](#기본기)
  - [목차](#목차)
  - [통신/API/브라우저](#통신api브라우저)
  - [언어 패러다임](#언어-패러다임)
  - [JavaScript](#javascript)
    - [일반](#일반)
    - [this](#this)
    - [ES6](#es6)
    - [비동기](#비동기)
  - [React](#react)
  - [Tools](#tools)
  - [TypeScript](#typescript)
  - [그 외](#그-외)
  - [CSS](#css)
  - [인성](#인성)
  - [그 외 특이사항](#그-외-특이사항)
  - [참고자료](#참고자료)

## 통신/API/브라우저

- HTTP 통신이란?
- HTTP와 HTTPS의 차이는?
- HTTP1.1과 2.0의 차이는?
- 웹 프로토콜이란?
- `4` RESTful API에 대해서 설명해달라
- CORS란? 왜 이 방법이 등장하였는가? 경험했던 이슈가 있는가?
- CORS 그리고 JSONP
- CSR vs SSR
- GET vs POST
- `5` 브라우저가 렌더링되는 과정에 대해서 설명해주세요.
- `4` 브라우저 저장소에 대한 차이를 설명해주세요. (localStorage, SessionStorage, Cookie, IndexedDB 등...)

## 언어 패러다임

- OOP의 특징에 대해 설명하라
- 함수형 프로그래밍의 특징에 대해 설명하라
- 함수형 프로그래밍 개념에서 순수함수란?
- OOP vs FP의 차이점은?
- 반응형 프로그래밍이란?
- 메모이제이션이란?
- 프로세스와 스레드의 차이는 무엇인가?
- call by value & call by ref

## JavaScript

### 일반

- JavaScript의 Number type이 가지는 다른 언어와의 차이점은? 왜 하나만 존재하는가?
- JavaScript의 원시 타입은 몇가지 인가?
- `4` 실행 컨텍스트(Execution Context)에 대해 설명하라
- `5` 호이스팅이란?
- `5` 클로저는 무엇인가? 왜 사용하는가?
- GC의 역할은 무엇이며 어떻게 동작하는가?
- JavaScript에서 순환참조란? 문제점과 해결방법을 설명하라
- JavaScript의 배열은 실제 배열 자료구조가 아닌데 그 이유는?
- `4` 이벤트 루프와 동시성 모델에 대해서 설명하라
- 프로토타입이란?
- null vs undefined
- 메서드 체이닝이란 무엇이며, 이에 대한 장/단점은?
- 이벤트 위임이란?
  - `4` 이벤트 버블링이란? (bubbling? capturing?) 이를 잘 사용하려면?
- DOM을 건드리는 방식과 아닌 방식들의 차이를 알려달라
- `4` 웹워커?
- require와 import의 차이점?

### this

- this는 몇가지로 추론될 수 있는가?
- 일반함수의 this와 화살표 함수의 this는 어떻게 다른가?
- call, apply, bind에 대해서 설명하라
- use strict 모드에서의 this?

### ES6

- 브라우저가 ES6를 지원하지 않는 경우 해결방법은 무엇인가?
- Babel이란?
- Babel은 컴파일러인가 트랜스파일러인가?
- ES6에서 추가된 스펙은 어떤게 있는가?
- var, let, const의 차이는 무엇인가? (function scope와 block scope의 개념에서)
- class는 무엇이며 prototype, function의 ES5 스펙만으로 class 구현이 가능한가?

### 비동기

- AJAX란 무엇인가?
- Promise와 Callback의 차이점은 무엇인가? 각각의 장단점은?
- Promise란 무엇이며 코드가 어떻게 구성되는가?
- `4` Async/Await가 무엇인가?
- `4` Async/Await vs Promise 차이는?

## React

- 리액트의 상태관리에 대해서 알고 있는가? 리덕스를 사용해 봤다면 그에 대한 설명
- Redux-saga의 observable에 대해서 들어봤는가?
- Context API에 대해서 설명하시오.
- 클래스형과 함수형의 차이는 무엇인가?
- 라이프사이클 메서드에 대해서 설명하시오.

## Tools

- ESLint란?
- Prettier란?
- Webpack이란?
- 패키지 매니저는 어떤 것을 사용하는가?
- npm과 yarn의 차이는?
- package.json의 역할은 무엇인가?
- package.json에서 dependencies와 devDependencies의 차이는?

## TypeScript

- 타입스크립트에 대한 경험이 있는가? 타입스크립트에 대한 생각과 도입시 장점은?

## 그 외

- 배포를 해본적이 있는가?
- 어떻게 배포를 해보았는가?
- 두 명의 프론트엔드 개발자가 있을 때 git 관리 방식은?
- 라이브러리 vs 프레임워크 무엇이 다른가?
- Angular와 React의 차이는 무엇이라고 생각하는가?
- Vue vs React 무엇이 다른가?
- 현재 사용하는 프레임워크와 선택이유
- 최근 유행하는 프레임워크들과 차이점, 장단점은?
- JavaScript 성능 최적화를 해본 경험이 있는가?
- MVVM 에 대해서 설명해주세요.

## CSS

- inline vs inline block
- 적응형과 반응형의 차이는 무엇인가?
- margin vs padding
- position을 사용하는 방법
- box model이란?
- sass와 css의 차이점

## 인성

- 왜 개발자가 되려고 하는가
- 개발자로서의 본인의 비전을 이야기 해달라
- 비전공자로써 갖고 있는 컴플렉스가 있는가
- 운영체제같은 컴퓨터공학(cs)에 대한 기초지식이 있는가
- 최근에 관심갖거나 공부 하고 싶은 개발 기술은 무엇인가
- 프로젝트 협업 과정을 경험한 적이 있는가
- 공부 방법
  - 개발자가 되기 위해서 어떻게 공부하였는가
  - 학습시 주로 이용하는 웹페이지나, 동영상 강좌 페이지는 어디인가
  - 최근의 읽은 개발 관련 서적은 무엇인가
  - 즐겨 보는 개발 관련 유튜브가 있는가
  - 회사 기술 스택에 맞추어 단기간 내에 언어와 프레임워크를 학습 하여야 할 때, 어떻게 공부하고 해결할 것인가
- 포트폴리오 제작시에 비인기 라이브러리를 사용한 경험이 있는가
- 이러한 비인기 라이브러리에 대한 정보를 어디서 얻는가 왜 활용하였는가
- 본인이 현재 FE를 주제로 발표할만한 것이 있을까?
- 시간이 있다면 FE 향상을 위해서 어떤 노력을 할 것인가?

## 그 외 특이사항

- [프론트엔드 면접 핸드북](https://blog.rhostem.com/posts/2020-04-13-fe-interview-handbook-js-2)

  - attribute와 property
  - 27. 다음의 함수를 구현하기
  - 31. SPA 앱이 무엇인지, 그리고 SEO는 어떻게 해야 하는지
  - 35. 자바스크립트 개발에 어떤 디버깅 툴을 사용하는지?
  - 36. 객체 속성, 배열 항목 반복(iterate)에 어떤 방법을 사용하는가?
  - 37. mutable, immutable 객체의 차이점

- [프론트엔드-개발자-인터뷰-후기-면접-질문](https://velog.io/@tmmoond8/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%9D%B8%ED%84%B0%EB%B7%B0-%ED%9B%84%EA%B8%B0-%EB%A9%B4%EC%A0%91-%EC%A7%88%EB%AC%B8-%EC%A0%95%EB%A6%AC-%EC%9E%91%EC%84%B1-%EC%A4%91)

  - float을 해제하지 않으면 안되는 이유
  - css 애니메이션과 js 애니메이션 차이

- [채용 과정 후기](https://gtedha.github.io/2019/09/12/kakao-recruitment-review-4/)
  - 지원 동기
  - 지금껏 해온 일에 대한 설명 (설계 및 구현 내용에 관하여)
  - 다룰 수 있는 언어의 종류
  - 기존 회사에서 겪었던 문제점들과 해결하려고 시도했던 노력
  - Git 사용 관련
  - OS 관련된 내용
  - 검색 시스템과 관련한 지식

## 참고자료

- [프론트엔드 개발자 면접 질문(기술면접) 정리](https://sunnykim91.tistory.com/121)
- [프론트엔드 면접 질문 모음](https://velog.io/@honeysuckle/%EC%8B%A0%EC%9E%85-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EB%A9%B4%EC%A0%91-%EC%A7%88%EB%AC%B8-%EB%AA%A8%EC%9D%8C)
- ⭐️ [프론트엔드 개발자 기술면접 인터뷰 질문 모음](https://realmojo.tistory.com/300)
- X [프론트엔드 면접 문제 은행](https://h5bp.org/Front-end-Developer-Interview-Questions/translations/korean/)
- X [프론트엔드 인터뷰 핸드북](https://github.com/yangshun/front-end-interview-handbook/tree/master/contents/kr)
- X [프론트엔드 직군 웹개발자 면접질문 모음 답변 달아보기](https://blex.me/@yoyounn18/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%A7%81%EA%B5%B0-%EC%9B%B9%EA%B0%9C%EB%B0%9C%EC%9E%90-%EB%A9%B4%EC%A0%91%EC%A7%88%EB%AC%B8-%EB%AA%A8%EC%9D%8C-%EB%8B%B5%EB%B3%80-%EB%8B%AC%EC%95%84%EB%B3%B4%EA%B8%B0)
- X 1~3년 [프론트 엔드 기술 면접 질문 리스트](https://frontdev.tistory.com/entry/%ED%94%84%EB%A1%A0%ED%8A%B8-%EC%97%94%EB%93%9C-%EA%B8%B0%EC%88%A0-%EB%A9%B4%EC%A0%91-%EC%A7%88%EB%AC%B8-%EB%A6%AC%EC%8A%A4%ED%8A%B8)
- X 이전글이 좋음 [DevOwen의 구직 이야기 Ch4. 기술 인터뷰](https://devowen.com/297)
- X 경험글 [프론트엔드 개발자의 이직, 면접 경험 3](https://medium.com/@deptno/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98-%EC%9D%B4%EC%A7%81-%EB%A9%B4%EC%A0%91-%EA%B2%BD%ED%97%98-3-95a770383dc6)
