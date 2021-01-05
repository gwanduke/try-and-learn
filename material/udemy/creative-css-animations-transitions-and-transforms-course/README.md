# Creative CSS Animations Transitions And Transforms Course

## ❌ 복습 및 정리

- [ ] gwanduke.com에 직접 구현해보고 포트폴리오 구성

## 섹션 1:css transitions basics

- Transition이 무엇인가?: 속성 변화가 자연스럽게 진행되도록 함
- `transition-timing-function`: 프로퍼티 변화가 어떻게 일어날 것인가?
  - ease: 변화가 천천히 시작되어 빠르게 그리고 느리게 종료
  - linear
  - ease-in: 변화가 천천히 시작되어 끝날때까지 더 빠르게 진행
  - ease-out: 변화가 빠르게 시작되어 끝날때까지 더 느리게 진행
  - ease-in-out: 변화가 느리게 시작되고 빠르게 그리고 느리게 종료 (ease와 비슷)
- `transition-property: background-color color;`식으로 여러 프로퍼티 지정이 가능
- `transition: background-color 3s ease-in-out 1s, color 2s ease 4s` 처럼 여러 값 지정 가능

- [어떤 프로퍼티가 transition 가능할까?](./what-properties-can-be-transitioned/index.html) => MDN 참고하는 편이 좋음 [MDN - Animatable CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)

## 섹션 2:css 2D transforms

- transform 속성
  - scale
  - translate
  - rotate(`45deg`, `-0.5turn`, `200grad`): 대부분 deg가 자주 사용됨
  - skew(`30deg`)
- [transform-origin 예제](./transform-origin)
  - `transform-origin: 30% 40%` 식으로 % 또는 px로도 사용가능

## 섹션 3:css 3D transforms 👍

### 3D translate

> `perspective`에 대해서 제대로 알 수 있었다.

2D와 다른점은 Z축이 있다는 것

2D 면의 스크린에서 3D 환경을 만드려면 `perspective`라는 것을 만들어야한다. 이는 컴퓨터 스크린과 우리 눈 사이의 간격이라고 생각하면 쉽다. 꼭 기억해야할 것은 3D 작업을 하기전에 **무조건 `perspective`를 가장 먼저 만들**어야한다.

```css
/* image의 컨테이너인 body에 perspective 지정 */
body {
  perspective: 1000px;
  /* 모니터와 눈의 간격이 1000px라고 가정, 이 영역을 벗어나면 화면에서 보이지 않음  */
}

img:hover {
  transform: translateZ(300px);
}
```

### 3D rotate

속성 적용시 x, y, z 축을 기준으로 회전됨

## 섹션 4:css transforms creative examples

> 다양한 예제를 실습해보았다. 평소에 활용하던 잘알던 프로퍼티지만 여러가지 트릭을 익힐 수 있었다.

- [ ] [Creative Buttons](./creative-buttons)
- [ ] [Creative Menu](./creative-menu)

## 섹션 5:css animations and keyframes

- animaton fill mode
  - none: 첫 stage로 돌아옴
  - forwards: animation의 마지막 상태로 유지
  - backwards: duration이 있더라도 animation 시작시에 0%로 유지
  - both: forwards + backwards
- duration
  - backwards가 아니라면, 이 기간 동안 애니메이션의 0% 상태가 적용되지 않음

## 섹션 6:css animation creative examples

여러가지 애니메이션을 실습해보았다. 어렵다기 보다 여러가지 트릭을 알 필요가 있다.

- [ ] [Animations](./animations)

## 섹션 7:Bonus Section

> 내용없음
