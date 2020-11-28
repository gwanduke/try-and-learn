# Basic Concepts

## Types, models, trees & state

- tree = type + state
- model 정의
  - `endpoint: "http://localhost"` === `endpoint: types.optional(types.string, "http://localhost")`
- computed value는 메모이제이션 된다
- View function은 메모이제이션 되지 않는다. 모델 변경이 허용되지 않는다.
