# Deriving information with computeds

- `computed` (annotation)
- `computed(options)` (annotation)
- `computed(fn, options?)`

observable에 의해서 갱신되어 참조되는 observer가 없다면 갱신없이 멈춰있다. (최적화 되어있음)

## 규칙

1. 사이드 이펙트나 다른 observable을 업데이트 하지 않아야함
2. 새로운 observable을 반환하지 않아야함

## tips, options

https://mobx.js.org/computeds.html#tips

주의깊게 볼 부분

- `computed.struct` - https://mobx.js.org/computeds.html#computed-struct
