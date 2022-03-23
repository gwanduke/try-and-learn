# Download

```js
var file_path = "host/path/file.ext";
var a = document.createElement("A");
a.href = file_path;
a.download = file_path.substr(file_path.lastIndexOf("/") + 1);
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
```

## a 태그

속성들

(caniuse 확인하자)

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download

- `download`: 링크로 이동하는대신 저장 할래? \*download는 **동일 출처 URL**과 blob:, data: 스킴에서만 작동합니다. 아니라면 이동하거나 새창으로 inline
  - 값지정 -> 파일 이름으로 저정됨 + Specifies that the target will be downloaded when a user clicks on the hyperlink
  - 값이 없음 -> Content-Disposition 헤더, URL 경로의 마지막 조각, 미디어 유형 (Content-Type 헤더, data: URL의 시작 부분, blob: URL의 Blob.type에서 알아냄) 등을 참고해 파일이름 조합 및 동작
  - Content-Disposition의 filename이 download와 다를 땐 **헤더가 우선권**을 가집니다. (Content-Disposition: inline일 때, Firefox는 헤더를 우선하고 Chrome은 download를 우선합니다.)
- `type`: 링크 URL의 MIME type에 대한 힌트. 특별한 내장 기능은 없습니다. (This attribute is only used if the `href` attribute is set.)

```html
<!-- 직접 클릭하는 것은 괜찮 (새창 열리고 다운로드되면서 닫힘) -->
<a id="down" href="/sample.csv" target="_blank">Download Image</a>

<!-- 다음과 같은 코드는 팝업 차단을 유발함 -->
<script>
  // 삼성브라우저에서 동작안함 (download 있는 경우)
  // 모바일크롬 OK, 삼성브라우저도 OK (리다이렉트 X, 다운로드만 수행)
  document.getElementById("down").click();
</script>
```

```html
<!-- 이경우 리다이렉트일까? -->
<!-- 크롬/파폭: 새로고침없이 다운로드 진행, 사파리: csv inline viewer로 이동 (download 있어도, target blank이면 ...) -->
<a id="down" href="/sample.csv">Download Image</a>
```
