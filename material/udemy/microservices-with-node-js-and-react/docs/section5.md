# Section 5

Section 4에 오기까지... 이런 단점들이 있었다.

- 중복 코드가 많다 => npm 모듈을 만들고 프로젝트간 공유
- 서비스간 이벤트 흐름을 파악하기 힘들다 => event를 정의하는 공유 라이브러리 작성
- 각 이벤트가 어떤 프로퍼티를 가지는지 기억하기 쉽지 않다 => TypeScript
- 몇몇 이벤트 흐름을 테스트하기 어렵다. => 가능한 많이 테스트를 작성
- 쿠버네틱스 같은걸 돌리면서 내 기기가 렉걸림... => k8s를 클라우드에서 돌리자
- 이벤트의 순서가 보장되지 않는 케이스 등의 경우에 어떻게 처리할 것인가? => concurrency issue를 다루는 코드를 작성

이제 티케팅앱을 만들면서 문제를 해결해볼 것이다.

## App Overview

- 사용자는이벤트에 대한 티켓 리스팅을 판매할 수 있다.
- 다른 사용자는 이 티켓을 살 수 있다.
- 어떤 사용자든간에 티켓 리스팅을 하고 구매할 수 있다
- 사용자가 티켓 구매를 시도할 때, 티켓은 15분간 locked된다. 사용자는 15분간 지불정보를 입력해야한다.
- locked된 동안, 어떤 사용자도 그 티켓을 살 수 없다. 15분이 지나면 unlock되어야한다.
- 티켓 가격은 unlock 상태에만 수정될 수 있다.

### Resources

- User
- Ticket
- Order
- Charge

### Services

- auth (mongodb)
- tickets: 티켓이 업데이트 가능한지 여부를 앎 (mongodb)
- orders (mongodb)
- expiration: 15분 후 취소시키는 서비스 (mongodb)
- payments: 카드 지불 핸들링. 지불 실패시 주문 취소. (redis)

서비스를 리소스별로 나누었는데, 피쳐별로 나누는게 더 나을 수도 있음. 이는 use case, 리소스 수, 리소스의 비지니스로직에 따라 다름

### Events

- User
  - UserCreated
  - UserUpdated
- Order
  - OrderCreated
  - OrderCancelled
  - OrderExpired
- Ticket
  - TicketCreated
  - TicketUpdated
- Charge
  - ChargeCreated

## Auth Service

- POST /api/users/signup
- POST /api/users/signin
- POST /api/users/signout
- GET /api/users/currentuser

## Infra 준비

외부에서 k8s cluster로 통신하려면 Node Port 또는 ingress 서비스가 필요하다. ingress를 이용하면 Nginx에 라우팅 룰을 정의하고 각 서비스로 라우팅할 수 있다.

skaffold (변경사항 감지. Deployment 업데이트), ingress를 설정해주자
