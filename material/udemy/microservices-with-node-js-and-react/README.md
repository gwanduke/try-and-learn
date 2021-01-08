# Microservices with Node JS and React

## 섹션 1:Fundamental Ideas Around Microservices

### Microservice가 뭔가?

- Monolith Service
  - 하나의 서비스는 Routing, Middleware, Business Logic, DB access를 앱의 **모든** 기능 구현을 위해 가지고 있다.
- Micro Service
  - 하나의 마이크로 서비스는 Rousing, Middleware, Business Logic, DB access를 앱의 **하나**의 기능 구현을 위해 가지고 있다.
  - (하나의 기능 구현에 필요한 코드만 가지고 있다)
  - 심지어 DB까지 따로 가지는 경우도 있음
  - 다른 서비스가 고장나도 독립적으로 움직이기에 비교적 안정적임

#### 특징

- 서비스간 데이터 관리(management)가 어려움
- 다른 서비스의 데이터베이스에 직접 접근하지 않도록 해야함
  - why? => database-per-service pattern
  - 다른 서비스에 독립적으로 서비스를 운영하고 싶음
  - 데이터베이스 스키마/구조는 뜻하지 않게 변경될 수 있음
  - 몇몇 서비스는 DB 종류에 따라 효율적으로 동작할 수도 있음 (sql, nosql...)

#### 다른 서비스의 Data를 가져오려면?

여러 서비스의 Data가 필요할 수도 있는데 그 전략은 두가지로 나눌 수 있다.

- 서비스간 커뮤니테이션 전략
  - Sync: 서비스간에 **직접 요청**을 통해 통신
  - Async: 서비스간에 **이벤트**를 사용해 통신 (`Event Bus` 활용)
    - 1. Event Bus에서 각 서비스로 분배됨. 요청/응답이 모두 Event Bus를 통해 일어나는 방법
    - 2. 새로운 통합 서비스는 자체 캐싱DB를 가지고 유저 생성, 정보 업데이트 등의 이벤트가 Event Bus에 오면 이를 받아 필요한 정보를 기록함. 그 후 조회는 DB에서 행행

| Sync                                                 | Async (1) | Async (2)                                      |
| ---------------------------------------------------- | --------- | ---------------------------------------------- |
| ✅ 이해하기 쉽다                                     | 🤮        | 🤮                                             |
| ✅ 추가적인 데이터베이스가 필요없다                  | ✅        | 🤮 추가적인 DB가 필요하고 데이터 중복이 일어남 |
| 🤮 서비스간 의존성이 추가로 생김                     | 🤮        | ✅ 다른 서비스가 죽어도 독립적으로 운영        |
| 🤮 서비스간 한 요청이 실패하면 전체 요청이 실패함    | 🤮        | ✅ App+DB만 살아있으면 됨                      |
| 🤮 요청 속도가 가장 느린 내부 요청에 좌우될 수 있다  | 🤮        | ✅ 자체 DB만 조회하므로 굉장히 빠름            |
| 🤮 요청 거미줄을 쉽게 만들 수 있다 (의존성 복잡해짐) | 🤮        | ✅ 의존성 없음                                 |

(\* 현대적인 클라우드 환경에서 DB 중복으로인한 데이터 **비용**은 생각보다 크지 않다. 그 보다는 다른 부분이 더 큰 문제)

## 섹션 2:A Mini-Microservices App

간단한 마이크로서비스 만들어보기 - [Microservice App - Blog](./blog);

## 섹션 3:Running Services with Docker

- docker
  - docker는 컨테이너의 개념이 있다.
  - 컨테이너는 **환경구성** + **앱 시작방법**(yarn start) 을 동시에 해결해준다.
- k8s
  - 다른 컨테이너 묶음을 실행하는 툴
  - 컨테이너가 실행되고 **어떻게 서로 상호작용하는지** 설정할 수 있다.
  - k8s cluster는 Master와 Node가 존재함
    - Master: cluster안의 프로그램을 관리 (config file에 명시된 사항을 따라서)
    - Node: 가상 머신
  - k8s에서 요청을 알맞은 컨테이너로 포워딩할 수 있다.
- Dockerfile

  ```dockerfile
  FROM node:alpine
  WORKDIR /app

  # 파일 복사
  COPY package.json ./
  RUN npm install

  # 모든 소스코드 복사
  COPY ./ ./

  # 컨테이너 시작시 실행할 명령
  CMD ["npm", "start"]
  ```

- docker 명령어
  - `docker build -t gwanduke/posts .`: dockerfile에 기반해 이미지 build. gwanduke/posts로 tag
  - `docker run [imageID or imageTag]`
  - `docker run -it [imageID or imageTag] [cmd]`: container를 만들고 시작, 그리고 기본 커맨트를 오버라이드
  - `docker ps`
  - `docker exec -it [containerID] [cmd]`: 실행되는 컨테이너에 주어진 명령 실행
  - `docker logs [containerID]`: 주어진 컨테이너의 로그 출력

## 섹션 4:Orchestrating Collections of Services with Kubernetes

[Section 4](./docs/section4.md)

