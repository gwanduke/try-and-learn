# Use DOM Testing Library to test any JS framework

DOM testing 라이브러리 사용하던대로 사용하면 되고,

알지못했던 눈여겨 볼만한 부분은 `getQueriesForElement`를 사용해 DRY하게 구성하는 방법

```js
import { getQueriesForElement, fireEvent } from "dom-testing-library";

function render(ui) {
  const container = document.createElement("div");
  ReactDOM.render(ui, container);
  return getQueriesForElement(container);
}
```
