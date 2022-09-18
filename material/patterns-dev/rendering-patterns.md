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

### Incremental Static Regeneration

- 주기적으로 또는 on-demand한 방법으로 최신화
- 사용자 특화되지 못함
- pre-render할 페이지가 많은 경우 적합

### On-demand Incremental Static Regeneration

- 특정 이벤트에 의해 다시 생성되어야하는 경우 적합
