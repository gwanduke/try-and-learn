# Section 4

## Install

- Mac/Windows 라면 Docker Preference에서 enable
- Docker-Toolbox or Linux: minikube (약간 까다로움)

## 명령어/사용방법/용어 요약

```plain
kubectl version
```

- cubernetes cluster: 노드의 클러스터 + 이들을 관리하기 위한 하나의 마스터
- master: (config file에 기반해) node들을 관리
- node: **여러 컨테이너를 실행**하는 컴퓨터라고 생각하면 좋음
- pod: node 내에서 컨테이너를 래핑하고 실행하는 단위 (=~ container), 여러 컨테이너를 래핑할 수 도 있다.
- deployment: pod를 어떻게 관리(생성)할지 관리 (monitor a set of pods)
- service: 여러 pod 앞단에서 네트워크 제어 (LB 같은 역할) Provide an easy to remember URL to access a running container.

## Config File

- Deployments, pods, services는 object라 불리며 이를 만들것이다.
- YAML 구문 사용
- config file은 항상 소스와 함꼐 관리 (git에 포함해 document역할 수행)
  - object를 config file없이도 생성할 수 있지만 절대 하지 말 것.

## Creating a Pod

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

## cubectl Commands

- `kubectl get pods` =~ `docker ps`
- `kubectl exec -it [pod_name] [cmd]` =~ `docker exec -it [containerid] [cmd]`
- `kubectl logs [pod_name]` =~ `docker logs [containerid]`
- `kubectl delete pod [pod_name]`
- `kubectl apply -f [config_file_name]`
- `kubectl describe pod [pod_name]` (디버깅 용도)

## Deployments

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

## Deployments commands

- `kubectl get deployments`: 리스팅
- `kubectl describe deployment [depl name]`: 특정 deployment에 대한 상세사항 출력
- `kubectl apply -f [configfilename]`: create deployment
- `kubectl delete deployment [depl name]`

## Updating the Image used by a Deployment

## Method #1

1. 프로젝트 코드 변경
2. 이미지 리빌드, 새로운 버전 지정
3. deployment config file -> image version 업데이트
4. `kubectl apply -f [deplfile]`
   `=> # deployment.apps/posts-depl configured`

`3`에서 deployment config 내부의 버전을 매번 관리해야한다는 단점이 발생

## 👍 Method #2

1. deployment는 lastest 태그를 항상 사용
2. 코드 업데이트
3. 이미지 빌드
4. docker hub에 이미지 푸시 `docker push gwanduke/posts`
5. `kubectl rollout restart deployment posts-depl`

## Networking with Service

Service는 pods간에 네트워킹을 제공한다.

- 서비스의 종류
  - Cluster IP: pod에 접근하기 위운 URL 이름을 제공. 클러스터 내부의 pods에만 노출됨
  - Node Port: 클러스터 외부에서 접근 가능한 pod. 대개 dev 목적으로 사용됨
  - Load Balancer: 클러스터 외부에서 접근가능한 pod를 만듬. 세상에 공개할 때 적절한 방법
  - External Name: in-cluster 요청을 CNAME url로 리다이렉트. 이건 딱히 알 필요업음

## Creating Service

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

## Service를 이용한 내부 통신 : 실습

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

## 클라이언트에서 고려해야할 것

- ❌ Option 1
  - 각 서비스의 NodePort를 만들고 각각 다른 서비스port로 요청하는 방법
- ✅ Option 2
  - Load Balancer 서비스를 만들고 거기로만 요청하는 방법
  - LB는 각 `ClusterIP`로 포워딩

## Load Balancer & Ingress

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

## 리액트 어플리케이션 환경 세팅

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

## Skaffold 툴로 명령 자동화하기

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
