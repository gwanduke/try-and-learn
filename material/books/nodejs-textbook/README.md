# Node.js 교과서

> 2020년 12월 16일 11:00 ~ 2020년 12월 18일 07:00 (3일간)

## 목차

- [Node.js 교과서](#nodejs-교과서)
  - [목차](#목차)
  - [❌ 복습 및 정리](#-복습-및-정리)
  - [✅ 1장. 노드 시작하기](#-1장-노드-시작하기)
  - [✅ 2장. 알아두어야할 자바스크립트](#-2장-알아두어야할-자바스크립트)
  - [✅ 3장. 노드 기능 알아보기](#-3장-노드-기능-알아보기)
    - [내장 모듈](#내장-모듈)
    - [파일 시스템 접근](#파일-시스템-접근)
    - [이벤트 이해하기](#이벤트-이해하기)
    - [예외 처리하기](#예외-처리하기)
  - [✅ 4장. http 모듈로 웹 서버 만들기](#-4장-http-모듈로-웹-서버-만들기)
    - [Cluster](#cluster)
  - [✅ 5장. 패키지 매니저](#-5장-패키지-매니저)
  - [✅ 6장. 익스프레스 웹 서버 만들기](#-6장-익스프레스-웹-서버-만들기)
  - [✅ 7장. MySQL](#-7장-mysql)
  - [✅ 8장. 몽고디비](#-8장-몽고디비)
    - [Mongoose ODM](#mongoose-odm)
  - [❌ 9장. 익스프레스로 SNS 서비스 만들기](#-9장-익스프레스로-sns-서비스-만들기)
    - [Sequelize](#sequelize)
    - [Passport](#passport)
    - [Multer](#multer)
  - [❌ 10장. 웹 API 서버 만들기](#-10장-웹-api-서버-만들기)
  - [✅ 11장. 웹 소켓으로 실시간 데이터 전송하기](#-11장-웹-소켓으로-실시간-데이터-전송하기)
  - [✅ 12장. 실시간 경매 시스템 만들기](#-12장-실시간-경매-시스템-만들기)
  - [✅ 13장. 구글 API로 장소 검색 서비스 만들기](#-13장-구글-api로-장소-검색-서비스-만들기)
  - [✅ 14장. CLI 프로그램 만들기](#-14장-cli-프로그램-만들기)
  - [❌ 15장. AWS와 GCP로 배포하기](#-15장-aws와-gcp로-배포하기)
  - [✅ 16장. 서버리스 노드 개발](#-16장-서버리스-노드-개발)

## ❌ 복습 및 정리

개념적인 부분은 헷갈릴만한 부분만 따로 정리하고, 실습은 눈으로만 보면 나중에 또 찝찝할 것 같아서 왠만큼 다 직접 따라해보았다. 힘들었지만 도움은 많이 된 것같다. express 코드를 보면서 또 인증 플로우에 아리까리한게 있었는데 많이 해결되었다. 실습 프로젝트 마다 공통되는 부분이 있어서 이제 거의 통달한 것같다. 훌륭한 책이었다.

주요 내용을 모두 옮겨 적어서 책을 다시 볼 필요는 없을 것같다. 그래도 몇번 더 복습하도록 하자!

- [x] 1회독
- [ ] 2회독
- [ ] Red 플래그 포스트잇 다시 확인해보고, 어려움이 없는 것은 제거
- [ ] 3회독

## ✅ 1장. 노드 시작하기

자바스크립트 런타임 (특정 언어로 만든 프로그램을 실행할 수 있는 환경)

- 이벤트기반
- 논 블록킹 IO
- 싱글스레드

```plain
------------------------
| Node.js Core Library |
|----------------------|
|    Node.js Bindings  |
|----------------------|
|    V8    |   libuv   |
------------------------
```

> setTimeout은 브라우저에서 4ms, 노드에서 1ms 지연이 있다.

- 노드는 싱글스레드이기에 CPU 코어를 하나만 사용
- 비동기 I/O이기 때문에 IO가 많은 작업에 유리, CPU가 많이 요구되는 작업에 불리

## ✅ 2장. 알아두어야할 자바스크립트

- ajax: 비동기적으로 웹서비스를 개발하기 위한 기술. 페이지 이동없이 서버에 요청/응답

  ```js
  var xhr = new XMLHttpRequest();

  // 또는 xhr.onload, xhr.onerror로 구분도 가능함
  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status / 100 === 2) {
        console.log("성공");
      } else {
        console.error("실패");
      }
    }
  };
  xhr.open("GET", "https://example.com/api/test");
  xhr.send();
  ```

- FormData

  ```js
  var formData = new FormData();
  formData.append("name", "gwanduke");

  xhr.open("POST", "http...");
  xhr.send(formData);
  ```

- encodeURIComponent, decodeURIComponent

  ```js
  xhr.open("GET", "https://.../search/" + encodeURIComponent("검색어"));
  xhr.send();

  // decodeURIComponent('%EB%85');
  ```

- data 속성, dataset

  ```js
  el.dataset.someAttr = "🔥";
  // <div id="el" data-some-attr="🔥">
  ```

## ✅ 3장. 노드 기능 알아보기

- 모듈: 특정한 기능을 하는 함수나 변수들의 집합 (보통 파일 하나가 모듈 하나)
- console
  - `console.time(레이블)`, `console.timeEnd`
  - `console.log`
  - `console.error`
  - `console.dir(객체, 옵션)`
  - `console.trace(레이블)`
- 파일
  - `__filename`: /Users/gwanduke/filename.js
  - `__dirname`: /Users/gwanduke
- module, exports
  - module.exports와 exports는 동일 객체 참조 (`module.exports` === `exports`)
  - `exports -> module.exports -> {}` 형태로 참조하므로 `exports`에 값을 넣을때에는 참조가 깨지므로 주의해야함
- process: 현 프로세스에 대한 정보 (.version, .platform, .pid, .uptime() 등...)
  - process.env: 시스템 환경 변수 정보
  - process.nextTick(cb): cb가 microtask로 큐됨
  - process.exit(코드): 현 실행중인 프로세스 종료 (코드 - 0 정상종료, 1 비정상 종료)

### 내장 모듈

- os
- path
  - join, resolve의 차이: resolve는 '/'를 만나면 절대경로로 인식해 앞 경로 무시
- url
  ![URL: 위(lagacy Node), 아래(WHATWG)](./url.png)

  ```js
  const url = require("url");

  const URL = url.URL;
  new URL("..."); // WHATWG
  url.parse("..."); // old Node
  ```

- querystring: node url을 사용할 때 search 부분 객체로 변경가능한 모듈
- crypto

  - 단방향 암호화

    - `crypto.createHash(알고리즘).udpate(문자열).digest(인코딩)`
    - (`crypto.createHash('sha512').update('비밀번호').digest('hex')` 식으로 사용)

      ```plain
      비밀번호  -----> 해시함수 -----> 다이제스트
              <--X--        <-----
      ```

    - (비밀번호/salt/반복횟수를 입력으로 받는 **pbkdf2**) 또는 **bcrypt**, **scrypt** 등 사용

  - 양방향 암호화
    - `crypto.createCipher(알고리즘, 키)`
    - `crypto.createDecipher(알고리즘, 키)`
    - 동일 키를 이용해 암/복호화 가능

- util
  - util.deprecate (함수가 deprecated 처리되었음을 알려주는 헬퍼)
  - util.promisify (콜백 패턴을 프로미스 패넡으로 변환해줌)

### 파일 시스템 접근

fs 모듈 (브라우저에서는 다운로드/파일 시스템 접근이 허용되지 않음)

- sync 함수를 제공하지만, 많은 파일을 처리하는 경우 메인스레드가 I/O작업 완료를 기다려 대기하므로 성능적으로 불리함
- 파일을 읽고 쓰는데에는 다음 두가지 방식
  - 버퍼: 파일의 크기만큼 버퍼가 필요하고(단점), 버퍼 완료시 이를 처리할 수 있음
  - 스트림: 버퍼의 크기를 작게 만들어 여러번에 걸쳐 보내는 방식 (chunk), `pipe` 사용가능

### 이벤트 이해하기

```js
const EventEmitter = require("events");

const myEvent = new EventEmitter();
myEvent.addListener("event1", () => {
  console.log("이벤트 1");
});
myEvent.emit("event1");
```

### 예외 처리하기

- 처리하지 못한 에러는 노드 프로세스를 멈추게 함
- `try ~ catch`로 적절히 해결
- `process.on('uncaughtException')`으로도 가능하나, 다음 동작의 보장을 할 수 없으므로 가능하면 `process.exit()`로 종료시키고 아예 재시작할 것을 권장

## ✅ 4장. http 모듈로 웹 서버 만들기

- `Set-Cookie` 헤더를 설정함으로서 쿠키를 설정할 수 있다.
  - `res.writeHead(200, { 'Set-Cookie': 'mycooie=test' })`
- 세션은 꼭 쿠키로 구현하지 않아도됨. 세션 정보는 보통 DB에 저장 (메모리 부족 or 앱 종료시 사라짐 예방)
- https, http2 모듈 사용가능하며 인증서, 비밀키 파일이 있다면 secure 적용 가능

### Cluster

- 장점
  - cluster 모듈은 싱글 스레드인 노드가 CPU 코어를 모두 사용가능하게 해주는 모듈 (여러 코어로 운영 가능)
  - 포트를 공유하는 노드 프로세스를 여러개 둘 수 있음 (요청 분산)
  - 마스터에서 여러 프로세스를 fork하는 식으로 운영됨
- 단점
  - 세션을 공유하지 못할 수 있으나 -> redis 등으로 해결 가능

실무에서는 pm2 등의 모듈로 cluster 처리

## ✅ 5장. 패키지 매니저

> 라이센스 확인하자!

- SemVer (Semantic Versioning): 배포시에는 무조건 유의미한 버전을 올려주어야함 (동일 버전 배포 X)
  - major: 하위 호환 X
  - minor: 하위 호환 O
  - patch: 기능 추가가 아니라, 기존 기능에 문제가 있어 수정 버전
  - 기호
    - `^`: minor 버전까지만 설치/업데이트
    - `~`: patch 버전까지만 설치/업데이트
    - `>`, `<` , `>=`, `<=`, `=`
    - `express@latest`, `express@x`, `express@1.x`
- `npm outdated`: 업데이트 가능한 패키지 확인
- `npm update [패키지명]`: 위 명령 조회시 wanted로 명시된 버전으로 업데이트
- `npm uninstall [패키지명]`

## ✅ 6장. 익스프레스 웹 서버 만들기

- `app.use((req, res, next) => {})`로 미들웨어 등록 가능
- `next()` 함수의 인자로 "route"를 넣으면 주소와 일치하는 다음 라우터로 이동(그 사이 미들웨어는 무시). 그 외 다른 값은 미들웨어/라우터를 건너뛰고 에러 핸들러로 이동 (`next()`, `next('route')`, `next(error)`)
- 자주 쓰이는 미들웨어
  - `morgan`: 요청에 대한 정보를 콘솔에 기록
  - `winston`: 파일/데이터베이스 로그
  - `body-parser`(내장): 요청 본문 해석
  - `cookie-parser`
  - `static`(내장): 정적 파일 제공 (다음 라우터 실행X, 파일 못찾은 경우만 다음 라우터 수행. 가능하면 상단에 위치하여 불필요한 미들웨어 실행방지 하는 것이 좋음)
  - `express-session`: 세션 관리용 미들웨어
  - `connect-flash`: 일회성 메시지를 웹브라우저에 나타낼때 유용
- 라우터도 일종의 미들웨어임 (`app.use(베이스경로, someRouter)`, `app.get(...)`, `app.post(...)`)
  - `var router = express.Router()`로 생성. `router.get(...)`식으로 추가
- 응답객체 res
  - `res.send`: 버퍼 데이터, 문자열전송, HTML, JSON 등..
    - `res.sendFile`
    - `res.json`
  - `res.redirect(주소)`
  - `res.render('템플릿파일경로', { 변수 })`
- 에러 미들웨어
  - 에러 객체는 development 환경에서만 표시됨 (보안위함)

미들웨어가 많으면 그만큼 앱이 느려지므로 선별적으로 사용

## ✅ 7장. MySQL

> 오랜만이라 문법이 암기되어있지 않은점 외에는 어려움이 없었다.
>
> Sequelize는 docs를 보고 그 때 그 때 처리하면 되겠다.

```sql
CREATE SCHEMA nodejs;
use nodejs;
```

```sql
CREATE TABLE nodejs.comments (
  id INT NOT NULL AUTO_INCREMENT,
  commenter INT NOT NULL,
  comment VARCHAR(100) NOT NULL,
  INDEX commenter_idx (commenter ASC),
  CONSTRAINT commenter
  FOREIGN KEY (commenter)
    REFERENCES nodejs.users (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
COMMENT = '댓글'
DEFAULT CHARSET=utf8
ENGINE=InnoDB;
```

```sql
INSERT INTO nodejs.users (name, age) VALUES ('gwanduke', 31);
```

```sql
SELECT *
  FROM nodejs.users
  WHERE age > 30
  ORDER BY age DESC
  LIMIT 1
  OFFSET 1;
```

```sql
UPDATE nodejs.usere SET comment = "하이!" WEHRE id = 2;
```

```sql
DELETE FROM nodejs.users WHERE id = 2;
```

## ✅ 8장. 몽고디비

| SQL                     | NoSQL                  |
| ----------------------- | ---------------------- |
| 규칙에 맞는 데이터 입력 | 데이터 입력이 자유로움 |
| 테이블간 JOIN 지원      | JOIN X                 |
| 트랜잭션 O              | 트랜잭션 X             |
| 안정성, 일관성          | 확장성, 가용성 좋음    |
| 테이블, 로우, 컬럼      | 컬렉션, 도큐먼트, 필드 |

```plain
> use nodejs
> show dbs
> db
> db.createCollection('users')
> show collections
> db.users.save({ ... });
> db.users.find({ _id: 1 })
// { "_id": ObjectId("123") }
> db.comments.save({ commenter: ObjectId("123"), ... })
> db.users.udpate({ name: 'gwanduke' }, { $set: { comment: 'Hello' }})
> db.users.remove({ name: 'gwanduke' })
```

### Mongoose ODM

`mongoose`는 **ODM**이라 불림

- `populate`를 이용하면 JOIN을 흉내낼 수 있음
- mongodb에는 Schema가 없으나, mongoose에서 제공해 필터링 가능

## ❌ 9장. 익스프레스로 SNS 서비스 만들기

```plain
$ sequelize db:create
<!--  -->
```

- 리소스간 관계가 중요한 경우 RDBMS가 유리
- dontenv 패키지 + .env 로 비밀키 관리

### Sequelize

- 각 모델을 정의하고 관계는 다른 파일에서 따로 정의 가능하다.
- 그러면 sync시 관계테이블도 자동 생성된다.

### Passport

- 로그인 과정
  1. 로그인 요청
  2. passport.authenticate 메서드 호출
  3. 로그인 전략 수행
  4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
  5. req.login 메서드가 passport.serializeUser 호출
  6. req.session에 사용자 아이디만 저장
  7. 로그인 완료
- 로그인 이후
  1. 모든 요청에 passport.session() 미들웨어를 통해 passport.deserializeUser 호출
  2. req.session에 저장된 아이디로 DB에서 사용자 조회
  3. 조회된 사용자 res.user에 저장
  4. 이 후 라우터에서 req.user로 객체 사용 가능
- Strategy라는 개념의 미들웨어로 로그인 처리

### Multer

- Muter는 미들웨어 역할을 한다.
- multipart인 데이터를 처리할 때 편리하다.

## ❌ 10장. 웹 API 서버 만들기

- [ ] 토큰 재발급과 refresh 토큰

- JWT
  - `헤더.페이로드.시그니쳐` 형태
  - 비밀키를 이용해 만들며 후에 이 비밀키로 위변조 감지
  - 변조 여부를 알 수 있으므로, 내부 데이터를 신뢰하고 사용
  - 토큰에는 유효기간이 있으며, 만료시 갱신이 필요함

## ✅ 11장. 웹 소켓으로 실시간 데이터 전송하기

- 웹소켓
  - HTML5 스펙의 실시간 양방향 데이터 전송 기술
  - WS 프로토콜 사용
- SSE (Server Sent Evnet)
  - EventSource 객체 사용
  - 서버 -> 클라이언트로 전송만 가능한 단방향 기술 (주식 차트 등에 유용)
- socket.io
  - 편리한 기능을 제공
  - 첫 연결시 HTTP 폴링방식으로 연결하고 웹소켓 사용가능한 경우, 웹소켓 업그레이드

## ✅ 12장. 실시간 경매 시스템 만들기

> 웹소켓, SEE에 대한 이해만 있으면 어렵지 않다.
>
> 오히려 socket.io 공식문서를 한번 보는게 도움이 된다.

## ✅ 13장. 구글 API로 장소 검색 서비스 만들기

> API를 단순히 사용하는 것이라 안해봐도 되겠다. 필요시 API 찾아보고 만들면 된다.

## ✅ 14장. CLI 프로그램 만들기

> 읽기만 했는데, 기존에 만들어본 경험이 있으니 안해도 되겠다. 필요할 때 API 찾아보고 하면 된다.

- `#! /user/bin/env node`는 주석이지만 맥, 유닉스 같은 운영체제에서 node 명령으로 이 파일을 실행하라는 뜻임
- `process.argv`를 파싱해 활용할 수 있다.

## ❌ 15장. AWS와 GCP로 배포하기

- env === production 에서
  - `morgan('combined')` 사용 (더많은 로그 남기기)
  - express-env
    - proxy: true (리버스 프록시 있는 경우)
    - secure: true
  - sequelize
    - config.`js`로 DB config 관리하기
    - 한글 저장 되지 않는 문제 발생 가능 하므로, 각 모델에 `charset: utf8`, `collate: utf8_general_ci` 지정
- cross-env 사용: 동적으로 process.env 변경 가능. 모든 운영체제에서 동일하게 동작하도록 추상화.
- retire or npm audit로 취약점(패키지) 점검
- pm2 같은 서버 운영 패키지 사용

  - crash 이후 자동 재시작
  - 멀티 프로세싱 (멀티스레딩이 아님을 주의, 메모리 공유 X)

  ```plain
  $ pm2 list // 현재 실행중인 프로세스 확인
  $ pm2 kill // 프로세스 종료
  $ pm2 reload all // 서버 재시작
  $ pm2 start app.js -i 0 // 현 CPU 개수만큼 프로세스 생성해 실행
  $ pm2 monit // 현 프로세스 모니터링
  <!--  -->
  ```

- winston: 로그를 기록함과 동시에 파일 같은 영구 저장소에 기록 가능
- helmet, hpp: 서버가 노출 될 수 있는 각종 취약점 보완해주는 미들웨어
- connect-redis
- nvm, n: 노드 버전 매니저

## ✅ 16장. 서버리스 노드 개발

서버를 클라우드 서비스가 대신 관리해줘서, 개발자나 운영자가 서버를 관리하는 드는 부담이 줄어들어 서비스 로직 작성에만 집중 가능! 하다는 의미...!

- FaaS (function as a service): Lambda, Cloud Function 등...
- CPU를 많이 먹는 백그라운드 작업을 서버를 계속 운영하지 않고 클라우드 상의 함수 서비스에 맡김으로서 비용 절감 효과
- S3->Lambda 같은 조합으로 트리거 처리 가능
