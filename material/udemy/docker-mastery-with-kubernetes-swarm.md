# Docker Mastery: with Kubernetes +Swarm from a Docker Captain

## 목차

- [Docker Mastery: with Kubernetes +Swarm from a Docker Captain](#docker-mastery-with-kubernetes-swarm-from-a-docker-captain)
  - [목차](#목차)
  - [Section 1. Course Introduction and Docker Intro](#section-1-course-introduction-and-docker-intro)
    - [3. Why Docker? Why Now?](#3-why-docker-why-now)
      - [Why do we need docker](#why-do-we-need-docker)
    - [4. Gettting Course Resources (GitHub Repo)](#4-gettting-course-resources-github-repo)
  - [Section 2. The Best Way to Setup Docker for Your OS](#section-2-the-best-way-to-setup-docker-for-your-os)
    - [8. Docker Editions: Which Do I Use?](#8-docker-editions-which-do-i-use)
    - [15 ~ 17.](#15--17)
  - [Section 3. Creating and Using Containers Like a Boss](#section-3-creating-and-using-containers-like-a-boss)
    - [18. Check Our Docker Install and Config](#18-check-our-docker-install-and-config)
    - [19. Starting a Nginx Web Server](#19-starting-a-nginx-web-server)
    - [20. Debrief: What Happens When We Run a Container](#20-debrief-what-happens-when-we-run-a-container)
    - [21. Container VS. VM: It's Just a Process](#21-container-vs-vm-its-just-a-process)
    - [23 ~ 24. Assignment: Manage Multiple Containers](#23--24-assignment-manage-multiple-containers)
    - [25. What's Going On In Containers: CLI Process Monitoring](#25-whats-going-on-in-containers-cli-process-monitoring)
    - [26. Gettting a Shell Inside Containers: No Need for SSH](#26-gettting-a-shell-inside-containers-no-need-for-ssh)
    - [27. Docker Networks: Concepts for Private and Public Comms in Containers](#27-docker-networks-concepts-for-private-and-public-comms-in-containers)
  - [Section 4. Container Images, Where To FInd Them and How To Build Them](#section-4-container-images-where-to-find-them-and-how-to-build-them)
    - [36. What's In An Image (and What isn't)](#36-whats-in-an-image-and-what-isnt)
    - [37. THe Mighty Hub: Using Docker Hub Registry images](#37-the-mighty-hub-using-docker-hub-registry-images)
    - [38. Images and Their Layers: Discover the Image Cache](#38-images-and-their-layers-discover-the-image-cache)
      - [image layers](#image-layers)
      - [union file system](#union-file-system)
      - [history, inspect command](#history-inspect-command)
      - [copy on write](#copy-on-write)
    - [39. Image tagging and ppushing to Docker hub](#39-image-tagging-and-ppushing-to-docker-hub)
    - [40. building images: the dockerfile basics](#40-building-images-the-dockerfile-basics)
    - [41.](#41)
    - [43. Assignment](#43-assignment)
    - [45. Using Prune to keep your docker system clean](#45-using-prune-to-keep-your-docker-system-clean)
  - [Section 5. Container Lifetime & Persistent Data: Volumes, Volumes, Volumes](#section-5-container-lifetime--persistent-data-volumes-volumes-volumes)
    - [47. Persistent Data: Data Volumes](#47-persistent-data-data-volumes)
      - [49. Persistent Data: Bind Mounting](#49-persistent-data-bind-mounting)
    - [51. Assignment](#51-assignment)
    - [53. Assignment: bind mounts](#53-assignment-bind-mounts)
  - [Section 6: Making it easier with docker compose: The Multi-Container Tool](#section-6-making-it-easier-with-docker-compose-the-multi-container-tool)
    - [55. Docker Compose and The docker-compose.yml file](#55-docker-compose-and-the-docker-composeyml-file)
    - [56. Trying Oout basic compose commands](#56-trying-oout-basic-compose-commands)
      - [docker-compose CLI](#docker-compose-cli)
    - [57. Assignment: Build a Compose File For aMulti-Container Service](#57-assignment-build-a-compose-file-for-amulti-container-service)
    - [59. Adding image Building to compose files](#59-adding-image-building-to-compose-files)
  - [Section 7. Swarm Intro and Creating a 3-Node Swarm Cluster](#section-7-swarm-intro-and-creating-a-3-node-swarm-cluster)
    - [62. Swarm Mode: Built-In Orchestration](#62-swarm-mode-built-in-orchestration)
    - [63. Create Your First Service and Scale It Locally](#63-create-your-first-service-and-scale-it-locally)
    - [64. UI Change For Service Create/Update](#64-ui-change-for-service-createupdate)
    - [65. Docker Machine Bug With Swarm](#65-docker-machine-bug-with-swarm)
    - [66. Creating a 3-Node Swarm Cluster](#66-creating-a-3-node-swarm-cluster)
  - [Section 8. Swarm Basic Features and How to Use Them In Your Workflow](#section-8-swarm-basic-features-and-how-to-use-them-in-your-workflow)
    - [67. Scaling out with overlay networking](#67-scaling-out-with-overlay-networking)
    - [68. Scaling Out with Routing Mesh](#68-scaling-out-with-routing-mesh)
    - [70.](#70)
    - [71. Swarm Stacks and Production grade compose](#71-swarm-stacks-and-production-grade-compose)
    - [72. Secrets Storage for Swarm: Protecting Your Enviornment Variables](#72-secrets-storage-for-swarm-protecting-your-enviornment-variables)
    - [73. Using Secrets in Swarm Servcies](#73-using-secrets-in-swarm-servcies)
    - [74. Using Secrets with Swarm Stacks](#74-using-secrets-with-swarm-stacks)
  - [Section 9: Swarm App Lifecycle](#section-9-swarm-app-lifecycle)
    - [77. Using Secrets With Local Docker Compose](#77-using-secrets-with-local-docker-compose)
  - [Section 10. Container Registries: Image Storage and Distribution](#section-10-container-registries-image-storage-and-distribution)
    - [82. Docker Hub: Digging Deeper](#82-docker-hub-digging-deeper)
    - [83. Understanding Docker Registry](#83-understanding-docker-registry)
  - [Section 11. Docker in production](#section-11-docker-in-production)
    - [Dockerfile Anti-pattern](#dockerfile-anti-pattern)
    - [어떤 이미지를 선택해야할까?](#어떤-이미지를-선택해야할까)
    - [Swarm](#swarm)
    - [겨롤ㄴ](#겨롤ㄴ)
  - [Section 12: The What and Why of Kubernetes](#section-12-the-what-and-why-of-kubernetes)
    - [92. Why Kubernetes](#92-why-kubernetes)
  - [Section 13. Kubernetes install and your first pods](#section-13-kubernetes-install-and-your-first-pods)
    - [96. Kubernetes architecture terminology](#96-kubernetes-architecture-terminology)
    - [97. 쿠버네티스 local install](#97-쿠버네티스-local-install)
    - [99. container abstraction](#99-container-abstraction)
    - [100. Kubectl run, create, and apply](#100-kubectl-run-create-and-apply)
    - [101. Kubectl run, create and apply](#101-kubectl-run-create-and-apply)
    - [103. Scaling ReplicaSets](#103-scaling-replicasets)
    - [104. Inspecting Kubernetes Objects''](#104-inspecting-kubernetes-objects)
  - [Section 14. Exposing Kubernetes Ports](#section-14-exposing-kubernetes-ports)
    - [106. Service Types](#106-service-types)
    - [107. Creating a ClusterIP Service](#107-creating-a-clusterip-service)
    - [108.](#108)
    - [109. Kubernetes Services DNS](#109-kubernetes-services-dns)
  - [Section 15. Kubernetes Management Techniques](#section-15-kubernetes-management-techniques)
    - [112. The Future of Kubectl Run](#112-the-future-of-kubectl-run)
    - [113. Imperative vs Declarative](#113-imperative-vs-declarative)
      - [Imperative](#imperative)
      - [Declarative](#declarative)
    - [114. Three Management Approaches](#114-three-management-approaches)
      - [most important rule:](#most-important-rule)
      - [Best recommendations](#best-recommendations)
  - [Section 16. Moving to Declarative Kubernetes YAML](#section-16-moving-to-declarative-kubernetes-yaml)

## Section 1. Course Introduction and Docker Intro

### 3. Why Docker? Why Now?

[S01+Why+Docker+Slides.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ed87dbe0-8420-40cc-a8bf-7ed44db80617/S01WhyDockerSlides.pdf)

- Container Basics
- Image Basics
- Docker Networking
- Docker Volumes
- Docker Compose
- Orchestration
- Docker Swarm
- Kubernetes 가 조금 더 큰 시장
- Swarm vs. K8s
- Student Q&A
- File Reviews
- References Galore

#### Why do we need docker

- Docker is all about speed.
- Develop, Build, Test, deploy....

  ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a16e33c6-c093-4a5e-91b5-85ec37b040d3/Screen_Shot_2020-08-29_at_11.41.55.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a16e33c6-c093-4a5e-91b5-85ec37b040d3/Screen_Shot_2020-08-29_at_11.41.55.png)

  ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/20f1fc7d-f56e-4004-890f-740f5ad00fe8/Screen_Shot_2020-08-29_at_11.42.19.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/20f1fc7d-f56e-4004-890f-740f5ad00fe8/Screen_Shot_2020-08-29_at_11.42.19.png)

→ Mac, windows, pc.... Hosting, Cloud..어떤 환경에서든 동일하게 실행

생산성 향상, 인프라 스트럭쳐 세이빙

[https://landscape.cncf.io](https://landscape.cncf.io)

### 4. Gettting Course Resources (GitHub Repo)

[Docker_CheatSheet_08.09.2016_0.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/09a82b6b-da51-4613-9150-d7559ffc38c3/Docker_CheatSheet_08.09.2016_0.pdf)

[Docker+Mastery+Commands+2.0.zip](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a60c5127-41c6-4434-a535-90cb6434f8be/DockerMasteryCommands2.0.zip)

[Docker+Mastery+Slides+3.0.zip](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1c505599-f5e8-4a3c-ba66-6830be4fecb7/DockerMasterySlides3.0.zip)

[https://github.com/bretfisher/udemy-docker-mastery](https://github.com/bretfisher/udemy-docker-mastery)

## Section 2. The Best Way to Setup Docker for Your OS

### 8. Docker Editions: Which Do I Use?

- 세가지 설치방법: Direct, Mac/Win, Cloud

  - Window
  - Mac (dont use brew)
  - AWS/Azure/Google

- Docker CE (free) vs Docker EE (paid)

### 15 ~ 17.

Versions

- Edge === beta (1 month support)
- stable === lts (4 month support)

## Section 3. Creating and Using Containers Like a Boss

### 18. Check Our Docker Install and Config

```text
$ docker version
$ docker info
### => most config values of engine
```

Command

```text
$ docker <command> <sub-command> (options)
### => Docker management command
$ docker <command> (options)
```

### 19. Starting a Nginx Web Server

- Image는 실행하길 원하는 어플리케이션
- Container는 프로세스를 실행하는 이미지의 인스턴스
- 동일한 이미지에서 여러 컨테이너를 가질 수 있다

```text
$ docker container run --publish 80:80 nginx
### nginx를 Docker Hub로 부터 다운로드
### image로 부터 container 실행
### 80 port 열기
### 컨테이너 IP로 들어오는 트래픽을 컨테이너로 라우팅
```

ctrl + c

```text
$ docker container run --publish 80:80 --detach nginx
### --detach 옵션은 백그라운드에서 실행하도록 해준다.
$ docker container ls
$ docker container stop <container-id>
$ docker container ls -a
```

docker container run 이 언제나 새로운 컨테이너를 시작하는 것에 반해, docker container start는 이미 존재하는 정지되어있는 컨테이너를 시작한다.

이름 주기

```text
$ docker container run --publish 80:80 --detach --name webhost nginx
$ docker container logs webhost
$ docker container top webhost
$ docker container rm -f 89 8b 77
### 컨테이너 삭제
```

### 20. Debrief: What Happens When We Run a Container

docker container run

1. 로컬에 캐시된 이밎를 ㅏ찾는다.
2. 원격 저장소의 이미지를 찾는다 (기본적으로 docker hub)
3. Download latest version
4. virtual ip on private network inside docker engine
5. 80 port르 열고 컨테이너의 80 으로 전송 (80:80)

```text
docker container run
--publish 8080:80 # listening port
--name webhost
-d nginx:1.11 # version
nginx -T # change CMD run on start
```

### 21. Container VS. VM: It's Just a Process

[https://github.com/mikegcoleman/docker101/blob/master/Docker_eBook_Jan_2017.pdf](https://github.com/mikegcoleman/docker101/blob/master/Docker_eBook_Jan_2017.pdf)

[https://youtu.be/sK5i-N34im8](https://youtu.be/sK5i-N34im8)

[https://www.bretfisher.com/docker-for-mac-commands-for-getting-into-local-docker-vm/](https://www.bretfisher.com/docker-for-mac-commands-for-getting-into-local-docker-vm/)

[https://www.bretfisher.com/getting-a-shell-in-the-docker-for-windows-vm/](https://www.bretfisher.com/getting-a-shell-in-the-docker-for-windows-vm/)

```text
$ docker run --name mongo -d mongo
$ docker top mongo # list running processes
$ ps aux # mongod HERE;
$ docker stop mongo
$ docker ps # docker container ls
$ docker top mongo
$ ps aux # no mongod;
```

### 23 ~ 24. Assignment: Manage Multiple Containers

조건

- Run nginx, mysql, httpd server
- run all of them —detach (or -d), name them with —name
- nginx should listen on 80:80, httpd on 8080:80, mysql on 3306:3306
- when running mysql, use —env (or -e) to pass MYSQL_RANDOM_ROOT_PASSWORD=yes
- docker container logs → to find random password
- clean it all up with docker container stop, dockr container rm
- use docke rcontainer ls to ensure everything is correct before and after cleanup

정답

### 25. What's Going On In Containers: CLI Process Monitoring

- docker container top
- docker container inspect - details of one container config
- docker container stats - performance stats for all containers

### 26. Gettting a Shell Inside Containers: No Need for SSH

- docker container run -it
  ⇒ start new container interactively
- docker container exec -it
  ⇒ run additional command in existing container
- Different Linux distros in container

```text
$ docker container run -it --name proxy nginx bash
```

### 27. Docker Networks: Concepts for Private and Public Comms in Containers

[https://docs.docker.com/config/formatting/](https://docs.docker.com/config/formatting/)

## Section 4. Container Images, Where To FInd Them and How To Build Them

### 36. What's In An Image (and What isn't)

- App binaries and dependencies
- Metadata about the image data and how to run the image
- Not a complete OS. No kernel, kernel modules(e.g. drivers)
- small as one file (your app binary) like a goalng static binary
- Big as a Ubuntu distro with apt, and Apache, PHP, and more installed

### 37. THe Mighty Hub: Using Docker Hub Registry images

이미지는 한개 이상의 태그를 가질 수 있음

latest는 스페셜 태그 → 항상 가장 마지막 커밋을 가리킴

alpine → 매우 작은 리눅스

보통은 jessi 기반 (latest 같은 것들은 이거 기반으로 만들어짐)

### 38. Images and Their Layers: Discover the Image Cache

#### image layers

```text
$ docker image ls
$ docker image history nginx
```

이미지는 파일시스템의 변화와 메타데이터로 이루어진다.

- 각 레이어는 SHA로 보이는 유니크 ID를 가진다.
- container는 image의 가장 위에서 read/write를 하는 레이어이다.

#### union file system

#### history, inspect command

- docker image inspect <imagename>
  → 이미지에 대한 메타데이터 출력
-

#### copy on write

- 이미지는 컨테이너 실행시 read-only 이다.
- 컨테이너는 이미지의 내용을 복사해 변경사항을 핸들링한다.

### 39. Image tagging and ppushing to Docker hub

```text
docker image tag —help
docker image push <image-name>
docker image tag <image-name> <image-name:tag>
```

```text
docker login
docker logout
```

latest tag는 보통 stable 최신 버전을 뜻함

### 40. building images: the dockerfile basics

[https://docs.docker.com/engine/reference/builder/](https://docs.docker.com/engine/reference/builder/)

```text
docker build -f <filename>
```

```text
ENV ~~
### =>
```

dockerfile의 각 구절은 각각의 레이어를 가진다.

그러므로 RUN ... && ... &&... 처럼 작성하는 것은 한개의 레이어만 갖도록 해 시간과 공간을 절약해줌

도커에서는 stdout과 stderr이 자동으로 기록되므로 로그파일을 따로 남기지 않는게 좋다. 아니면 서비스를 이용하는 편이 낫다.

FROM 이미지베이스

ENV 환경변수

RUN 커맨드

EXPOSE

CMD 컨테이너를 실행할 때 또는 재시작할 때 실행할 커맨드 → 오직 한개만 있어야하며, 여러개인 경우 가장 마지막 것이 적용됨

WORKDIR

COPY

### 41.

```text
docker image build -t customnginx .

### 실행하면 각 단계에 hash가 보일텐데, 이는 만약 다음에 같은 커맨드를 실행하면 다시 실행하지 않을 것이다.
```

### 43. Assignment

### 45. Using Prune to keep your docker system clean

[https://youtu.be/\_4QzP7uwtvI](https://youtu.be/_4QzP7uwtvI)

```text
docker image prune
docker system prune

docker image prune -a
docker system df
```

## Section 5. Container Lifetime & Persistent Data: Volumes, Volumes, Volumes

- containers are usually immutable and ephemeral
- immutable infrasturcture ⇒ 컨테이너를 재배포 해야만 변함
- 바이너리나 DB는 담기가 좀 그런데, 도커는 이를 관심사 분리한다.
- 영구 데이터 (유니크 데이터)
  - → Volume, Bind Mounts 두가지 옵션이 있음
  - Volume: UFS 컨테이너 밖에 특별한 위치를 만듬
  - Bind Mounts: 컨테이너 경로를 호스트 경로로 매치

### 47. Persistent Data: Data Volumes

Dockerfile `VOLUME` command

```text
docker pull mysql
docker image inspect mysql -> volumes 가 있음을 확인할 수 있음
```

```text
docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true mysql
docker container inspect mysql

```

→ volume은 컨테이너 실행시 마다 생기고, 정지하거나 컨테이너가 삭제되어도 남아있음

named volume을 만들 수있다.

```text
docker container run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true -v mysql-db:/var/lib/mysql mysql
```

```text
docker volume create
```

#### 49. Persistent Data: Bind Mounting

- 호스트 파일이나 디렉터리를 컨테이너의 파일이나 디렉터리로 매핑
- 기본적으로 두 위치가 같은 파일을 가리킴
- 다시, UFS를 스킵하고 호스트 파일들은 어떤 컨테이너에서든 오버라이팅 될 수있음
- Dockerfile 내에서 사용 불가, container run 시에만 가능
  - run -v /Users/gwanduke/stuff:/gwandke/container

### 51. Assignment

```text
docker hub에서 volume 경로 확인

docker container run -d --name psql -v psql:/var/lib/postgresql/data postgres:9.6.1
docker container logs -f psql
docker container stop psql

docker container run -d --name psql2 -v psql:/var/lib/postgresql/data postgres:9.6.2
```

### 53. Assignment: bind mounts

```text
docker run -p 80:4000 -v $(pwd):/site bretfisher/jekyll-serve
```

## Section 6: Making it easier with docker compose: The Multi-Container Tool

### 55. Docker Compose and The docker-compose.yml file

[https://github.com/docker/compose/releases](https://github.com/docker/compose/releases)

[https://docs.docker.com/compose/compose-file/compose-versioning/](https://docs.docker.com/compose/compose-file/compose-versioning/)

[https://yaml.org/refcard.html](https://yaml.org/refcard.html)

[https://yaml.org/](https://yaml.org/)

[DM+S06+Commands.txt](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b82d784f-865c-4e3a-b9ca-8676a65afc43/DMS06Commands.txt)

[S06+Compose+Slides (1).pdf](<https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1a60a5f5-368a-498a-8a15-4ce8ec669851/S06ComposeSlides_(1).pdf>)

[S06+Compose+Slides.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7ebed735-997a-458b-93b7-1030ec8cae23/S06ComposeSlides.pdf)

커맨드라인과 컨피그 파일의 콤비네이션

Why?

컨테이너간에 관계가 필요

proxies, workers.... 같이 돌아야 솔루션이 되는 것들 ...

### 56. Trying Oout basic compose commands

[https://github.com/docker/compose/releases](https://github.com/docker/compose/releases)

[https://github.com/BretFisher/ama/issues/8](https://github.com/BretFisher/ama/issues/8)

#### docker-compose CLI

- production 레벨의 툴이 아니다. 로컬 개발과 테스트에 유용하다.
- 자주 사용하는 커맨드는 다음과 같음
  - docker-compose up : setup volumes/networkds and start all containers
  - docker-compose down : stop all containers and remove cont/vo/net
- 만약 프로젝트가 Dockerfile과 docker-compose.yml을 가지고 있다면,

  - git cline github.com/some/software
  - docker-compose up

  하면 된다

drupal 처럼 어떤 앱에 필요한 mysql 등을 한번에 돌리기 위한 도구

```text
docker-compose up -d
docker-compose logs
```

### 57. Assignment: Build a Compose File For aMulti-Container Service

[https://docs.docker.com/compose/compose-file/](https://docs.docker.com/compose/compose-file/)

[https://docs.docker.com/compose/compose-file/#links](https://docs.docker.com/compose/compose-file/#links)

### 59. Adding image Building to compose files

[https://docs.docker.com/compose/compose-file/#build](https://docs.docker.com/compose/compose-file/#build)

Using compose to build

## Section 7. Swarm Intro and Creating a 3-Node Swarm Cluster

### 62. Swarm Mode: Built-In Orchestration

[https://www.youtube.com/watch?v=dooPhkXT9yI](https://www.youtube.com/watch?v=dooPhkXT9yI)

[https://www.youtube.com/watch?v=\_F6PSP-qhdA](https://www.youtube.com/watch?v=_F6PSP-qhdA)

[https://speakerdeck.com/aluzzardi/heart-of-the-swarmkit-topology-management](https://speakerdeck.com/aluzzardi/heart-of-the-swarmkit-topology-management)

[https://www.youtube.com/watch?v=EmePhjGnCXY](https://www.youtube.com/watch?v=EmePhjGnCXY)

[http://thesecretlivesofdata.com/raft/](http://thesecretlivesofdata.com/raft/)

[DM+S07+Commands.txt](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/064595d1-63ac-48ae-88bb-02baaa6bbaf8/DMS07Commands.txt)

[S07+Swarm+Intro+Slides.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/18437237-b021-43c4-8702-e58748f4df07/S07SwarmIntroSlides.pdf)

- Server clustering solution

Containers Everywhere =⇒ new problems

- 컨테이너 라이프사이클을 어떻게 자동화할 것인가?
- scale out/in/up/down을 어떻게 쉽게 할 것인가
- 컨테이너가 실패하는 경우 다시 생성되도록 어떻게?
- 어떻게 컨테이너를 다운타임없이 대체할 것인가( blue/green deploy)
- 어떻게 컨테이너가 시작되는 지점을 컨트롤 할 것인가
- 횡단노드 가상 네트워크를 어떻게 만들것인가
- 어떻게 신뢰하는 서버들만 우리 컨테이너를 돌리도록 할 것인가
- 시크릿, 키, 패스워드를 어떻게 저장하고 올바른 컨테이너에서 사용하도록 할 것인가?

Manager Node, Worker Node 가 있는데 Manager Node는 RAFT라 불리는 데이터베이스를 가지고 컨피그와 스웜내에서의 인증 등을 관리한다. 각 ManagerNode는 RAFT 정보를 공유한다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bbf635b1-d68e-4a5b-a2cf-976d73dd6b6c/Screen_Shot_2020-09-06_at_0.14.50.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bbf635b1-d68e-4a5b-a2cf-976d73dd6b6c/Screen_Shot_2020-09-06_at_0.14.50.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bab8a6b1-e241-4dbd-be9c-0d8620a6df8f/Screen_Shot_2020-09-06_at_0.16.16.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bab8a6b1-e241-4dbd-be9c-0d8620a6df8f/Screen_Shot_2020-09-06_at_0.16.16.png)

- 한 서비스는 수많은 task를 가질 수 있다.
- task 각각은 컨테이너 하나를 실행할 것이다.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/964c67e6-8bf4-487d-954f-bbe368f109c7/Screen_Shot_2020-09-06_at_0.17.46.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/964c67e6-8bf4-487d-954f-bbe368f109c7/Screen_Shot_2020-09-06_at_0.17.46.png)

### 63. Create Your First Service and Scale It Locally

[https://docs.docker.com/engine/swarm/services/](https://docs.docker.com/engine/swarm/services/)

```text
docker swarm init
### => This is how a single node initializes a swarm, and is automatically joined as a manager.
```

swarm init?

- Lots of PKI and security automation
  - Root Signing Certificate created for our Swarm
  - Certificate is issued for first manager node
  - join tokens are craeted
- Raft database create to store root CA, configs and screts
  - Encrypted by default on disk (1.13+)
  - No need for another key/value system to hold orchestration/screrets
  - replicates logs amongst Managers via mutual TLS in "control plane"

```text
docker node ls # Leader를 확인할 수 있음

docker service create alpine ping 8.8.8.8
docker service ls
docker service ps mystifying_borg
docker container ls
docker service update mystifying_borg --replicas 3
docker service ls
docker service ps mystifying_borg
```

```text
docker container ls
docker container rm -f mystifying_borg.1.mulozpqclegqoyzy8ksb353ck
```

swarm은 지정한 수만큼 유지를 하지만, 도커 서비스로 삭제를 하면 실행중인 컨테이너도 사라진다. (cleaning up)

docker service의 책임중 하나는 지시한 갯수(레플리카수)만큼 컨테이너를 (정상적으로) 생성하는 것이다

### 64. UI Change For Service Create/Update

### 65. Docker Machine Bug With Swarm

### 66. Creating a 3-Node Swarm Cluster

[https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/)

[https://www.bretfisher.com/docker-swarm-firewall-ports/](https://www.bretfisher.com/docker-swarm-firewall-ports/)

[https://www.digitalocean.com/community/tutorials/how-to-configure-custom-connection-options-for-your-ssh-client](https://www.digitalocean.com/community/tutorials/how-to-configure-custom-connection-options-for-your-ssh-client)

[https://docs.docker.com/machine/drivers/hyper-v/](https://docs.docker.com/machine/drivers/hyper-v/)

[https://www.digitalocean.com/?refcode=ee97875d52fa&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=CopyPaste](https://www.digitalocean.com/?refcode=ee97875d52fa&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=CopyPaste)

[http://get.docker.com](http://get.docker.com)

3개 각 노드는 동일 네트워크에 있어야 하며 특별한 port가 열려있어야함

Node 1

```text
$ docker swarm init --advertise-addr 167.172.130.64
```

Node 2, 3

```text
$ docker swarm join --token SWMTKN-1-0y8lquetegwcscxazrhb4ur0ny5p4vdbu4yphtkoom3ao5i97x-1j1kcmw7vz1d3ik24ejb8plil 167.172.130.64:2377
```

Node 1

```text
$ docker node update --role manager node2
$ docker swarm join-token manager
```

Node 3

```text
$ docker swarm join --token SWMTKN-1-0y8lquetegwcscxazrhb4ur0ny5p4vdbu4yphtkoom3ao5i97x-bbykwnfsgog1kx6b1yc4lewm0 167.172.130.64:2377
```

## Section 8. Swarm Basic Features and How to Use Them In Your Workflow

### 67. Scaling out with overlay networking

- —driver overlay (swarm wide bridge network)

⇒ The overlay network driver is used for container communication across a swarm.

- container to contaienr traffic inside a **single swarm**
- 각 서비스는 여러 네트워크에 연결될 수 있음 (eg. front-end , back-end)

⇒ Services can be attached to multiple Docker networks, and a network can have many containers.

```text
root@node1:~# docker network create --driver overlay mydrupal
ioprsw4oth1y9n5nk9hq7guu1
root@node1:~# docker network ls
$ docker service create --name psql --network mydrupal -e POSTGRES_PASSSORD=mypass postgres
$ docker service ls
$ docker service ps psql
```

overlay를 사용하면 같은 서브넷에 있는 것처럼 이요가능

특징으로는 같은 o네트워크에 있는 워커들이 expose한 포트로 전달됨 (80포트를 하나 열고있으면 그 노드로 80 모두 전송되더라 , drupal 예시 → 서버는 3개인데, 1개에만 컨테이너 돌아도 모든 ip로 접속했을 때 드루팔 나옴)

### 68. Scaling Out with Routing Mesh

위 현상은 라우팅 메시 였다.

- 서비스로 들어오는 패킷을 적절한 task로 라우팅
- spans all nodes in swarm
- use IP{VS from linux kernel
- Load balance swarm service across ther tasks;
- 동작하는 두가지 방식이 있다
  - 컨테이너 - 투 - 컨테이너 in overlay network (uses Virtual IP)
  -

```text
docker service create --name search --replicas 3 -p 9200:9200 elasticsearch:2
curl localhost:9200 #=> 3개 task로 Load Balancing...
```

### 70.

```text
docker network create --driver overlay frontend
docker network create --driver overlay backend

docker service create --name vote --replicas 3 --network frontend -p 80:80 bretfisher/examplevotingapp_vote

docker service create --name redis --network frontend --replicas 1 redis:3.2

docker service create --name worker  --network frontend --network backend --replicas 1 bretfisher/examplevotingapp_worker:java

docker service create --name db --network backend -e POSTGRES_HOST_AUTH_METHOD=trust --mount type=volume,source=db-data,target=/var/lib/postgresql/data postgres:9.4

docker service create --name result -p 5001:80 --network backend bretfisher/examplevotingapp_result

---

docker service ps result
docker service ps redis
docker service ps db
docker service ps worker

```

### 71. Swarm Stacks and Production grade compose

[https://docs.docker.com/compose/compose-file/#not-supported-for-docker-stack-deploy](https://docs.docker.com/compose/compose-file/#not-supported-for-docker-stack-deploy)

[https://github.com/BretFisher/ama/issues/8](https://github.com/BretFisher/ama/issues/8)

stack인 swarm 을 배워보자!

서비스의 스택이다.

- **_`스택`_**은 컴포즈 파일을 수용하여 서비스, 네트워크, 불륨을 설명한다.
- docker service create 대신 `docker stack deploy` 를 사용
- Stacks managed all those objects for us, including overlay network per stack. adds stack name to start of their name
- `deploy:` key in compose file, cant do `build:`

  → production에서는 build가 일어나지 않을 것이라고 가정

- compose는 `deploy:`를 무시함. Swarm은 `build:`를 무시함
- docker-compose cli not needed on swarm server
  → docker-compose cli는 개발/테스트를 위한 것이기 때문에

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/70fbe983-53d5-441e-874c-7f71338ba8eb/Screen_Shot_2020-09-06_at_20.21.17.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/70fbe983-53d5-441e-874c-7f71338ba8eb/Screen_Shot_2020-09-06_at_20.21.17.png)

⇒ Stack === 한 YAML 파일 안에, 여러 서비스를 관리, volumes, overlay networks를 관리

stackdms 1개의 스웜에서만 동작함.

→ stack은 secret도 관리 가능함

```text
docker stack deploy -c example-voting-app-stack.yml voteapp
### => 스케줄러에 할 일을 등록 함
docker stack services voteapp
docker stack ps voteapp #=> see actual tasks.
..

yml 수정 후....
=> docker stack deploy -c example-voting-app-stack.yml voteapp
```

TIP!.

어떤 서비스를 이용하던간에 소스를 이용한 인프라스트럭쳐 관리는 그 파일을 source of truth로 취급하고 항상 그 파일을 통한 조작을 수행하는 것이 좋다.

### 72. Secrets Storage for Swarm: Protecting Your Enviornment Variables

Secrets Storage

- 스웜에서 제공하는 가장 쉬운 보안 솔루션이다.
- Secret?
  - username and passwords
  - tls certificates and keys
  - ssh kes
  - any data you sould prefere not be on front page of news
- supports generic strings or binary content up to 500kb in size
- doesnt require apps to be rewritten

cont.

- manager node에만 저장됨

### 73. Using Secrets in Swarm Servcies

swarm에서 secret을 만드는 방법은 두가지인데

1. file에 제공
2. command line에 제공

1

```text
docker secret create psql_user psql_user.txt
```

→ 하드드라이브 등에 저장해야하는 다점

2.

```text
echo "myDBpassWORD" | docker secret create psql_pass -
```

→ root등이 bash 히스토리로 알 수 있게 됨

```text
docker secret ls
```

```text
$ docker service create --name psql --secret psql_user --secret psql_pass -e POSTGRES_PASSWORD_FILE=/run/secrets/psql_pass -e POSTGRES_USER_FILE=/run/secrets/psql_user postgres
$ docker service ps psql

$ docker exec -it psql.1.r9pxmf4cuu5e3a31le82t1xzq bash
$ ls /run/secrets
###=> psql_pass  psql_user
$ cat /run/secrets/psql_user

$ docker service update --secret-rm
### => secret로 한개의 레이어로 취급되어서 컨테이너가 정지되고 재시작 될 것임
```

### 74. Using Secrets with Swarm Stacks

```text
$ docker stack deploy -c docker-compose.yml mydb
### Network -> secret -> service 순으로 생성
$ docker secret ls
$ docker stack rm mydb
```

## Section 9: Swarm App Lifecycle

### 77. Using Secrets With Local Docker Compose

compose는 프로덕션용이 아니라 개발용임!!!

docker node ls → swarm이 없음을 확인

docker-compose up -d

docker-compose exec psql cat /run/secrets/psql_user

compose는 안전하진 않지만, 동작은 한다.

```text
pcat docker-compose.yml
```

→ swarm이 없어도 secret이 설정되긴한다.

→ filebased 시크릿인 경우에만

## Section 10. Container Registries: Image Storage and Distribution

### 82. Docker Hub: Digging Deeper

[https://hub.docker.com/](https://hub.docker.com/)

[DM+S10+Commands.txt](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/264c59bd-0ca8-4368-a02d-127ebc74e09b/DMS10Commands.txt)

[S10+Container+Registries+Slides.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fa5ea073-1f73-41e3-82c9-c06a975ab4b9/S10ContainerRegistriesSlides.pdf)

### 83. Understanding Docker Registry

[https://docs.docker.com/registry/recipes/mirror/](https://docs.docker.com/registry/recipes/mirror/)

[https://docs.docker.com/registry/garbage-collection/](https://docs.docker.com/registry/garbage-collection/)

[https://docs.docker.com/registry/configuration/](https://docs.docker.com/registry/configuration/)

Registry and Proper TLS

- HTTPS security → 도커는 무조건 https를 통해서만 대화함

```text
docker container run -d -p 5000:5000 --name registry registry
docker container ls
docker tag hello-world 127.0.0.1:5000/hello-world
docker push 127.0.0.1:5000/hello-world
### 모든 이미지 삭제

docker pull 127.0.0.1:5000/hello-world
docker container kill registry
docker container rm registry
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/edd691c8-cfd9-49fe-9081-9f6ec27d1df2/Screen_Shot_2020-09-09_at_23.10.58.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/edd691c8-cfd9-49fe-9081-9f6ec27d1df2/Screen_Shot_2020-09-09_at_23.10.58.png)

## Section 11. Docker in production

Start from Dockerfiles

alpine 버전이 작긴하지만, 꼭 이걸 사용할 필요는 없음. 일단 일반 버전으로 하더라도, 변경사항이 적도록 하는게 더 유리 (어짜피 container 레이어가 저장되므로)

### Dockerfile Anti-pattern

**Dockerfile Anti-pattern: Trapping Data**

- 컨테이너네 유니크 데이터를 담는 것 dont
- → 각 경로에 대한 VOLUME을 만들어야함

**Docker Anti-pattern: Using latest**

→ 태그 버전 명시

→ apt/yum/apk 패키지 사용시에도 크리티컬 버전 명시하는게 좋음

**cker Antipattern: leaving default config**

- not changing app default, or blindly copying vm conf
  - eg. php.ini, mysql.conf.d, java memory
- soluton → update default configs via ENV, RUN, ENTRYPOINT

**Dockerfile Antipattern : enviorment specipic**

- copy in enviroment config at image build

  ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2f55cde8-174c-496e-8cb7-8512265ccae7/Screen_Shot_2020-09-12_at_11.26.14.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2f55cde8-174c-496e-8cb7-8512265ccae7/Screen_Shot_2020-09-12_at_11.26.14.png)

→ solution: single dockerfile with default ENV's and overwirte per-env with ENTRYPOINT script

### 어떤 이미지를 선택해야할까?

- 이미지 사이즈를 염두하지말고 결정하라
- alpine은 나중에 변경하는 것으로고려
- 일단 현존하는 배포 프로세스에 맞춰서 진행

### Swarm

- 1Node → 한개의 장치에서 docker swarm init 으로 여러 프로세스 돌릴 수있음
- 3Node → HA, 한개의 노드가 실패해도 OK
- 5Swarm → better high availability, 하지만 그만큼 돈이 많이 들겠지. 두세개 fail해도 OK

엄청 많아져도 매니저는 5개 정도로 유지할 수 있다. 매니저 노드는 그만큼 메모리를 많이 먹으니 이를 염두해두고 계쏙 늘려도 괜찮다.

→ 이경우 컨테이너를 라벨과 constraints로 어디에 위치 시킬지 제어
→ 다중 워커 서브넷 on private/DMZ

⇒ 노드와 컨테이너는 항상 교체되고 새로 생성될 수 있음을 고려해야함

멀티플 스엄

- 나쁜 이유
  - 서로다른 하드웨어 세팅
  - 다른 서브넷 또는 보안그룹
  - 다른 AZ
  - 준수되어야하는 보안 경계

좋은 이유

- 지역적인 이유
- management boundaries usnign docker api (or docker ee rbac)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7e5788b6-d558-453e-a889-7b149022a7ac/Screen_Shot_2020-09-12_at_11.53.55.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7e5788b6-d558-453e-a889-7b149022a7ac/Screen_Shot_2020-09-12_at_11.53.55.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5ec1fb07-3b25-476a-9a61-3c14a9309425/Screen_Shot_2020-09-12_at_11.54.50.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5ec1fb07-3b25-476a-9a61-3c14a9309425/Screen_Shot_2020-09-12_at_11.54.50.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/da6e880e-9e6a-4cd5-ae65-8f19561ac48a/Screen_Shot_2020-09-12_at_11.55.16.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/da6e880e-9e6a-4cd5-ae65-8f19561ac48a/Screen_Shot_2020-09-12_at_11.55.16.png)

오케스트레이터를 써야할까?

- 도커 마이그렝션을 더 쉽게함
-

### 겨롤ㄴ

일단 채앋ㄱ랴ㅣㄷ, 애찯ㄱ채ㅡpose에 집중

- 편안한 os에 이란 고수
- 배관을 아웃소싱할 방법을 계쏙 찾아라
- 내 스택의 일부가

  ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/42ec3c5f-80c4-45af-9d85-b02b92f62f5c/Screen_Shot_2020-09-12_at_11.59.56.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/42ec3c5f-80c4-45af-9d85-b02b92f62f5c/Screen_Shot_2020-09-12_at_11.59.56.png)

## Section 12: The What and Why of Kubernetes

[S12+Slides+The+What+and+Why+of+Kubernetes.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5b5ff1cb-c5f3-4c8d-9788-de1a10ca777f/S12SlidesTheWhatandWhyofKubernetes.pdf)

[https://en.wikipedia.org/wiki/Kubernetes](https://en.wikipedia.org/wiki/Kubernetes)

[https://kubernetes.io/](https://kubernetes.io/)

### 92. Why Kubernetes

-

## Section 13. Kubernetes install and your first pods

[DM+S13+Commands+(Kubernetes+Install+and+Your+First+Pods).txt](<https://s3-us-west-2.amazonaws.com/secure.notion-static.com/63a91721-76fb-435b-a1e9-9ec0fa2f79f8/DMS13Commands(KubernetesInstallandYourFirstPods).txt>)

[S13+Slides+Kubernetes+Install+and+Your+First+Pods.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/41e8a507-97db-4ea9-a5b8-de4fd3fd64cf/S13SlidesKubernetesInstallandYourFirstPods.pdf)

### 96. Kubernetes architecture terminology

[https://kubernetes.io/docs/concepts/overview/components/#master-components](https://kubernetes.io/docs/concepts/overview/components/#master-components)

-

kubectl → cube control 이라고 불림

- Node: 싱글 서버 쿠버네티스 클러스터의
- kubelet : node들에서 도는 k8s 에이전트
- control plane: 클러스터를 관리하는 컨테이너의 집합
  - API 서버, 스케주러, 등을 포함
  - 때때로 master라고 불림
  - etcd 라는 RAFT 비슷한게 돌아감

### 97. 쿠버네티스 local install

[https://github.com/kubernetes/minikube/releases/](https://github.com/kubernetes/minikube/releases/)

[https://github.com/ubuntu/microk8s](https://github.com/ubuntu/microk8s)

[https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-windows](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-windows)

[https://www.katacoda.com/courses/kubernetes/playground](https://www.katacoda.com/courses/kubernetes/playground)

[https://labs.play-with-k8s.com/](https://labs.play-with-k8s.com/)

### 99. container abstraction

[https://kubernetes.io/docs/concepts/workloads/pods/](https://kubernetes.io/docs/concepts/workloads/pods/)

[https://kubernetes.io/docs/concepts/services-networking/service/](https://kubernetes.io/docs/concepts/services-networking/service/)

[https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)

- pod: 하나 또는 더 많은 컨테이너들이 돌아간다 한 노드에서
  - 기본 배포단위. 컨테이너는 항상 pods 안에 있음
- controller: for 다른 오브젝트나 pods를 생성하고 업데이트하기 위함
- Service: (스웜과는 쫌 다르게) pod에 연결될 네트워크 엔드포인트
- Namespace: Filtered group of objects in cluster

  ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a60ab900-861b-4820-bc97-4ac5d399e40c/Screen_Shot_2020-09-12_at_13.06.20.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a60ab900-861b-4820-bc97-4ac5d399e40c/Screen_Shot_2020-09-12_at_13.06.20.png)

### 100. Kubectl run, create, and apply

- ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b6bc550b-0177-462a-b085-be50bcf122e7/Screen_Shot_2020-09-12_at_14.02.45.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b6bc550b-0177-462a-b085-be50bcf122e7/Screen_Shot_2020-09-12_at_14.02.45.png)

스웜과 비교

- docker create → create
- docker swarm deploy ⇒ apply

### 101. Kubectl run, create and apply

[https://kubernetes.io/docs/reference/kubectl/cheatsheet/](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

[https://kubernetes.io/docs/reference/kubectl/docker-cli-to-kubectl/](https://kubernetes.io/docs/reference/kubectl/docker-cli-to-kubectl/)

2 ways to deploy pods

- commands
- yaml

```text
$ kubectl run my-nginx --image nginx
$ kubectl get pods
$ kubectl get all
$ kubectl delete deployment my-nginx
### clean up
$ kubectl get all
```

Pods → ReplicaSet → deployment

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d6850909-9f3f-47d9-9fa9-7b8ac9e8890a/Screen_Shot_2020-09-15_at_21.57.20.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d6850909-9f3f-47d9-9fa9-7b8ac9e8890a/Screen_Shot_2020-09-15_at_21.57.20.png)

- deploy 작업은 replica set을 컨틀로하는 것이다.

### 103. Scaling ReplicaSets

```text
$ kubectl run my-apache --image httpd
$ kubectl get all

$ kubectl scale deploy/my-apache --replicas 2
=== $ kubectl scale deployment my-apache --replicas 2
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6c6bcdc8-211f-49eb-9db4-c0c59d7eb0c4/Screen_Shot_2020-09-15_at_22.19.08.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6c6bcdc8-211f-49eb-9db4-c0c59d7eb0c4/Screen_Shot_2020-09-15_at_22.19.08.png)

### 104. Inspecting Kubernetes Objects''

```text
kubectl get pods
kubectl logs deployment/my-apache --follow --tail 1
kubectl logs -l run=my-apache
kubectl describe pod/my-apache-xxxx-yyyy
kubectl get pods

$ kubectl describe pod/my-apache-5d589d69c7-2nb5k
$ kubectl get pods -w
$ kubectl delete pod/my-apache-xxxx-yyyy
```

## Section 14. Exposing Kubernetes Ports

### 106. Service Types

[DM+S14+(Exposing+Kubernetes+Ports).txt](<https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9a0bd69f-bce3-4e51-9be7-53e30901978f/DMS14(ExposingKubernetesPorts).txt>)

[S14+Slides+Exposing+Kubernetes+Ports+with+Services.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/13d199f3-ff82-406f-994d-b80e34aff230/S14SlidesExposingKubernetesPortswithServices.pdf)

kubectl expose 는 존재하는 pods를 위한 서비스를 만듬

서비스는 pods의 안정적인 주소이다.

pods를 연결하려면 service가 필욯다ㅏ.

coreDNS가 service를 이름으로 resolve할 수 있게 한다.

다른 타입들의 서비스들이 있다

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e666d395-24d1-44b1-bb14-29a8b8c41e36/Screen_Shot_2020-09-15_at_23.32.40.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e666d395-24d1-44b1-bb14-29a8b8c41e36/Screen_Shot_2020-09-15_at_23.32.40.png)

- ClusterIP → default
  - 단일, 내부 vip 할당
  - 클러스터에서만 리쳐블
  - 포드는 앱의 포트 넘버로 닿을 수 있음
- NodePOrt
  - 높은 포트가 각 노드에 할당됨
  - 포트는 모든 노드의 ip에 열림
- LoadBalancer
  - 클라우드에서 가장 많이 사용됨
- ExternalName

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f39b5d44-a0a2-4f58-bc48-856ce59583ae/Screen_Shot_2020-09-15_at_23.35.44.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f39b5d44-a0a2-4f58-bc48-856ce59583ae/Screen_Shot_2020-09-15_at_23.35.44.png)

- ingress 라는 타입도도 있음

### 107. Creating a ClusterIP Service

```text
kubectl get pods -w
kubectl scale deployment/httpenv --replicas=5
kubectl expose deployment/httpenv --port 8888

➜  ~ kubectl get service
NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)    AGE
httpenv      ClusterIP   10.96.62.215   <none>        8888/TCP   19s
kubernetes   ClusterIP   10.96.0.1      <none>        443/TCP    3d5h

$ kubectl run --generator run-pod/v1 tmp-shell --rm -it --image bretfisher/netshoot -- bash
$ kubectl run --generator run-pod/v1 tmp-shell --rm -it --image bretfisher/netshoot -- bash
bash-5.0# curl httpenv:8888
```

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/84bddbbc-2d74-4b8b-ae1c-dd8bae78790f/Screen_Shot_2020-09-15_at_23.45.32.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/84bddbbc-2d74-4b8b-ae1c-dd8bae78790f/Screen_Shot_2020-09-15_at_23.45.32.png)

### 108.

```text
kubectl get all
kubectl expose deployment/httpenv --port 8888 --name httpenv-np --type NodePort
kubectl get services
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
httpenv      ClusterIP   10.96.62.215    <none>        8888/TCP         7m50s
httpenv-np   NodePort    10.104.145.49   <none>        8888:32600/TCP   33s
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP          3d5h

###=> 오른쪽 32600 이 아웃사이드로 노출된 포트 (기본적으로 30000 ~ 32767 사이 값이 할당됨)

```

```text
$ kubectl expose develoyment/httpenv --port 8888 --name httpenv-lb --type LoadBalancer
$ kubectl get services
NAME         TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
httpenv      ClusterIP      10.96.62.215    <none>        8888/TCP         17m
httpenv-lb   LoadBalancer   10.107.125.9    localhost     8888:30552/TCP   10s
httpenv-np   NodePort       10.104.145.49   <none>        8888:32600/TCP   10m
kubernetes   ClusterIP      10.96.0.1       <none>        443/TCP          3d5h
```

Cleanup

```text
$ kubectl delete service/httpenv service/httpenv-np
$ kubectl delete service/httpenv-lb deployment/httpenv
```

### 109. Kubernetes Services DNS

```text
kubectl get namespaces
```

앱이 커지면 네임스페이스를 쓸 수 있지만 작은 경우 대부분 이용하지 않는다.

## Section 15. Kubernetes Management Techniques

[DM+S15+(Kubernetes+Management+Techniques).txt](<https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c9f74771-4587-47e4-8a80-21c80e3f3b82/DMS15(KubernetesManagementTechniques).txt>)

[S15+Slides+Kubernetes+Management+Techniques.pdf](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e65efacb-bf7a-49a2-a244-732b53dc7e80/S15SlidesKubernetesManagementTechniques.pdf)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/91def5f8-48a4-489a-93a8-22d0ece64557/Screen_Shot_2020-09-21_at_8.32.21.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/91def5f8-48a4-489a-93a8-22d0ece64557/Screen_Shot_2020-09-21_at_8.32.21.png)

```text
kubectl create deployment test --image nginx --dry-run
```

### 112. The Future of Kubectl Run

[https://kubernetes.io/docs/reference/kubectl/conventions/#best-practices](https://kubernetes.io/docs/reference/kubectl/conventions/#best-practices)

kubectl run은 프로덕션에서 추천되지 않음

- 간단한 dev/test 또는 pods의 트러블슈팅에 사용하라

```text
kubectl run test --image nginx --dry-run
kubectl run test --image nginx --port 80 --expose --dry-run
kubectl run test --image nginx --restart OnFailure --dry-run
kubectl run test --image nginx --restart Never --dry-run
kubectl run test --image nginx --schedule "*/1 * * * *" --dry-run
```

### 113. Imperative vs Declarative

- Imperative: 프로그램이 어떻게 동작하는지에 초점
- Declarative: 프로그래미이 어떤것을 성취해야하는지에 초점

#### Imperative

```text
kubectl run, kubectl craete deployment, kubectl update
```

자동화 하기가 쉽지않다.

state를 알 때, 시작할 때, cli에서 간단한 방법

#### Declarative

```text
kubectl apply -f my-resources.yaml
```

- 현재 상태를 알 피룡가 업슴
- 최종 상태만 알고있으면 된다.
- yaml을 잘 다뤄야하기에 kubectl run 보다는 초반에 할 일이 ㅇ많다.
- 자동화 하기 좋다 (Source of Truth)

### 114. Three Management Approaches

- imperative commands: run, expose, scale, edit, create deployment
  - best for dev/learning/personal projects
  - easy to learn, hardest to manage over time
- imperative objects: `create -f file.yml, replace -f file.yml, delete...`
  - good for prod of small env, single file per command
  - store your changes in git-based yaml files
  - Hard to automate
- delarative objects: `apply -f file.yml` or `dir\`, `diff`
  - best for prod, easier to automate
  - harder to understand and predict changes

#### most important rule:

- dont mix the three approaches

#### Best recommendations

- learn the imperativ e clit for easy control of local and test setups
- move to `pply -f file.yml` and `pply -f directory` for prod
- store yaml in git, git commit each change before you apply
- this trains you for later doing GitOps → git커밋시 자동으로 클러스터에 반영

## Section 16. Moving to Declarative Kubernetes YAML
