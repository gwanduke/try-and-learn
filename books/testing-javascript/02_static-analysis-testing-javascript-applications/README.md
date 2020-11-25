# Static Analysis Testing JavaScript Applications

- ESLint를 이용해 정적 분석 테스팅을 할 수 있다.
- .eslint에 설정한 설정대로 린팅을 수행한다
- VSCode의 ESLint Extension을 사용하면 스크립트를 수행하기 전에 에디터에서 Lint 결과를 알 수 있다.
- fix를 수행할 수 있는데 `npx eslint . --fix`를 사용할 수 있다.
- 모든 설정을 직접 설정할 필요없이, 미리 작성해둔 룰을 extends할 수 있다.

  ```eslint
  {
    "extneds": ["eslint:recommended]
  }
  ```

- `.eslintignore`를 작성해서 무시할 파일을 설정할 수 있다.
- 또는 스크립트 실행시 `--ignore-path .gitignore` 식으로 옵션을 주어 처리할 수도 있다.
- npm install prettier --dev
  - `npx prettier src/example.js --write`: 포맷팅하고 저장
  - `.prettierrc` 파일로 관련 설정 가능 (prettier.io 참고)
- prettier와 eslint 설정이 겹쳐 eslint 에러가 날 수 있기에, `eslint-config-prettier`를 설치하고 extends해주면 좋음
- `@babel/preset-typescript`를 사용하면 타입스크립트를 컴파일 할 수 있다.
- eslint에서 typescript 관련 설정을 통해 겹치는 부분을 제거하거나 추가적인 정적 분석을 할 수 있다.
- husky는 git hooks임
  - `.huskyrc`에 룰을 작성할 수 있음
- lint-staged: Rather than failing when a developer has failed to format their files or run linting on all the files in the project on every commit, it would be even better to just automatically format the files on commit and only check the relevant files with eslint. Let’s use lint-staged to run scripts on the files that are going to be committed as part of our precommit hook.
- npm-run-al
  - 스크립트를 `&&`으로 묶는 것은 순차적으로 수행되는데, npm-run-all을 이용하면 이 스크립트들이 동시에 수행되도록 처리할 수 있다. (속도를 높일 수 있다)