## 섹션 5:Architecture of Multi-Service Apps

[Section 5](./docs/section5.md)

## 섹션 6:Leveraging a Cloud Environment for Development

TODO:

## 섹션 7:Response Normalization Strategies

### Validation && Error Response

**에러 응답**은 특정 validation 라이브러리를 사용하더라도, 모든 서비스에서 동일한 포맷으로 통일할 필요가 있다.

에러는 validation 뿐만 아니라 다양한데 그런 상황까지 일관적으로 고려되어야함

👍 어떻게? Error에 대한 sub class를 만들어 관리하면 편리하다.

- ```plain
  Error
    |----- RequestValidationError
    |----- DatabaseConnectionError
  ```

## 섹션 8:Database Management and Modeling

> pod는 항상 deployment를 통해 만든다. (직접 생성 X)

```yml
# infra/k8s/auth-mongo-depl.yml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-mongo-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: auth-mongo
  template:
    metadata:
      labels:
        app: auth-mongo
    spec:
      containers:
        - name: auth-mongo
          image: mongo # from docker hub
---
apiVersion: v1
kind: Service
metadata:
  name: auth-mongo-srv
spec:
  selector:
    app: auth-mongo # auth-mongo인 pod를 선택
  ports:
    - name: db # 로깅 목적의 이름
      protocol: TCP
      port: 27017
      targetPort: 27017
```

- mongoose가 타입지원이 좋지 않은데, 이런 경우 build 함수를 통해 해결 가능 (new User를 직접 호출 X)

  ```js
  const User = mongoose.model("User", userSchema);

  const buildUser = (attrs: UserAttrs) => {
    return new User(attrs);
  };

  buildUser({
    email: "test@test.com",
    password: "123",
  });
  ```

- 하지만 아래 방법이 더 괜찮은 방법

  ```js
  interface UserAttrs {
    email: string;
    password: string;
  }

  interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
  }

  interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
  }

  const userSchema = new Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
  }

  const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

  User.build(...) // !!
  ```

## 섹션 9:Authentication Strategies and Options

마이크로 서비스에서 인증은 여러 방법이 있긴 하지만 명확한(right) 솔루션이 없다. 각각의 방법들이 장단점이 있는데 이를 살펴보자.

### Option 1

각 서비스가 auth service에 의존적인 방법

Request -> Order Service --(sync request)--> Auth Service

예를 들어 `Order Service`가 인증이 필요하면, `Auth Service`에 'Sync Request'를 진행해 JWT/Cookie를 검사하고 인증되었는지 확인한다.

- 단점
  - Auth Service가 죽으면 전체 시스템 마비

### Option 1.1

각 서비스가 Auth Service를 게이트웨이로서 의존

Request -> Auth Service -> Order Service

### Option 2

> 의존이 줄어드므로 지금 으로서는 좋은 선택

각 서비스가 사용자를 인증하는 방법을 알고있다.

Request -> Order Service

- 단점
  - 서비스마다 동일한 로직을 가져야함

하지만 사용자가 밴되었다고 생각해보자. auth 외 다른 서비스에서는 이를 어떻게 알까? (JWT만 검증하니까)

=> auth 서비스에서 발급시 15분(짧은시간) 정도의 시간만 유효한 토큰을 발행한다. (그 방법이 쿠키든, JWT이든은 상관없다). 그리고 토큰이 더이상 유효하지 않으면 Auth Service로 요청해 재발급/검증한다.

그런데 이런 경우 실시간성을 보장할수가 없는데, 이는 AuthService에서 UserBanned 이벤트를 발생시키고, 각 서비스에서 토큰 유효시간만큼 이 이벤트를 저장하고 banned를 검증하는 로직을 넣으면 된다. 유효시간만큼만 데이터를 유지하는 것은 데이터를 적게 유지하기 위함이고, 유효시간 이후에는 어짜피 Auth Service에서 검증을 할 것이므로 더이상 필요치 않은 데이터이다.

### 인증 요구사항

1. 인증 확인시 사용자에 대한 정보를 알 수 있어야함
2. 인증 확인시 사용자 권한(role, authorization)에 대한 정보를 알 수 있어야함 (쿠폰 발행이 가능한가?)
3. 토큰은 일정 시간 후에 만료되어야함
4. 다른 모든 서비스 (다른 언어)에서도 이해가능하고 인증가능해야하며, backing data store를 추가로 요구하지 않아야함

==> JWT!

### Signin key (secret)를 쿠버네티스에서 공유하는 법

`Secret`을 만들고 여기에 통합 저장. 다른 서비스들이 실행될 때 주입

- jwt-secret 이라는 이름의 Secret 생성. 값은 jwt=asdf

  ```plain
  kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
  kubectl get secrets
  ```

depl yml 파일 다음과 같이 변경

```yml
spec:
  containers:
    - name: auth
      image: gwanduke/auth
      env:
        - name: JWT_KEY
          valueFrom:
            secretKeyRef:
              name: jwt-secret
              key: JWT_KEY
```

서비스에 따라 MySQL(id)이냐 mongodb(\_id)냐에 따라서 응답형태가 달라질 수 있는데 이도 App단에서 응답 형태를 통일시켜주어야한다.

