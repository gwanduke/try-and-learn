# Microservice App - Blog

## 어떻게 하위 리소스를 가져올까?

`GET /posts?comments=true`

### Solution 1. Sync communication

`Post Service`에서 `Comments Service`로 IDs 전달해 직접 요청 (앞서 공부했던 단점들이 발생함)

### Solution 2. Async communication

리소스 생성/수정시 EventBus에 큐잉하고, 새로운 `Query Service`에서 처리

- QnA
  - 데이터 join을 수행하기 위해서 매번 새로운 서비스를 만들어야하나요?
    - No. 실세계에서는 포스트와 코멘트 정도의 레벨로 서비스를 나누지 않을 것임
  - 서비스가 독립적임을 누가 신경쓰나요?
    - 독립 서비스 + 안정성은 마이크로서비스가 탄생한 주요 배경중 하나이다.
  - 가지는 이득에 비해 할일이 많다.
    - 처음엔 그렇지만 기능이 추가되어가면서 그렇지 않을 것이다.
  - 어떤 시나리오에서는 동작하지 않는데요..?
    - 이 디자인에서 고려해야할 사항들이 있다. 곧 배우게 될 것
