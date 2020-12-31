# Interactive Web Animation 2020 [JavaScript, SVG, CSS & HTML]

## 복습 및 정리

## 섹션 1:History of Web Animations

- 1991년: HTML
- 1995년: JavaScript
- 1996년: CSS
- 2001년: SVG
- 2013년: Web Animations API 1.0
- ...

## 섹션 2:CSS Animations

- `svg 태그`는 컨테이너 역할을 하는 듯하다.
- animation
  - animation-direction
  - animation-fill-mode
  - animation-timing-function -> cubic-bezier, steps, ...
  - animation-play-state
  - animation-iteration-count
  - animation-name
  - animation-duration
  - animation-delay
  - @keyframes
- transition
  - transition-property
  - transition-duration
  - transition-delay
  - transition-timing-function

[Cubic Bezier 함수](https://cubic-bezier.com)

| 장점                                                        | 단점 (다음을 지원하지 않는다)   |
| ----------------------------------------------------------- | ------------------------------- |
| 간단한 애니메이션에 편리함                                  | 상대값                          |
| 성능이 좋음                                                 | nested animation                |
| 리소스를 많이 사용하지 않음                                 | 애니메이션 진행상태 보고        |
| GPU 사용                                                    | target discard                  |
| 여러 CPU 스레드 사용                                        | curve                           |
| 브라우저 애니메이션 순서(순차) 제어 -> 보다 정확한 FPS 유지 | cubic-bezier는 두개의 cp만 존재 |
| 속성(attribute) 애니메이샨                                  |
| 스크롤 포지션 애니메이션                                    |
| directional rotation (방향 전환)                            |
| @keyframes 가 커져서 제어하기 힘든 상황이 자주 초래됨       |

## 섹션 3:SVG Animations

SVG 컨텐츠를 animate하는 방법 (아래 방법들을 조합)

- SVG animation 엘리먼트
  - animate: 한 요소를 지속적으로 애니메이션하기 위해서 사용
  - animateMotion: path를 따라 엘리먼트가 이동하도록 함
  - animateTransform: scale, translate, rotate, skewX, skewY 등...
  - discard: 주어진 조건에 애니메이션을 취소(중단)한다.
  - set: 애니메이션 도중에 특정 속성을 변경할 수 있다. (예. stroke를 1초~3초 사이에 다른 색상으로 변경)
- CSS Animation
- CSS Transition
- SVG Document Object Model

animation을 위한 target element를 특정하는 속성

- href

animation의 타이밍을 제어하기위한 속성들

- dur
- begin
- fill
- min
- max
- restart
- repeatCount
- repeatDur

## 섹션 4:Interactive JavaScript Animations
