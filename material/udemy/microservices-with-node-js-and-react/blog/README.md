# Microservice App - Blog

Event Bus를 이용한 간단한 마이크로서비스 앱을 구성해보았다.

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

## Event Bus 만들기

- RabbitMQ, kafka, nats 등의 구현체가 있음
- 이벤트를 받고, 리스너들에게 발행함
- 솔루션에 따라 제공하는 기능이나 복잡도가 다르므로 비교해보고 선택해야함

지금부터 직접 만드는 Event Bus는 복잡도가 낮고 대중적인 솔루션이 갖춘 기능을 개발하지 않을 것임

- 오직 들어온 요청을 등록된 서버들의 `POST /events`로 다시 전달하는 역할만함 (이벤트를 보낸 서비스를 포함해)

## Add moderation service

moderation은 코멘트를 approve, reject, pending할지 결정하는 서비스

### Option 1 - Moderation communicates event creation to query service

CommentCreated 이벤트를 `Moderation Service`에서 처리하고, 여기서만 CommentModerated 이벤트를 발생시킴

- 예제 services
  - Comments Service | (create `CommentCreated`)
  - Moderation Service | (accept `CommentCreated`, create `CommentModerated`)
  - Query Service | (accept `CommentModerated`)
- 단점
  - QueryService 까지 도달하는데 시간이 지연되어 응답시간이 지연됨
  - 만약 Moderation Service에서 확인이 지연되어 이벤트를 발생시키지 않는 경우, QueryService에서 메시지를 확인할 수 없게됨

### Option 2 - Moderation updates status at both comments and query services

QueryService에서 `CommentCreated`를 먼저 받고 나중에 `CommentModerated`가 들어오면 status만 'approved', 'rejected' 등으로 변경하는 방식

언뜻 보기에 이상적으로 보이지만, real world에서는 `CommentModerated` 뿐만 아니라 `CommentVoted`, `CommentPromoted` 등의 다양한 이벤트가 발생할 수 있다. 그럼 이에 대한 업데이트 로직을 `Query Service`에서 가지게되는데 이 서비스는 Presentation을 담당해 비지니스로직이 가능한 없는 것이 이상적이라 이 옵션도 완벽하진 않다.

### 👍 Option 3 - Query Service only listens for 'update' events

Comment Service에서 다양한 타입에 대한 처리를 하고, 최종적으로 `CommentUpdated` 이벤트만 발생시키는 방식

Query Service는 이 `CommentUpdated`에 지정된 프로퍼티로 업데이트만 수행한다.

즉, 비니지스 로직은 가능한 한곳에 집중한다.

## 처리되지 못한 메시지 처리하기 (장애등으로)

### Option 1 - Sync Requests

Query Service에서 Posts와 Comments에 모든 내용을 달라고해서 Sync를 맞추는 방법

- 단점
  - 모든 데이터를 제공하는 end point를 다른 서비스에서 제공하지 않은 경우 불가능

### Option 2 - Direct DB Access

다른 서비스의 데이터베이스에 직접 접근해 데이터를 동기화

- 단점
  - 각각 서비스의 DB타입이 다른경우 각기 다른 방법을 고려해야함

### 👍 Option 3 - Store Events

이벤트를 순차적으로 다 저장하는 방법.

그러면 down time가졌던 Query Service에서 저장된 이벤트를 순차적으로 처리하면된다.

- 장점
  - 추가적인 sync 로직을 작성할 필요가 없다.
