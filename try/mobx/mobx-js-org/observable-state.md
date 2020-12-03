# Observable State

## Observable 상태 만들기

### `makeObservable`

- `makeObservable(target, annotations?, options?)`

존재하는 객체 프로퍼티를 observable하게 만드는데 사용됨. 일반적으로 `makeObservable`이 클래스의 constructor에서 사용되며 첫 인자는 this임. 데코레이터를 사용하면 `annotations`는 생략가능하다.

인자를 받는 메서드는 메모리 누수를 피하기 위해 memoized 되지 않는다.

### `makeAutoObservable`

- `makeAutoObservable(target, overrides?, options?)`

이는 super또는 서브클래스 된 클래스에서는 사용할 수 없다는 단점이 있다.

annotating은 다음과 같은 룰로 진행됨

- 함수는 `autoAction`
- `get`ter는 `computed`
- 소유하고 있는 필드는 `observable`
- generator 함수는 `flow` (몇몇 트랜스파일러 설정에서는 generators 함수가 올바르게 감지되지 않으니, `flow`를 명시적으로 지정해주어야할 수도 있음)
- `overrides`에서 `false`로 표시된 멤버는 annotate되지 않음. (id 같이 읽기 전용인 필드들에 대해서 사용 고려)

### `Observable`

- `observable(source, overrides?, options?)`

observable annotation은 전체 객체를 observable로 만들기 위해 함수형태로도 불릴 수 있다.

- `source`: 이 객체는 복사되고 모든 멤버가 observable하게 만들어진다. `makeAutoObservable`이 수행하는 것과 비슷하다.
- `overrides`는 특정 멤버의 annotation을 지정할 수 있다.

`observable`에 의해 반환되는 `observable`은 Proxy이다. 즉, 추후 이 객체에 추가되는 프로퍼티들도 또한 observable로 만들어지도록 처리되어있다. (proxy usage가 disabled되어있는 경우 제외)

`observable` 메서드는 arrays, Maps, Sets 같은 콜렉션과 함께 호출될 수 있다. 이들도 위 설명과 동일하게 복사되며 대응하는 observable로 변환된다.

> 원시값과 클래스 인스턴스는 observable로 절대 변환되지 않는다.
> 원시값은 immutable하기 때문에 observable로 변환되지 않지만, "boxed"되면 가능하다. (`observable.box`)
> 클래스 멤버를 observable하게 만드는 것은 class constructor의 책임임

> observable (proxied) VS makeObservable (unproxied)
>
> - `make(Auto)Observable`: object를 수정함. Proxy를 이용하지 않음. 동적으로 프로퍼티를 추가하지 않는다면 이 방법을 추천함 (proxy는 약간의 오버헤드를 가지므로 비교적 느림, 또한 console.log로 디버깅 하기 편리함)
> - `observable`: object를 복사해 만듬. Proxy를 이용함 (하지만 `{ proxy: false }`를 사용하면 non-proxied 클론을 만들 수 있음)

## 사용가능한 annotations, 한계, 옵션, 일반 객체로 변경, 클래스에 대하여

https://mobx.js.org/observable-state.html#available-annotations
