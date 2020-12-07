# Webpack 5: The Complete Guide For Beginners

## ✅ 복습 및 정리

2019년 6월 4일 구매했었는데, 그 때는 급한 마음에 쭉 보기만 했었나보다. 일하면서 웹팩 사용을 많이 했어서 그런지 내용들이 다 쉽게 느껴졌다.

잘 몰랐어서 헷갈릴 또는 특이 했던 것들만 아래에 요약해두었으니 따로 추가 정리할 필요는 없겠다.

## Section 2

- Grunt나 Gulp는 자바스크립트 파일과 assets를 합칠 수 있었지만, 파일들간에 의존성을 파악하진 못함
- 웹팩은 코드와 assets를 한 곳에서 관리할 수 있는 툴

## Section 3 - loaders

- output - `publicPath` 옵션을 사용하면 assets가 cdn에 위치하더라도 번들링된 내용 중에 이미지 등이 그 주소를 향하게 만들 수 있다.

## Section 4 - Plugins

- loaders가 할 수 없는 추가적인 작업을 진행할 수 있다.
- 플러그인은 만들어진 번들을 수정할 수도 있다. 예를 들면, uglifyJSPlugin은 만들어진 bundle.js를 minimize한다.
- 최근엔 uglify 대신 terser가 추천된다
- MiniCssExtractPlugin 같은 플러그인을 사용할 때에도 파일이름을 지정할 때 `[contenthash]` 같은게 사용가능하다.

## Section 5 - Production vs Development Builds

- mode: none, development, production (https://webpack.js.org/configuration/mode/)
- dev/prod 설정 분리해 작성하기

## Section 6 - Multiple Page Applications

- 여러 엔트리를 지정해 여러 번들을 만들어낼 수 있다. 엔트리로 지정된 이름을 파일 이름에 반영하려면 `[name]`을 활용한다.
- HtmlWebpackPlugin을 여러번 이용하면 여러 html 파일을 내보내도록 처리할 수 있다. 옵션으로 `chunks`를 이용해 포함할 chunk 이름을 명시해주면 된다.
- lodash 같이 여러 모듈에서 함께 쓰이는 파일은 번들을 따로 split하면 더 좋다. (모든 번들에 포함되지 않도록)
  - optimization - splitChunks - chunks
  - 물론 html 에서 분리된 파일도 포함하도록 HtmlWebpackPlugin의 chunks 옵션에도 명시 해주어야한다
- chunks를 나누면 브라우저 캐싱의 도움을 받을 확률이 커진다.
- 번들 사이즈에 따라 번들을 나눌지 말지 결정할 수 도있다. (기본 30kb로 설정되어 있음)
- 개발 모드에서는 속도가 중요하기 때문에 굳이 공통 의존성을 따로 split할 필요는 없다.

## Section 7

> 내용 없음, Skip

## Section 8

> Express 서버를 구성하는 내용인데, 단순히 /, static 서빙 하는 내용이므로 딱히 주의깊게 볼 필요 없음

## Section 9: Module Federation

- 공식문서: https://webpack.js.org/concepts/module-federation/
- 유용한 블로그 글: https://indepth.dev/posts/1173/webpack-5-module-federation-a-game-changer-in-javascript-architecture

> **공식문서 내용**
>
> 다수의 분리된 빌드들은 싱글 어플리케이션 형태가 되어야합니다. 이 분리된 빌드들은 서로간에 의존이 없어야하며, 그래서 각자 개발되고 각자 배포될 수 있어야합니다.
>
> 이는 Micro-Frontend로 알려져 있지만 이 영역에만 국한되어있지는 않습니다.

- "Module Federation"은 웹팩5에서 새로 소개된 기능이다.
- 한 모듈에서 사용하는 모든 모듈을 다른 프로젝트로 expose할 수 있다.
- 사용할때에는 remote bundle로 취급하고 dynamic import해 사용할 수 있다. (즉 런타임에 import한다)
  - import하는 모듈명은 웹팩 module federation 옵션에서 지정한 이름이다.
  - 동적으로 import 되기 때문에 공급하는 쪽에서 변경되어 참조되는 파일(build)이 변경되면 사용하는 쪽에서도 적용된다. (실행할 때 새로운 파일을 가져오므로)

```js
// 내보내는 쪽 webpack 설정에서
plugins: [
  ...,
  new ModuleFederationPlugin({
    name: 'App1',
    filename: 'remoteEntry.js',
    exposes: {
      './노출할모듈명': './src/pages/a-page.js'
      // import('App1/노출할모듈명') 으로 사용하게 됨
    }
  })
]

// 사용하는 쪽 webpack 설정에서
plugins: [
  ...,
  new ModuleFederationPlugin({
    name: 'App',
    remotes: {
      App1: 'App1@http://localhost:5001/remoteEntry.js',
      App2: 'App2@http://localhost:5002/remoteEntry.js',
    }
  })
]

// 앱 내에서
if (pathname === '1') {
  import('App1').then((App) => const app = App.default; app.init())
} else {
  import('App2').then((App) => const app = App.default; app.init())
}
```

## Section 10: Integration with jQuery

> 도움안됨, Skip

## Section 11: Using Custom Fonts with Webpack

- file-loader를 사용하면 font를 빌드 결과로 낼 수 있다. (import는 css 안에서)
  - file-loader의 name, outputPath 같은 옵션을 활용할 수 있다.

## Section 12: Using FontAwesome with Webpack

> 도움안됨, Skip

## Section 13: Using ESLint

> 도움안됨, Skip. Webpack 강의에 이건 왜 넣은 걸까!

## Section 14: Summary

> 도움안됨, Skip
