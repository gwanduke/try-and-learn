# HTML5: Canvas

- css 에서 width, height를 적용한 것과 canvas에 width, height를 지정한 것은 조금 다른 의미를 지님
  - canvas를 크게 잡고, css로 크기를 작게만들면 고해상도를 표현할 수 있다.
- `context.fillStyle = 'red'` 식으로 지정이 가능한데, 이 값은 초기화 하기전까지 게속 적용된다. canvas를 사용할 때에는 붓으로 그림을 그린다고 생각해야한다.
- 보통 직접 그리는 것은 복잡하기 때문에 이미지를 많이 활용한다.
- setInterval 과 requestAnimationFrame (1/60초 당 한번 처리 목표), 백그라운드에서 stop 되는가?
- `canvas.toDataURL`로 캔버스의 결과를 내려받을 수 있다.
- transform은 기본적으로 캔버스 0,0 기준으로 이루어진다.

## References

[1분코딩 - HTML5 Canvas 캔버스 라이브 강좌](https://youtu.be/JFQOgt5DMBY)
