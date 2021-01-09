# Microfrontends with React: A Complete Developer's Guide

## 더 읽어보기

- [ ] https://blog.bitsrc.io/how-to-develop-microfrontends-using-react-step-by-step-guide-47ebb479cacd
- [ ] https://medium.com/@franklsm1/building-micro-frontends-with-react-5c79f6f91bea
- [ ] https://medium.com/bb-tutorials-and-thoughts/how-to-implement-micro-frontend-architecture-with-react-5ab172a0fec7
- [ ] https://floqast.com/engineering-blog/post/implementing-a-micro-frontend-architecture-with-react/

## 다시보기

- [ ] 12. Understanding Module Federation

## 섹션 1:The Basics of Microfrontends

### Microfrontend

- What is?
  - **monolithic app** 을 여러 작은 앱으로 나누는 것
  - 각 앱은 제품의 서로 다른 기능을 책임짐
- Why use?
  - 여러 엔지니어링 팀이 독립적으로 작업 가능 (기술 스택이 달라도 OK)
  - 작은 앱이 이해하기 쉽고, 변경하기 쉬움

### 앱구성

```plain
    Container
    (언제/어디서 Microfrontend를 보여줄지 결정)
        |
  ---------------
  |             |
  (MFE1)        (MFE2)
ProductsList    Cart
```

어떻게 두가지를 합칠까? 정답은 없다. 여러가지가 있는데 장단점이 있음

1. Build-time 통합 (compile-time): 컨테이너가 브라우저에 로드되기 **전에**, ProductsList 소스코드에 접근 가능
   - 쉬운 설치와 이해
   - 컨테이너가 매번 re deploy되어야함
   - Container와 ProductsList가 함께 커플링을 시도하는 경향이 있음
   - => ProductsList를 NPM에 등록 하고 Container팀이 ProductsList를 의존성으로 등록하고 빌드 후 모든 코드를 가지는 번들을 배포
2. Run-time 통합 (client-side): 컨테이너가 브라우저에서 로드된 **후에**, ProductsList 소스코드에 접근 가능
   - 언제든 독립적으로 배포 가능
   - 여러 버전이 배포되고 Container가 어떤 버전을 사용할지 선택가능
   - Tooling + setup이 더 복잡하다.
   - => NPM에 배포하지 않고, 특정 static url로 번들 배포 (`https://.../prouctslist.js`). 그 후에 컨테이너 앱이 로딩되고 컨테이너 앱에서 이 .js 파일을 다운로드하고 실행
3. Server 통합: Container가 **로드되기 전에**, **서버가** ProductsList를 포함할지 말지 결정 (백엔드 코드가 많이 필요해서 이 강의에서는 실습X)

이 코스에서는 (2)번 방법을 `Webpack Module Federation`을 이용해 처리

### Setup

```bash
# products
$ mkdir products && cd products
$ yarn add webpack@5.4.0 webpack-cli@4.3.0 webpack-dev-server@3.11.0 faker@5.1.0 html-webpack-plugin@4.5.0

# container
$ yarn add webpack@5.3.2 webpack-cli@4.1.0 webpack-dev-server@3.11.0 html-webpack-plugin@4.5.0 nodemon
```

## 섹션 2:The Basics of Module Federation

결과적으로 MFE의 index.html 파일은 개발중에만 사용되고 프로덕션에서는 container의 index.html이 사용된다.

### Webpack

Container

```js

    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        products: "products@http://localhost:8081/remoteEntry.js",
        // `products:` => import abc from 'products'로 사용가능하게 됨
        // <PRODUCTS 웹팩 설정에 정의된 name>@<remoteEntry파일 URL>
        // <PRODUCTS 웹팩 설정에 정의된 name>은 id와 동일해선 안된다.
        // 왜냐면 빌드된 파일에서 var <PRODUCTS 웹팩 설정에 정의된 name> 으로 정의되기 때문이다.
      },
    }),
```

MFE

```js
    new ModuleFederationPlugin({
      name: "products",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductsIndex": "./src/index",
      },
    }),
```

### Entry

Container (=== `Host`: `Remove`로 부터 코드를 요구)

```js
// index.js
import("./bootstrap.js"); // import를 이용해 웹팩이 실행전에 필요한 코드를 파악할 수 있음
```

```js
// bootstrap.js
import "products/ProductsIndex";
// products -> remoteEntry.js -> src/index.js의 관련 의존성 모두 다운로드
```

## 섹션 3:Sharing Dependencies Between Apps

웹팩에서 다음과 같이 설정하면 동일 모듈로 취급하고 한번만 가져온다. 이는 `package.json`에 기록된 정보를 바탕으로 하며 `~` `^`로 기록된 경우 major 버전에 따라 한번만 가져온다. (버전을 완전히 명시하는 경우 각각 가져온다.)

- 예1) ^5.0.0, 5.1.0 => 5.1.0 한번
- 예2) 5.0.0, 5.1.0 => 5.1.0, 5.0.0 두번

```js
    new ModuleFederationPlugin({
      name: "products",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductsIndex": "./src/index",
      },
      shared: ["faker"],
    }),
```

```js
// 한개의 버전을 사용하도록 강제할 수있다.
// 호환되지 않는 경우 콘솔에 경고가 표시되니 고쳐주어야함
        faker: {
          singleton: true,
        },
```

## 섹션 4:Linking Multiple Apps Together

## 섹션 5:Generic Ties Between Projects

## 섹션 6:Implementing a CI/CD Pipeline

## 섹션 7:Deployment to Amazon Web Services

## 섹션 8:Microfrontend-Specific AWS Config

## 섹션 9:Handling CSS in Microfrontends

## 섹션 10:Implementing Multi-Tier Navigation

## 섹션 11:Performance Considerations

## 섹션 12:Authentication in Microfrontends

## 섹션 13:Using Other Frontend Frameworks
