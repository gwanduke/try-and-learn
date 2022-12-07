- [Performance Patterns](#performance-patterns)
  - [Optimize your loading sequence](#optimize-your-loading-sequence)
    - [리소스 로딩 순서 최적화가 어려운 이유](#리소스-로딩-순서-최적화가-어려운-이유)
    - [각 리소스들에 대한 관계, 제약사항 및 우선순위들](#각-리소스들에-대한-관계-제약사항-및-우선순위들)
    - [권장사항과 제약사항](#권장사항과-제약사항)
    - [마무리](#마무리)
  - [Static Import](#static-import)
  - [Dynamic Import](#dynamic-import)
  - [Import On Visibility](#import-on-visibility)
  - [Import On Interaction](#import-on-interaction)
  - [Route Based Splitting](#route-based-splitting)
  - [Bundle Splitting](#bundle-splitting)
  - [PRPL Pattern](#prpl-pattern)
  - [Tree Shaking](#tree-shaking)
  - [Preload](#preload)
  - [Prefetch](#prefetch)
  - [Optimize loading third-parties](#optimize-loading-third-parties)
  - [List Virtualization](#list-virtualization)
  - [Compressing JavaScript](#compressing-javascript)

# Performance Patterns

## Optimize your loading sequence

[Core Web Vitals](https://web.dev/vitals/), [metrics](https://web.dev/metrics/)

### 리소스 로딩 순서 최적화가 어려운 이유

- FCP, LCP, FID 는 순서대로 측정되므로 이 지표를 달성하기 위한 리소스들도 순서대로 제공되어야한다.
- 네트워크(다운로드)/CPU(실행) 가 어느 시점에 놀지 않도록 신경써주기
- third-party 패키지(js)를 사용할 때에도 성능을 고려하는게 좋다.
- [HTTP2의 우선순위 처리?](https://patterns-dev-kr.github.io/performance-patterns/loading-sequence/#http2%EC%9D%98-%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84-%EC%B2%98%EB%A6%AC)
- 리소스 최적화 (압축, css인라인, 이미지 라사이즈 등)
  - 코드 스플릿팅 등을 사용할 수 있음. 이 때 가급적 작게 나누는게 유리하나 너무 잘게나누면 각 조각들의 압축률이 떨어져 성능에 영향줄 수 있음
  - npm 패키지가 esmodule로 번들되어 있지않다면 tree shake 등의 최적화시 제약 있을 수 있음

### 각 리소스들에 대한 관계, 제약사항 및 우선순위들

- [Critical CSS](https://web.dev/extract-critical-css/)는 FCP에 필요한 최소 CSS를 말함
  - 이러한 것들은 HTML 자체에 인라인 되는 것이 유리 (불가능한 경우 preload하는 것도 좋음. 인라인이 너무 많으면 메인 스레드 파싱 시간으로 인해 FCP 영향)
  - CSS의 지연은 FCP, LCP에 영향을 주므로 CSS 로드에는 JS, ATF(Above the fold, 화면 로드시 바로 보이는 부분) 이미지보다 먼저 로드되도록 우선순위를 주어야함
- 폰트
  - 폰트를 위한 CSS도 인라인 되는 것이 좋다.
  - 인라인이 어려운 경우 preconnect 처리하여 로드하자. (외부 도메인의 폰트 로드기 지연되면 FCP에 악영향을 준다.)
  - [Font Fallback](https://css-tricks.com/css-basics-fallback-font-stacks-robust-web-typography/)을 사용해 FCP 방해없이 텍스트가 바로 보이게 할 수 있다. 하지만 이는 CLS를 유발할 수 있음. 또한 레이아웃 변경으로 인해 메인 스레드 작업으로 FID에 안좋을 수 있다.
- ATF 이미지
  - 크기가 명시되어 있어야하며 placeholder를 주면 좋다. (아니라면 CLS)
  - 로드 지연이나 placeholder는 LCP 지연 (이미지 크기가 달라 교체되면 LCP는 다시 트리거)
- BTF 이미지
  - lazyloading 적용 대상
  - 1P JS, 크리티컬 3P 리소스 보다 빨리 로드되면 FID 지연 될 수 있음
- 1P JS
  - ATF이미지 전에 로드, 3P JS보다 먼저 메인스레드에서 실행되어야함
  - 서버 렌더링 환경에서 1P JS는 FCP, LCP를 방해하지 않음
- 3P JS
  - 동기적 3P JS는 FCP 지연, HTML 본문 파싱 지연, 1P 스크립트 실행 지연 -> hydration 지연 -> FID 지연 으로 이어질 수 있음

### 권장사항과 제약사항

정답은 없고 적절한 균형을 찾아 적용하는 것이 중요하다.

상황을 부여한 예시는 [여기 원문](https://www.patterns.dev/posts/loading-sequence/#what-is-the-ideal-loading-sequence)에서 확인하자.

### 마무리

앱 최적화의 의무는 플랫폼을 사용하는 개발자와 플랫폼 자체를 만드는 개발자 모두 가지고 있으므로 함께 문제를 해결해야 한다. 양쪽 모두 리소스 순서를 안과 밖에서 쉽게 지정할 수 있도록 하려고 노력하고 있다. 시도되고 검증된 다양한 사례들에 대한 추천들과 ScriptLoader와 같은 주도권을 갖고 제안하는 사례들은 React-Next.js 스택에서 이상적인 리소스 로딩 순서를 구현할 수 있도록 하고 있다. 이제 우리가 만드는 새로운 앱들이 위의 권장 사항을 준수하는지 확인해 보도록 하자!

## Static Import

## Dynamic Import

## Import On Visibility

## Import On Interaction

## Route Based Splitting

## Bundle Splitting

## PRPL Pattern

## Tree Shaking

## Preload

## Prefetch

## Optimize loading third-parties

## List Virtualization

## Compressing JavaScript
