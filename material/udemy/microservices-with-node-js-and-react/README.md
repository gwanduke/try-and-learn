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

## 섹션 5:Architecture of Multi-Service Apps

## 섹션 6:Leveraging a Cloud Environment for Development

## 섹션 7:Response Normalization Strategies

## 섹션 8:Database Management and Modeling

## 섹션 9:Authentication Strategies and Options

## 섹션 10:Testing Isolated Microservices

## 섹션 11:Integrating a Server-Side-Rendered React App

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
