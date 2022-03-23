# Window API

## open()

`window.open(url, name, params)` => returns popup window ref (onload 이벤트, href 등 조작가능)

새로운 창이 미처 로드 되지 않은 경우 URL은 `about:blank`로 평가됨

- same origin policy가 적용된다. (the same protocol://domain:port) [더 궁금하면 여기를..](https://javascript.info/cross-window-communication)

- name: 각 윈도우는 `window.name` 프로퍼티를 가지며 동일한 이름의 window가 있는 경우 해당 윈도우로 열린다.
- params 로는 툴바/메뉴바/리사이즈가능여부/스크롤바여부/크기 등을 결정한다. (-위치, 0크기 등의 이상한 값으로 하면 브라우저 기본값으로 처리됨)
- params의 특정값이 생략되는경우 다음 룰로 처리됨
  - If there is no 3rd argument in the open call, or it is empty, then the default window pa-rameters are used.
  - If there is a string of params, but some yes/no features are omitted, then the omitted features assumed to have no value. So if you specify params, make sure you explicitly set all required features to yes.
  - If there is no left/top in params, then the browser tries to open a new window near the last opened window.
  - If there is no width/height, then the new window will be the same size as the last opened.

열린 팝업에서는 열어준 윈도우를 window.opener로 참조가능하며 통신은 bidirectional하다.

- win.close()
- win.closed 로 닫혔는지 확인 가능

...

- Moving and resizing (팝업에서만 가능하며, 최소화/최대화는 불가)
- Scrolling a window [더보기](https://javascript.info/size-and-scroll-window)
- focus/blur on window
  - `window.onblur = () => window.focus();`와 같은 미친코드 때문에 일부 제한된다. (브라우저마다 정책다름)
    - 모바일 브라우저에서는 window.focus() 를 완전히 무시한다.
    - 그럼에도 새로운 창을 띄우고 focus를 해주거나, onfocus/onblur로 사용자가 웹페이지를 떠낫는지 확인하는 것은 좋은 사례이다. (하지만 blur인 상태라도 사용자에게 창 내용이 보여질 순있다.)

popup은 매우 드물게 사용되며, 이보다는 로딩후 한페이지에서 보여주거나 iframe에서 보여주는편이 선호된다.

## close()

현재 창을 닫거나, 호출했던 윈도우를 닫는다.

다음을 통해 열린 페이지만 close 가능

- window.open() 함수를 통해 진입한 페이지
- link(a 태그)를 통해 열린 페이지

아이프레임의 window, HTMLIFrameElement.contentWindow 에는 먹히지 않는다.
`var x = document.getElementsByTagName("iframe")[0].contentWindow;`

편법

```js
window.open("", "_self").close();
// 출처: https://7942yongdae.tistory.com/76 [프로그래머 YD]
```

```js
let myWindow;
function openWin() {
  myWindow = window.open(
    "https://www.w3schools.com",
    "_blank",
    "width=200, height=100"
  );
}

// 새로 열린 창을 닫는다.
function closeWin() {
  myWindow.close();
}
```

- https://javascript.info/popup-windows

popup이 여전히 쓰이는 이유

- A popup is a separate window which has its own independent JavaScript environment. So opening a popup from a third-party, non-trusted site is safe.
- It’s very easy to open a popup.
- A popup can navigate (change URL) and send messages to the opener window.

팝업을 마구띄우는 나쁜 사이트들 때문에 브라우저에는 다음과 같은 조치가 되어있다.

```js
// popup blocked
window.open("https://javascript.info");

// popup allowed
button.onclick = () => {
  window.open("https://javascript.info");
};
```

```js
// open after 3 seconds // 성공: 크롬 / 실패: 파이어폭스
setTimeout(() => window.open("http://google.com"), 3000);

// open after 1 seconds // 성공: 크롬, 파이어폭스
setTimeout(() => window.open("http://google.com"), 1000);

// => 파폭은 2000ms 내에 이루어져야 믿을 수 있는 것으로 간주함.
```
