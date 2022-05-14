# Try Nest.js

> https://nestjs.com/
>
> 마크가 호랑이가 아니라 고양이였음;;

Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications

## 특징

- Anglar, Spring과 구조가 동일하다
- 내부적으로 express or fastify를 추상화 해서 사용함
- DI를 지원하며 OOP 적으로 해결하는 경향
- ROR 처럼 폴더구조, 방법에 대한 제약이 존재
- OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming)
- `Architecture` 문제를 해결
- The architecture is heavily inspired by Angular

## 기타

- typeorm 보다는 prismadb가 뜨는 편

## 따라하면서 배우는 NestJS

- 유튜브: https://www.youtube.com/watch?v=3JminDpCJNE
- 인프런: https://www.inflearn.com/users/@johnahn
- board-example

### 모듈

모듈은 기능 집합이라고 볼 수 있겠다.

### 컨트롤러

요청을 처리하고 클라이언트에 응답을 반환한다.

### 프로바이더와 서비스

- 예를들어 컨트롤러에 필요한 것들을 사용할 수 있게 DI 해줌
- 서비스: 유효성 체크, 데이터 베이스 아이템 생성 등의 로직 처리 (즉 업무로직이 여기 위치)

### 모델

> class or interface 사용

- 게시물의 id, 이름, 설명 등... 을 정의
- DB 등과 상호작용

### DTO

- 계층간 데이터 교환을 위한 객체
- DB에서 데이터를 얻어 Service or Controller 등에 보낼 떄 사용하는 객체
- 만들 때 interface or class 를 사용할 수 있지만 class가 추천되는 방법
- Why? 데이터 유효성 체크에 효율적이며 더 안정적인 코드를 만들어줌 (타입으로도 사용됨)
  - (title, description을 여러군데서 사용하는데 이를 한군데서 관리 가능)

### Pipe

`@Injectable` 데코레이터로 주석이 달린 클래스. data transformation, data validation을 위해서 사용됨.

(실제 컨트롤러 핸들러에 도착하기 전에 처리되는 미들웨어 같은 느낌인듯)

#### Data Transformation

- 문자 -> 정수
- 정수 -> 문자

등의 필요한 정보 변환

#### Data Validation

#### 사용 방법

1. 핸들러레벨

```ts
@Post()
@UsePipes(pipe)
create() {
  // ...
}
```

2. 파라미터레벨

```ts
@Post()
create(@Body('title', ParameterPipe) title) {
  // ...
}
```

3. 글로벌레벨

```ts
async function bootstrap() {
  const app = await NestFactory.craete(AppModule);
  app.useGlobalPipes(GlobalPipes); // 그롤벌 파이프
  await app.listen(3000);
}
bootstrap();
```

#### Built-in pipe

6가지 기본제공

- ValidationPipe
- ParseIntPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- DefaultValuePipe

## 오랜만이다 ORM, TypeORM

(Object Relational Mapping)

- ORM은 Object 객체와 관계형 Database 사이에 매핑해주는 녀석
