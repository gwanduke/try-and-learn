# 9. Build an Epic React App

## 들어가며

`aria-label`을 붙이도록 하자

```jsx
<Dialog aria-label="Login Form" />
<Dialog aria-label="Register Form" />
```

로그인 폼을 만들 때 다음 처럼 구성할 수도 있다

```jsx
function LoginForm({ onSubmit, buttonText }) {
  function handleSubmit(e) {
    e.preventDefault();
    const { username, password } = e.target.elements;

    onSubmit({ username: useranme.value, password: password.value });
  }

  return <form>...</form>;
}
```

## 2. Style React Components

There are a lot of benefits to this approach which you can learn about from

- [A Unified Styling Language](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660)
- [Maintainable CSS in React](https://www.youtube.com/watch?v=3-4KsXPO2Q4&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)

로딩 스피너에 `aria-label: loading`을 주면 좋겠다.

## 5. **[Make HTTP Requests](https://epicreact.dev/modules/build-an-epic-react-app/make-http-requests-intro)**

- useAsync 훅을 공부하자 (어떻게 구현되는지)

## 6. Authentication

- useAsync 구현방법만 알아두면 되겠다.
- token API 호출시 인증 토큰은 어디에 저장되는가?
- 401 일 때

  ```jsx
  // in window.fetch client
  await auth.logout;
  window.location.assign(window.location); // 리프레쉬!
  return Promise.reject(error);
  ```

- header
  - body 데이터를 JSON.stringify 해주는 동시에 Content-Type을 application/json 으로 명시해주자
- useMatch() hooks를 이용하면, hooks에 전달한 주소와 현 pathname이 매치되는지 확인할 수 있다.
-

## 7. Routing

- 특별히 배운 내용은 없었음
- SEO 문제 때문에 301, 302 응답을 주는게 좋다
  - CRA의 setupProxy → express 로컬 서버를 설정함
  - serve.json 에서 redirects 설정 (for Serve)
  - \_redirects 설정 (for Netlify)
  - ⇒ 사실 이 모든걸 서버에서 해주어야함

## 8. Cache Management

- 이슈는 오버 엔지니어링, 이른 추상화, 상태의 적절한 카테고라이징 부족 등의 이유로 어려워진다
- 상태는 다음 두가지로 나눌 수 있음
  - UI State: modal 오픈 상태, 아이템 하이라이트 상태 등...
  - 서버 캐시: 사용자 데이터, 트윗, 연락처 등...
- 서버캐시를 적절히 나눌 수 있으면 좋을 것이다.
- 클라이언트에서 적절하게 관리할 방법중 하나는 `react-query`를 사용하는 것.
- useMutation 사용시, 기존 캐시를 invalidate 시킬 수 있는 방법이 있다(`invalidateQueries`)
- 로그아(or 401)웃시에는 쿼리캐시도 클리어 해주자
- 전역적으로 쿼리 fetch시 일어나는 에러를 제어할 수 있다.

  (retry 횟수 제어, 윈도우 다시 포커스 되었을 때 다시 fetch를 수행할지 등)

  ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2152c305-ec39-4988-9085-9c0d0b0997c6/Screen_Shot_2020-11-26_at_5.30.06.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2152c305-ec39-4988-9085-9c0d0b0997c6/Screen_Shot_2020-11-26_at_5.30.06.png)

- queryCache.prefetchQuery 를 사용하면, 리스트 변경에 대한 새로운 리스트를 미리 준비할 수있다.
- 리스트에서 아이템을 받아와쓸 때, 각 아이템에 대한 캐시를 따로 처리해줄 수 있따. ⇒ ONSuccess config 이용
- 에러가 났을 때 클라이언트단에서 아는 최신 상태로 만들었다가, 서버 요청에 실패하는 경우, 이전 상태로 캐시를 돌리도록 처리할 수 있다. `onError` → recover()
  - recover는 onMutate에서 반환 해준 값
- ***

  ***

```jsx
return Promise.reject(data);
```

### 로그인

- [ ] [https://kentcdodds.com/blog/authentication-in-react-applications](https://kentcdodds.com/blog/authentication-in-react-applications)

### 라우팅

- [ ] [https://tylermcginnis.com/build-your-own-react-router-v4/](https://tylermcginnis.com/build-your-own-react-router-v4/)

- setupProxy?

  - ⇒ 내부적으로 express를 사용하는가 본데, app을 세팅해서 export하면 덮어씌워짐
  - http://expressjs.com/en/4x/api.html#app.get.method
  - http://expressjs.com/en/4x/api.html#res.redirect

- serve

  - [https://github.com/zeit/serve-handler/tree/ce35fcd4e1c67356348f4735eed88fb084af9b43#redirects-array](https://github.com/zeit/serve-handler/tree/ce35fcd4e1c67356348f4735eed88fb084af9b43#redirects-array)

-