또한 패스워드 등은 제외(필터링)시켜주어야한다.

### JSON.stringify

```js
const person = {
  name: "alex",
  toJSON() {
    return 1;
  },
};
JSON.stringify(person); // 1
```

### Express 타입 정의

```ts
declare global {
  namespace Express {
    interface Reqeust {
      currentUser? UserPayload;
    }
  }
}
```

## 섹션 10:Testing Isolated Microservices

### 고려해야할 테스트

범위 (예시)

- 고립된 한 조각 (미들웨어 하나...)
- 같이 동작하는 코드 (여러 미들웨어를 거쳐 동작하는 리퀘스트 핸들러)
- 서로 다른 컴포넌트가 함께 동작하는 것 (서비스로의 리퀘스트가 데이터베이스에 기록되는 것, 또는 이벤트 버스와의 연계)
- 서로 다른 서비스간에 테스트 (payments 서비스에서의 변경사항이 orders 서비스에 영향을 미치는 것...)

### 목표로할 테스트

1. 기본 요청 핸들링 (요청 -> (db) -> 응답까지)
2. 모델 테스트 (Unit test)
3. 이벤트를 emit하고 receive하는 부분 (여러 서비스가 함께 동작함을 가정함)

### 테스트 셋업

- dev dependency로 적용한 파일들은 도커 세팅시 설치하지 않음 (Dockerfile -> npm install --only=prod)

### 테스트 작성

딱히 어려운건 없었다. 기능테스트라 평소에 하던대로 테스트하면 된다.

- 테스트 환경이 https가 지원되지 않으므로 코드내에 해당 환경에 대한 예외를 처리해야할 수도 있다. (`process.env.NODE_ENV === 'test'`)
- supertest를 이용할 때는 브라우저와 다르게 쿠키가 자동으로 요청에 포함되지 않음을 기억하자
- global.signin 처럼 jest 글로벌로 헬퍼함수를 등록하면 편리한데, 타입이 먹히지 않을 것이다. 다음과 같이 해겨하자

  ```ts
  declare global {
    namespace NodeJS {
      interface Global {
        signin(): Promise<string[]>;
      }
    }
  }

  // in setup.ts
  function signin() {}

  // in test
  global.signin();
  ```

## 섹션 11:Integrating a Server-Side-Rendered React App

- k8s 개발 환경에서 next.js의 watch가 제대로 이루어지지 않을 수 있는데, next config내에 웹팩 poll 설정을 해서 300ms 정도마다 변경사항을 검사하도록 하면 해결될 수 있다.
- 서버에서는 ingress nginx를 거쳐 127.0.0.1:80 식으로 host가 설정되어 다른 서비스가 아닌 client 컨테이너 내부로 라우팅되니, `axios.get('/api/...')`식으로 호출하면 안되고 모든 URL을 다 적어주어야함.
  - 해결방법
    - 서버에서만 HOST로 서비스 URL을 명시한다 (http://auth-service)
      - 🤮 이 방법은 각 path마다 구체적인 서비스를 알아야하는 단점
      - 🤮 k8s의 동일 네임스페이스 내에서만 이런식으로 서비스명으로 호출가능함 `kubectl get namespace`
    - ✅ http://ingress-nginx.ingress-nginx.svc.cluster.local
      - http://NAME_OF_SERVICE.NAMESPACE.svc.cluster.local
      - `kubectl get services -n ingress-nginx`
      - 상당히 긴데, "External Name Service"를 이용하면 http://ingress-nginx-srv 식으로 더 짧게 줄일 수 있다.
      - 하지만 이 방법으로 routing rule이 제대로 적용 되지 않는데 ingress config에서 host와 다르기 때문 그래서 요청헤더로 Header host: ticking.dev로 따로 지정해 보내주어야한다.
- 서버에서 요청시에는 브라우저에서 보낸 쿠키를 파싱해, 그 COOKIE를 직접 실어 보내야함
- getInitialProps는 client,server 둘다 에서 수행됨 (WINDOW가 있는지로 판단 `typeof window === 'undefined'`)
- App의 getinitialprops가 호출되면 pages/index의 getinitialprops가 호출되지 않는 현상이 있는데, ctx.Component의 getinitialprops를 직접 호출해주고 props로 pageProps를 전달해주어야함.

## 섹션 12:Code Sharing and Reuse Between Services

## 섹션 13:Create-Read-Update-Destroy Server Setup

## 섹션 14:NATS Streaming Server - An Event Bus Implementation

## 섹션 15:Connecting to NATS in a Node JS World

## 섹션 16:Managing a NATS Client

## 섹션 17:Cross-Service Data Replication In Action

## 섹션 18:Understanding Event Flow

## 섹션 19:Listening for Events and Handling Concurrency Issues

## 섹션 20:Worker Services

## 섹션 21:Handling Payments

## 섹션 22:Back to the Client

## 섹션 23:CI/CD

## 섹션 24:[Appendix A] - Basics of Docker

## 섹션 25:[Appendix B] - Basics of Typescript

## 섹션 26:Bonus!
