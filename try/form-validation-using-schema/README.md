# Form Validation Using Schema

- [Yup](https://github.com/jquense/yup) `18.2k Stars`
- [Joi](https://github.com/hapijs/joi) `19.1k Stars`
- [Zod](https://github.com/colinhacks/zod) `10.9k Stars`

## Yup

모든 부분에서 훌륭하지만 `when()` 사용시 필드 지정에 타입지원이 안되어 관리가 어렵다. 문서 최신화가 안되어서 실제로 해보면 타입이 올바르게 동작하지 않는 경우도 많다.

## Zod

`when()` 같은 조건부 메서드가 없어 `refine()`을 사용하고 각 스키마를 조합해 최종 스키마를 만드는 방향으로 작업해야한다. `refine()` 에서는 오류를 어떤 path에 매칭할 것인지 지정해줘야하는데 이 경우 타입 지원이 되지 않아 `path: ['age'] as (keyof Values)[]` 같이 처리해주어야한다. 이는 Yup 에서의 문제점과 비슷하므로 Yup의 문제를 완전히 해결하는 라이브러리는 아니다.

## Joi

에러 메시지 지정하기가 까다롭다.

> Note that if you provide an Error, it will be returned as-is, unmodified and undecorated with any of the normal error properties. If validation fails and another error is found before the error override, that error will be returned and the override will be ignored (unless the abortEarly option has been set to false). If you set multiple errors on a single schema, only the last error is used.

```js
{
  hasCar: Joi.boolean().valid(true),
  carNumber: Joi.string().when('hasCar', {
      is: true,
    then: Joi.required().error((errors) => new Error('MY_ERROR'))
  })
}
```

```{
  value: {
    userName: 'Gwan-duk Kim',
    age: 17,
    agreeOfParent: false,
    hasCar: true,
    carNumber: ''
  },
  error: Error: MY_ERROR
    ...
}
```
