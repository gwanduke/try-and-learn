# 브라우저는 어떻게 렌더링되는가?

브라우저는 어떻게 문서를 해석하고 그리는 것일까? 웹 개발자라면 충분히 잘 알아야
할 주제이다. 매우 세부적인 내용은 모르더라도 대략적인 흐름과 조심해야할 구간들을
알면 성능적인 부분들을 위해 피해야할 것을 파악하고 개발할 수 있을 것이다.

## Browser 그리고 엔진

각 브라우저들은 각각 다른 엔진을 사용하고 있다. 그래서 렌더링 과정에 약간의 차이
가 있는데 대략적인 흐름은 비슷하다. 아래는 2020년 1월 기준 사용 중인 엔진이다. (
[출처 링크](https://stackoverflow.com/questions/3468154/what-is-webkit-and-how-is-it-related-to-css/3468311#3468311))

- 인터넷 익스플로러: Trident
- 인터넷 익스플로러(엣지): Blink
- 파이어폭스: Gecko
- 사파리: WebKit
- 크롬:Blink
  ([크롬은 왜 Blink를 선택했는가?](https://blog.chromium.org/2013/04/blink-rendering-engine-for-chromium.html))

## 브라우저의 렌더링 과정

브라우저가 HTML 문서를 요청하면 .html 파일은 byte 코드 형태로 전송되어 브라우저
에서 Character로 변환된다. 즉 사람이 읽을 수 있는 문서 형태로 변환이 되는데, 여
기서 끝이 아니라 토큰을 구분하고 노드를 생성한다. 노드라 하면 각 토큰을 나타내는
Object라 볼 수 있는데, 이렇게 생성된 각 노드를 부모-자식 관계로 연결지으면 DOM
(Document Object Model)이 완성된다.

일반적으로 CSS 파일은 HTML 내에 `<link />` 태그를 통해 지정될 것이다. DOM을 생성
하는 중에 이 태그를 만나면 브라우저는 외부 리소스인 경우 브라우저 백그라운드에서
리소스를 다운로드한다. (메인스레드에서 수행되는 것이 아니다)

하지만 `<script />` 태그는 메인스레드를 블락한하고 DOM parsing를 중단시킨다.
embedded 스크립트는 스크립트 실행이 끝날 때 까지 DOM parsing을 중단시키며 외부리
소스인 경우에는 다운로드가 끝나고 스크립트를 메인스레드에서 모두 실행시킬 때까지
DOM parsing을 중단시킨다. 이는 의도된 동작이며 JavaScript에서 DOM에 대한 조작을
할 가능성이 있기 때문에 병렬로 실행하지 않는 것이다. 하지만 다운로드하는 동안 메
인 스레드를 중단시키는 것은 대부분의 경우에 불필요 하기 때문에 script 태그에
async를 붙여 DOM parsing이 중단되지 않도록 할 수 있다. 하지만 일단 다운로드되면
그 시점에 DOM parsing을 중단시키고 스크립트는 실행된다. 또는 defer 속성을사용할
수 있는데, 이는 DOM Parsing이 완전히 끝나 DOM tree가 완성되면 실행된다. 또한
HTML document에 보여지는 순서대로 실행된다.

CSS는 DOM Parsing을 중단시키지 않을 것같지만, 실제로는 중단이 일어날 수 있다. 이
는 DOM과 CSSOM을 만드는게 둘다 메인스레드에서 동시에 일어나고 결국에는 이 두 정
보로 Render Tree를 구성해야하기 때문이다. DOM tree를 만드는데에는 HTML을 읽어가
면서 차근차근(incremental) DOM 엘리먼트를 트리에 추가하며 구성한다. 반면에 CSSOM
생성은 점진적이지 않고 구체적인 방법으로 일어난다.

브라우저가 style 블록을 찾으면, 엠베딩된 CSS를 파싱하고 CSSOM 트리를 새로운 CSS
규칙으로 업데이트한다. 이게 끝나면 HTML을 일반적인 방법으로 파싱해 인라인 스타일
링에 대해서도 동일하게 처리한다.

하지만 외부 스타일시트를 만나면 얘기가 달라지는데, 브라우저가 CSSOM을 점진적으로
구성할 수가 없는게 CSS 룰에 의해 마지막 파일이 이전의 CSS 파일의 규칙을 override
할 수 있기 때문이다. 그래서 점진적으로 업데이트하면 사용자는 여러 Render Tree가
구성됨으로 인해 화면이 변화하는 나쁜 경험을 하게 될 것이다. 근본적인 이유는 CSS
가 cascading이기 때문이다. 그래서 브라우저는 외부 CSS 파일을 점진적으로 처리하지
않고 CSSOM 트리 업데이트는 스타일 시트의 모든 CSS rule이 처리되고 일어난다. 그리
고 나서 Render Tree가 업데이트 되어 스크린으로 반영된다.

결국 CSS는 렌더-블락킹 리소스이다. 일단 CSS 리소스가 요청되면 Render Tree 생성이
중단된다. 그러므로 Critical Rendering Path (CRP)도 막히게된다. 하지만 DOM tree는
계속 생성되고 있으며 css 다운로드도 백그라운드에서 계속 진행 중이다.

만약 브라우저가 이전 상태의 CSSOM을 사용해 Render Tree를 구성하고 페인트를 한다
면, CSS가 다운로드되고 CSSOM이 업데이트되면 Render Tree가 재구성되면서 새로운 스
타일로 repaint될 것이다. 그럼 Flash of Unstyled Content (FOUC)를 유발할 수 있으
며 이는 사용자 경험을 크게 해친다.

위와 같은 이유로 브라우저는 스타일시트가 로딩되고 파싱되기를 기다린다. 그래서
stylesheet는 가능한 빨리 head 섹션에서 로드하는 것을 추천한다.

CSS 다운로드와 JS 다운로드가 경합해 JS 다운로드가 먼저 일어나면 잘못된 CSSOM을참
조해 JS에서 처리할 가능성이 있으므로, HTML5 명세에서는 script를 다운로드하지만
css가 모두 처리되기 전까지 실행하지 않는다. 이를 script-blocking css or
script-blocking stylesheet라 부른다.

## 용어정리

- CRP - Critical Rendering Path

## 참고자료

간략하게 필수적인 내용들만 알아보았는데, 아래 두개 글은 정독해 읽어보길 추천한다

- medium.com/jspoint/how-the-browser-renders-a-web-page-dom-cssom-and-rendering-df10531c9969
- blog.logrocket.com/how-browser-rendering-works-behind-the-scenes-6782b0e8fb10/
- developers.google.com/web/updates/2018/09/inside-browser-part3

시간이 허락한다면 이 글도 좋다.

- 한국어: d2.naver.com/helloworld/59361
- 원문: www.html5rocks.com/en/tutorials/internals/howbrowserswork/
