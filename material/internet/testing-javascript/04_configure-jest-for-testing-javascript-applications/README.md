# Configure Jest for Testing JavaScript Applications

- Jest는 자동으로 babel 설정을 로드하고 적용함
- Tree Shaking을 위해서 babel module 설정이 false로 된 경우가 있는데, 이 때는 테스트 환경에서만 module `commonjs`로 되도록 처리 해주면 된다. (`.babelrc`)
  - `const isTest = String(process.env.NODE_ENV) === 'test'`
- 테스트에서 window를 사용하려면, jsdom이 필요. jest-environment-jsdom은 jest에 의해 함께 설치되고 기본이지만, 다음과 같이 명시적으로 설정해주면 프로젝트를 설명하는데 도움이 됨

  ```js
  // jest.config.js
  module.exports = {
    testEnvironment: "jest-environment-jsdom",
    // jest-environment-node 는 브라우저 없는 환경
  };
  ```

- `moduleNameMapper`를 사용하면, js 파일 외에도 모듈을 처리할 수 있도록 해준다.

  ```js
  module.exports = {
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
      "\\.css$": require.resolve("./test/style-mock.js"),
    },
  };

  // style-mock.js
  module.exports = {};
  ```

- CSS Module 처리

  ```js
  yarn add -D identity-obj-proxy

  module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      // 순서가 중요함
      '\\.module\\.css$': 'identity-obj-proxy',
      '\\.css$': require.resolve('./test/style-mock.js'),
    }
  }
  ```

- inlineSnapshot을 사용하면 코드내에 스냅샷이 들어오기 때문에, 변경되는 값을 비교하는데 유용하다.
- `snapshotSerializers`를 설정파일에 설정해 직렬화되는 방법을 변경할 수 있다.
- custom module resolution
  - webpack 설정과 동일하게 설정해줄 필요가 있다.
  - 설정파일에 `moduleDirectoreis`를 설정해주면 됨
- `setupFilesAfterEnv`를 이용하면 `@testing-library/jest-dom/extend-expect` 같은 것을 바로 모든 테스트에서 import할 수 있도록 처리해준다.
- jsconfig, tsconfig에서도 절대 경로를 사용하기 위해 설정 해줄 필요있다. => Code Jump
- eslint에서도 절대경로 사용하기 위해 설정 해줄 필요있다. => 테스트 파일 내 lint 해결
- `node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand --watch`
  - runInBand는 모든 노드 프로세스가 한 개에서 실행됨을 의미
  - 코드내에서 break;를 지정하면 브레이크 포인트가 처리됨
- collectCoverageFrom을 이용해서 어디에서 커버리지를 수집할지 명시할 수 있다.
  - coverage는 gitignore 처리해주자
- 첨고로 code coverage는 `babel-plugin-istanbul`을 이용해 분석한다.

- threshold

  ```js
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    snapshotSerializers: ['jest-emotion'],

    // 이를 사용하면 최소로 커버해야하는 수치를 강제할 수 있다.
    coverageThreshold: {
      global: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
      './src/shared/utils.js': {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  }
  ```

- CI에서 codecov를 이용하면 분석이 가능하다.
- `is-ci-sli`를 이용하면 현재 실행환경이 ci인지 로컬인지 판단해 다른 스크립트를 실행하게 할 수 있다.

  ```js
      "test": "is-ci \"test:coverage\" \"test:watch\"",
      "test:coverage": "jest --coverage",
      "test:watch": "jest --watch",
  ```

- `jest-watch-typeahead`를 설치하고 watchPlugins에 추가하면 편리한 패턴매칭을 사용할 수 있다.

## 다시보기

- 15. Analyze Jest Code Coverage Reports
- 19. Run Tests with a Different Configuration using Jest’s --config Flag and testMatch Option
- 20. Support Running Multiple Configurations with Jest’s Projects Feature
- 21. Run ESLint with Jest using jest-runner-eslint
- 22. Test Specific Projects in Jest Watch Mode with jest-watch-select-projects
- 23. Run Only Relevant Jest Tests on Git Commit to Avoid Breakages
