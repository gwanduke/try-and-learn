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

### Install

- Mac/Windows 라면 Docker Preference에서 enable
- Docker-Toolbox or Linux: minikube (약간 까다로움)

### 명령어/사용방법/용어 요약

```plain
kubectl version
```

- cubernetes cluster: 노드의 클러스터 + 이들을 관리하기 위한 하나의 마스터
- master: (config file에 기반해) node들을 관리
- node: **여러 컨테이너를 실행**하는 컴퓨터라고 생각하면 좋음
- pod: node 내에서 컨테이너를 래핑하고 실행하는 단위 (=~ container), 여러 컨테이너를 래핑할 수 도 있다.
- deployment: pod를 어떻게 관리(생성)할지 관리 (monitor a set of pods)
- service: 여러 pod 앞단에서 네트워크 제어 (LB 같은 역할) Provide an easy to remember URL to access a running container.

### Config File

- Deployments, pods, services는 object라 불리며 이를 만들것이다.
- YAML 구문 사용
- config file은 항상 소스와 함꼐 관리 (git에 포함해 document역할 수행)
  - object를 config file없이도 생성할 수 있지만 절대 하지 말 것.

### Creating a Pod

```plain
docker build -t gwanduke/posts:0.0.1 .
```

```yml
# blog/infra/k8s/posts.yml

apiVersion: v1
kind: Pod
metadata:
  name: posts # Pod에 대한 이름
spec: # 생성하려는 객체에 적용하고 싶은 속성
  containers:
    - name: posts # 컨테이너 이름
      image: gwanduke/posts:0.0.1
```

```bash
$ kubectl apply -f posts.yaml
# pod/posts created

$ kubectl get pods
# NAME    READY   STATUS    RESTARTS   AGE
# posts   1/1     Running   0          40s
```

### cubectl Commands

- `kubectl get pods` =~ `docker ps`
- `kubectl exec -it [pod_name] [cmd]` =~ `docker exec -it [containerid] [cmd]`
- `kubectl logs [pod_name]` =~ `docker logs [containerid]`
- `kubectl delete pod [pod_name]`
- `kubectl apply -f [config_file_name]`
- `kubectl describe pod [pod_name]` (디버깅 용도)

### Deployments

config file에 따라서 pods를 관리/조정함

```yaml
# blog/infra/k8s/posts-depl.yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: posts-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: posts
  template:
    metadata:
      labels:
        app: posts
    spec:
      containers:
        - name: posts
          image: gwanduke/posts:0.0.1
```

```bash
$ apply -f posts-depl.yaml
# deployment.apps/posts-depl created
```

### Deployments commands

- `kubectl get deployments`: 리스팅
- `kubectl describe deployment [depl name]`: 특정 deployment에 대한 상세사항 출력
- `kubectl apply -f [configfilename]`: create deployment
- `kubectl delete deployment [depl name]`

### Updating the Image used by a Deployment

#### Method #1

1. 프로젝트 코드 변경
2. 이미지 리빌드, 새로운 버전 지정
3. deployment config file -> image version 업데이트
4. `kubectl apply -f [deplfile]`
   `=> # deployment.apps/posts-depl configured`

`3`에서 deployment config 내부의 버전을 매번 관리해야한다는 단점이 발생

#### 👍 Method #2

1. deployment는 lastest 태그를 항상 사용
2. 코드 업데이트
3. 이미지 빌드
4. docker hub에 이미지 푸시 `docker push gwanduke/posts`
5. `kubectl rollout restart deployment posts-depl`

### Networking with Service

Service는 pods간에 네트워킹을 제공한다.

- 서비스의 종류
  - Cluster IP: pod에 접근하기 위운 URL 이름을 제공. 클러스터 내부의 pods에만 노출됨
  - Node Port: 클러스터 외부에서 접근 가능한 pod. 대개 dev 목적으로 사용됨
  - Load Balancer: 클러스터 외부에서 접근가능한 pod를 만듬. 세상에 공개할 때 적절한 방법
  - External Name: in-cluster 요청을 CNAME url로 리다이렉트. 이건 딱히 알 필요업음

### Creating Service

```yml
apiVersion: v1
kind: Service
metadata:
  name: posts-srv
spec:
  type: NodePort
  selector:
    app: ports # posts로 레이블(metadata:labels:app: posts)된 pods를 찾아라
  ports:
    - name: posts # logging 목적
      protocol: TCP
      port: 4000 # Node Port Service에 접근하는 포트
      targetPort: 4000 # Pod에 접근하는 포트
```

