# Section 5

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

## Validation && Error

### Error Response

**에러 응답**은 특정 validation 라이브러리를 사용하더라도, 모든 서비스에서 동일한 포맷으로 통일할 필요가 있다.

에러는 validation 뿐만 아니라 다양한데 그런 상황까지 일관적으로 고려되어야함

👍 어떻게? Error에 대한 sub class를 만들어 관리하면 편리하다.

- ```plain
  Error
    |----- RequestValidationError
    |----- DatabaseConnectionError
  ```
