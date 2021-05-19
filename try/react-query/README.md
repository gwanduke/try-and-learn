# React Query

- Queries: 특정 키에 대한 값들을 fetch
- Mutations: CUD 작업
- Query Invalidation: 특정 키에 대한 값들을 무효화하고 refetch

## [React Query: It’s Time to Break up with your "Global State”!](https://youtu.be/seU46c6Jz7E)

### Global State

전역 상태는

- prop drilling을 피한다
- 복사되지 않고, 접근된다.
- 공유되는 커뮤니케이션
- 더 생산적이다
- 작업이 적다

다음으로 분류할 수 있다.

- 앱 상태
- 서버 상태

`비동기 데이터`는 다음 이유로 `클라이언트 상태`와 동일하지 않다.

- 어디에 저장되는지
- 접근의 속도
- 어떻게 데이터에 접근되는지
- 누가 변화를 만들 수 있는지

이를 정확하게 구분하기 위해서 다음 두가지 용어로 정리한다.

- 서버 상태
  - remotely persisted
  - asynchronous
  - shared ownership - 서버와 다른 클라이언트에 의해 수정될 수 있음
  - potentially out-of-date
- 클라이언트 상태
  - non-persistent
  - synchronous
  - client-owned
  - reliably up-to-date

### 서버 상태의 도전과제

- 캐싱
- deduping requests
- background updates
- outdated requests
- mutations
- pagination/incremental
- gc/memory

## [All About React Query (with Tanner Linsley) — Learn With Jason](https://youtu.be/DocXo3gqGdI)

- 기본적으로 브라우저에 다시 focus 될 때, 쿼리를 재 수행해 업데이트된다.
- 낙관적 업데이트 수행이 가능하다.
- queryCache를 조회하거나 조작할 수 있다.

등의 내용을 다루지만 API를 이해하는 것외에 특별한 스킬은 없다.

여기서 알 수 있는 ReactQuery의 주요 특징은, 데이터를 동기화(최신상태로 유지)하는데 도움을 줄 수 있다는 것이다.

## [React-Query Tutorial - FORGET ABOUT useEffect](https://youtu.be/GE-waX4jmdA)

> 자기전에 들을거임! 2021.02.09 (화)

## Docs - Guides & Concepts

### Queries

- useQuery에 제공되는 함수는 Promise를 반환하며 데이터를 resolve하거나, error를 throw 해야함
- 반환되는 플래그
  - status (loading, error, success, idle)
  - isLoading: 현재 데이터가 없고 fetching 중
  - isError: 쿼리가 성공적으로 이루어졌고 데이터가 이용가능한 상태
  - isSuccess: 쿼리가 성공적으로 이루어졌고 데이터가 이용가능한 상태
  - isIdle: 쿼리가 비활성화 상태
- 반환되는 상태
  - error: isError === true 일 때 반환
  - data: success 상태에 반환
  - 어떤 상태든지 간에 데이터를 가져오는 중이면 `isFetching`은 true로 설정됨

### Query Keys

쿼리키 기반으로 캐싱을 진행하며 키는 `string`, `array` or `nested object` 모두 지원된다. 지켜주어야할 것은 serializable 해야하고 데이터에 대해 유일해야한다는 것이다.

> - array는 순서가 중요하지만, object에서 키의 순서는 중요하지 않음
> - 함수가 변수에 의존한다면, 쿼리키로 포함하는 것이 권장됨 (내 생각엔 필수라고 생각됨) `id` 같은 것들

### Query Functions

- 데이터는 `resolve` 되어야하며,
- 에러는 반드시 **throw** 되어야함

시그니쳐는 `useQuery({ queryKey: ..., queryFn: ..., ...config })` 또는 `useQuery(key, fetchFunc)` 를 이용할 수 있다.

---

https://react-query.tanstack.com/guides/parallel-queries 부터 다시 보기

## 참고자료

> 아래 내용들은 모두 정독하였음

- https://maxkim-j.github.io/posts/react-query-preview
- https://blog.rhostem.com/posts/2021-02-01T00:00:00.000Z
  - https://medium.com/@dtinth/immutable-js-persistent-data-structures-and-structural-sharing-6d163fbd73d2
- https://merrily-code.tistory.com/76
- https://dev.to/otamnitram/react-query-a-practical-example-167j
- https://tkdodo.eu/blog/practical-react-query