```bash
$ k apply -f posts-srv.yaml
# service/posts-srv created

$ k get services
# NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
# kubernetes   ClusterIP   10.96.0.1      <none>        443/TCP          114m
# posts-srv    NodePort    10.100.51.98   <none>        4000:30596/TCP   4s

            ---Node---------------------------------------------------
            |
            |               ---------------------
Port 3xxxx=>|  port 4000 -> | Node Port Service | -> port 4000 -> [Pod]
(nodePort)  |               ---------------------
랜덤할당      |
            ----------------------------------------------------------
```

### Service를 이용한 내부 통신 : 실습

- 노드 내부 Pods 간에는 localhost로 통신 불가, 따로 부여된 IP가 있음. 대신 Cluster IP 서비스를 통해 통신
- 내부 주소는 지정한 `name`이 된다. (`http://posts-clusterip-srv`)

```yml
apiVersion: v1
kind: Service
metadata:
  name: posts-clusterip-srv
spec:
  selector:
    app: posts
  type: ClusterIP
  ports:
    - name: posts
      protocol: TCP
      port: 4000
      targetPort: 4000
```

restart

```plain
kubectl rollout restart deployment posts-depl
kubectl rollout restart deployment event-bus-depl
```

폴더 내 모든 파일 적용시키기

```bash
$ k apply -f .
#
```

### 클라이언트에서 고려해야할 것

- ❌ Option 1
  - 각 서비스의 NodePort를 만들고 각각 다른 서비스port로 요청하는 방법
- ✅ Option 2
  - Load Balancer 서비스를 만들고 거기로만 요청하는 방법
  - LB는 각 `ClusterIP`로 포워딩

#### Load Balancer & Ingress

- [ ] ingress vs lb?

- Load Balancer Service: 한 pod로 트래픽을 전달하는 것이 목표. (즉 외부 트래픽을 클러스터 내부로 전달)
- Ingress: 클러스터 내에서 라우팅 룰을 가지고 트래픽을 다른 서비스로 분배하는 pod

```plain
            |------------------------------
            |(Cloud Provider. aws/gc/azure)
Outside -> L|B  -> |---------------------|
            |      | ingress --> pod1    |
            |      |         --> pod2    |
            |      |---------------------|
            |------------------------------
```

구현에 `ingress-nginx` 또는 `kubernetes-ingress`를 사용하면 편리함

ingress 서비스 구성

```yml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: ingress-srv
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
    - host: posts.com # 한 클러스터 내에서 여러 도메인이 있을 수 있다.
      http:
        paths:
          - path: /posts
            backend:
              serviceName: posts-clusterip-srv
              servicePort: 4000
```

/etc/hosts에 다음 추가

```plain
127.0.0.1 posts.com
```

### 리액트 어플리케이션 환경 세팅

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: client-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: client
  template:
    metadata:
      labels:
        app: client
    spec:
      containers:
        - name: client
          image: gwanduke/client
---
apiVersion: v1
kind: Service
metadata:
  name: client-srv
spec:
  selector:
    app: client
  type: ClusterIP
  ports:
    - name: client
      protocol: TCP
      port: 3000
      targetPort: 3000
```

```bash
$ k apply -f k8s/client-depl.yaml
# deployment.apps/client-depl created
# service/client-srv created
```

- ingress-nginx는 HTTP 메서드로 라우팅 할 수는 없다. 그래서 path로만 라우팅이 가능함. 이를 고려해 설계해야된다.

### Skaffold 툴로 명령 자동화하기

https://skaffold.dev/

```yml
apiVersion: skaffold/v2alpha3
kind: Config
deploy:
  kubectl:
    manifests:
      - ./infra/k8s/*
build:
  local:
    push: false
  artifacts:
    - image: gwanduke/client # 여기 명시된 내용에 따라 변경을 감지하고 재배포
      context: client
      docker:
        dockerfile: Dockerfile
      sync:
        manual:
          - src: "src/**/*.js"
            dest: .
    - image: gwanduke/comments
      context: comments
      docker:
        dockerfile: Dockerfile
      sync:
        manual:
          - src: "*.js"
            dest: .
    - image: gwanduke/event-bus
      context: event-bus
      docker:
        dockerfile: Dockerfile
      sync:
        manual:
          - src: "*.js"
            dest: .
    - image: gwanduke/moderation
      context: moderation
      docker:
        dockerfile: Dockerfile
      sync:
        manual:
          - src: "*.js"
            dest: .
    - image: gwanduke/posts
      context: posts
      docker:
        dockerfile: Dockerfile
      sync:
        manual:
          - src: "*.js"
            dest: .
    - image: gwanduke/query
      context: query
      docker:
        dockerfile: Dockerfile
      sync:
        manual:
          - src: "*.js"
            dest: .
```

```bash
$ skaffold dev
#
```

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
