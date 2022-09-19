# Rendering Patterns

- https://www.patterns.dev/posts/rendering-introduction/
- [ ] https://web.dev/rendering-on-the-web/

## Web Vitals

- TTFB (Time To First Byte): 클라이언트가 페이지 컨텐츠의 첫 바이트를 받는데 걸리는 시간
- FCP (First Contentful Paint): 네비게이션 이후 브라우저가 첫번째 컨텐츠 조각을 그리는데 걸리는 시간
- LCP (Largest Contentful Paint): 페이지의 메인 컨텐츠를 로드하고 그리는데 걸리는 시간
- TTI (Time To Interactive)
- Cumulative Layout Shift (CLS): 시각적 안정성을 측정 (예상하지못한 레이아웃 이동을 피하기 위함)
- First Input Delay (FID)

## Static Rendering

- 빌드타임에 HTML 생성
- CDN이나 Edge Network를 통해 쉽게 캐시될 수 있음

### Plain Static Rendering

이미 생성되어 캐시된 HTML을 사용하므로 TTFB가 매우 빠르고 FCP, LCP도 좋음. 전체적인 Web Vitals가 좋게 나타나지만 dynamic한 페이지를 처리하는데는 어려울 수 있다.

- Web Vitals 발생 순서
  - TTFB
  - FCP, LCP
  - TTI

### Static with Client-Side fetch

- 페이지 로드시마다 데이터가 최신화 되어야하는 경우
- 안정적인 placeholder 컴포넌트가 필요한 경우
- Web Vitals 발생 순서
  - TTFB
  - FCP (페이지 로드 이후 표시)
  - LCP (API 호출 이후 표시)
- API 호출 이후 렌더링이 추가적으로 일어나므로 CLS 발생 가능성 있음 (스켈레톤과 컨텐츠 사이즈 맞지 않음 등으로)

### Static with `getStaticProps`

- 빌드 타임에 이용가능한 데이터를 포함함 (그래서 사용자 특화되지 못하며, 캐시 가능)
- Web Vitals 발생 순서
  - TTFB
  - FCP, LCP
  - TTI
- Plain Static Rendering에 비교하여 빌드타임이 조금 더 걸리는 점 외에는 크게 다르지 않음
  - 외부 API를 사용하는 경우 요금이 더 나오거나 request limit에 걸릴 수 있음

### Incremental Static Regeneration (ISR)

- 주기적으로 또는 on-demand한 방법으로 최신화
- 사용자 특화되지 못함
- pre-render할 페이지가 많은 경우 적합
- 글로벌 캐시 가능 (인터벌을 두고 지정한 캐시 시간이 지난경우 일단 stale 페이지를 제공하고 백그라운드에서 edge에 다시 빌드해 캐시하도록 처리할 수도 있다.) -> 특정 시간마다 다시 생성하기에 서버 비용이 더 많이 일어날 수있다. 이는 아래에 있는 On-demand ISR 에서 이벤트 기반으로 개선가능하다.
- 사용자 요청을 받은 Edge만 업데이트 됨

### On-demand Incremental Static Regeneration

- 특정 이벤트에 의해 다시 생성되어야하는 경우 적합
- use-specific 하지 않음
- 글로벌 캐시 가능
- 이벤트가 발생하면 모든 엣지에 re-validate 처리
- 모든 면에서 우수! (하지만 다음 케이스에는 사용이 불가핟. highly dynamic, personalized pages that are different for every user)

## Server Side Rendering (SSR)

이런 접근 방식은 개인화 데이터가 많을 때 또는 인증 상태에 따라 render-blocking이 있을 때 적합하다.

- 모든 요청에대해 HTML을 다시 렌더링한다. (`getServerSideProps`는 모든 요청에 수행됨)
- 반환된 컨텐츠는 항상 유니크하다.
- Web Vitals 발생 순서
  - TTFB (서버에서 페이지를 생성해야하므로 좀 늦음)
  - LCP, FCP
  - TTI
  - CLS는 초기 페이지 로딩 후 다이나믹 컨텐츠가 없다면 거의 없는 편

Web Vitals를 `getStaticProps`와 비교하면 `getStaticProps`가 빌드타임에 컨텐츠 API를 요청해 페이지를 생성하기에 TTFB가 빠른점 외에는 패턴이 비슷하다. `getServerSideProps`는 요청시에 컨텐츠 API를 요청해 페이지를 생성한다.

### SSR 성능을 향상시킬 방법

- `getServerSideProps` 의 실행시간을 짧게
- database를 serverless function과 동일한 리전에 배치 (쿼리 속도 향상)
  - serverless function은 비용이 적게들지만 cold boot라 불리는 start up 시간이 걸릴 수 있다. 데이터베이스로의 커넥션이 느릴 수 있다.
  - 또한 물리적으로 거리가 먼(다른 리전의) serverless function을 호출하지 말아야할 것이다.
- 응답에 `Cache-control` 헤더 추가
- Upgrade server hardware

## Edge SSR + HTTP Streaming

(Streaming SSR + React Server Components)

- Zero client-side JavaScript needed
- Render React components on the server
- Combine a static page with dynamic components

다음에 적합:

- 많은 디펜던시를 갖는 컴포넌트
- 요청 기반 데이터를 요구하는 컴포넌트

많은 디펜던시가 필요한 리액트 컴포넌트를 서버에서 일부 렌더링하고 해당 디펜던시는 클라이언트로 전달되어 그려질 필요가 없어지게 됨. 그래서 한페이지를 로드하더라도 사용자에게 다이나믹하게 보여지는 부분만 서버에서 렌더하고 나머지는 클라부분에서 렌더링할 수도 있다.

---

---

- [ ] [Hydration?](https://blog.somewhatabstract.com/2020/03/16/hydration-and-server-side-rendering/)
- [ ] [Rendering on the web](https://www.youtube.com/watch?v=k-A2VfuUROg)
- [ ] [Nextjs SSR Fetching and Hydrating](https://medium.com/swlh/fetching-and-hydrating-a-next-js-app-using-getserversideprops-and-getstaticprops-65bfe42afed8)
- [ ] [SSR Using Pure React.js](https://www.digitalocean.com/community/tutorials/react-server-side-rendering)
- [ ] [Next.js: Server-side Rendering vs. Static Generation](https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation)
- [ ] [stale-while-revalidate](https://web.dev/stale-while-revalidate/)

https://www.patterns.dev/posts/progressive-hydration/ ~ 쭉 다시 읽어보기
