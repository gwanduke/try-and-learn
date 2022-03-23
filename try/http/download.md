# HTTP 다운로드 관련 헤더

## Content-Disposition

```text
Content-Disposition: inline; // 브라우저 윈도우 내부에 보여져야함을 힌트
Content-Disposition: attachment; filename="numbers.txt"; // numbers.txt 이름으로 다운로드됨
```

- 브라우저에게 리소스가 inilne으로 보여져야하는지 또는 다운로드 되어야하는지 알려줌
- 동적으로 생성되는 다운로드 링크를 만드는데 사용될 수 있음
- 대부분의 케이스에서 회피(probably avoid it)가 가능

```html
<a href="./images/sample.php">View Image</a>
<a href="./images/gen_numbers.php">Download Numbers (.txt)</a>

<a href="./images/sample.png">View Image</a>
<a href="./images/sample.png" download>Download Image</a>
```

## Content-Type

- 수신자에게 어떤 형태의 데이터를 예상하고 인터프리트 할것인지 알려준다.
- file extension 만으로는 부족하다. (.php 라도 css import에 사용이 가능하고, 파일확장자는 중요하지 않음. 그 내용이 가장 중요하며, content-type이 css이면 css로 인식하고 파싱함. content-type이 잘못되어도 css가 필요한 자리에 넣었다면 css로 인식하고 파싱하긴하나 warning이 뜸. 즉 그럼 Link태그에 사용가능)
- 서버로 전송시 중요한 역할을 함
- 이걸로 몇가지 트릭을 구사가능
  - 예를들어 JSON 형태의 text를 전송하는 경우 기본적으로 text/html을 전송하여 그냥 표시하지만, 서버에서 전송시 application/json 등으로 변경하도록 처리해주면 브라우저에서 JSON으로 파싱할 것 (특히 firefox는 더 멋진 UI를 제공)
