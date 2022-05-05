# HTML5: Canvas

- css 에서 width, height를 적용한 것과 canvas에 width, height를 지정한 것은 조금 다른 의미를 지님
  - canvas를 크게 잡고, css로 크기를 작게만들면 고해상도를 표현할 수 있다.
- `context.fillStyle = 'red'` 식으로 지정이 가능한데, 이 값은 초기화 하기전까지 게속 적용된다. canvas를 사용할 때에는 붓으로 그림을 그린다고 생각해야한다.
- 보통 직접 그리는 것은 복잡하기 때문에 이미지를 많이 활용한다.
- setInterval 과 requestAnimationFrame (1/60초 당 한번 처리 목표), 백그라운드에서 stop 되는가?
- `canvas.toDataURL`로 캔버스의 결과를 내려받을 수 있다.
- transform은 기본적으로 캔버스 0,0 기준으로 이루어진다.

## 특징

- canvas는 직사각형만 그릴 수 있다. 그 외에는 여러 점과 선을 연결해 완성
- 경로 그리기
  - 1. beginPath 로 경로 생성
    - 첫 경로 생성 명령은 실제 동작에 상관 없이 moveTo()로 여겨진다.
    - 그래서 경로 초기화 후에는 시작위치를 명확하게 다시 지정해주는게 좋다.
  - 2. 경로 그리기
    - closePath(): 현재 하위 경로의 시작 부분과 연결된 직선 추가 (선택사항. 도형이 이미 닫혔거나 한점이라면 효과 없음)
    - stroke(): 윤곽선을 이용해 도형 그리기 (자동으로 닫히지 않음)
    - fill(): 경로의 내부를 채워서 도형 그리기 (자동 닫힘)

## References

[1분코딩 - HTML5 Canvas 캔버스 라이브 강좌](https://youtu.be/JFQOgt5DMBY)

## 기타

### 베지에 곡선

- 이차 베지에 곡선: 시작점, 끝점, 하나의 제어점
- 삼차 베지에 곡선: 시작점, 끝점, 두개의 제어점

## Methods

- `rect(x, y, width, height)`: 메소드 실행전에 `moveTo(x, y)`가 자동으로 실행됨
- fillStyle, strokeStyle

## Related

- `new Path2D()` - arc, moveTo 등을 메서드로 가지며 ctx.stroke(path) 식으로 최종적으로 그릴 수 있다.
