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
