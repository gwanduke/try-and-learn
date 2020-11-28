# FOrms, controls

> Created: 2020년 5월 1일

## 1. Form properties and methods

- `document.forms` 로 문서내 `<form />` 들을 특별한 컬렉션으로서 조회 가능

  - `document.forms[0].elements`

  ```jsx
  <form name="my">
    <input name="one" value="1" />
    <input name="one" value="1" />
    <input name="two" value="2" />
  </form>

  <form name="my">
    <input name="one" value="1" />
    <input name="two" value="2" />
    <input name="three" value="3" />
  </form>

  <script>
    document.forms => [form, form]

    let form = document.forms.my; // 첫번째 <form name="my"> element
                                  // 컬렉션 반환 X
    console.log(form);

  	// 엘리먼트의 경우 동일 이름이 여러개인 경우 RadioNodeList로 취급됨
    let elem = form.elements.one;
    console.log(elem); // RadioNodeList(2) [input, input, value: ""]

    // 첫번째 form의 <input name="one"> element
    elem = form.elements.one[0];
    console.log(elem);

    elem = form.elements.three;
    console.log(elem); // undefined
  </script>
  ```

  - form 내에 `<fieldset />`이 있는 경우 이 fieldset도 `elements`프로퍼티를 가짐
  - [form.elements.name](http://form.elements.name) ⇒ [form.name](http://form.name) 으로 축약 가능
    - 하지만 [form.name](http://form.name) 의 경우 엘리먼트의 이름이 변경 되더라도 변경되기전 이름으로 계속 해당 엘리먼트로 접근이 가능한 이슈가 있음
      (하지만 이름은 거의 변경되지 않으므로 크게 신경X)
  - element에서 `form` 프로퍼티를 이용해 form을 조회할 수 있음 (backreference)

    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4e843b62-ed6f-4ed0-88aa-aae0ea35ae21/_2020-05-01_22.29.55.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4e843b62-ed6f-4ed0-88aa-aae0ea35ae21/_2020-05-01_22.29.55.png)

### input 과 textarea 의 값 접근

- input.value ⇒ string
- input.checked ⇒ boolean (checkbox)

textarea를 사용할 때는 textarea.innerHTML을 사용하지 말고 textarea.value를 이용할 것 (innerHTML은 현재 입력된 값이 아닌, HTML에 기록된 값을 가짐)

### select와 option

- `<select />` 의 프로퍼티
  1. select.options - `<option />` 하위 엘리먼트의 컬렉션
  2. select.value - 현재 선택된 `<option />`의 값
  3. select.selectedIndex - 현재 선택된 `<option />`의 index
- `<select />`의 값을 세팅하는 방법 3가지

  - (1) 원하는 `<option />`의 `option.selected`를 true로 설정
  - (2) `select.value`를 상응하는 `<option />`의 value로 설정
  - (3) `select.selectedIndex`를 상응하는 `<option />`의 인덱스로 설정

  ```html
  <select id="select">
    <option value="apple">Apple</option>
    <option value="pear">Pear</option>
    <option value="banana">Banana</option>
  </select>

  <script>
    // all three lines do the same thing
    select.options[2].selected = true; // (1)
    select.value = "banana"; // (2)
    select.selectedIndex = 2; // (3)
  </script>
  ```

  ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9b47f1c2-df1a-415d-8913-af5d6f0c5e9f/_2020-05-02_09.09.38.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9b47f1c2-df1a-415d-8913-af5d6f0c5e9f/_2020-05-02_09.09.38.png)

- `<selected />` 가 multiple 속성을 갖는 경우 `select.options`로 selected가 true인 옵션을 찾아 값을 확인할 수 있다.

  - 그리고 두 개 이상의 값을 선택하려면 option.selected를 조작하는 (1) 방법을 이용해야만 함

  ```html
  <select id="select" multiple>
    <option value="blues" selected>Blues</option>
    <option value="rock" selected>Rock</option>
    <option value="classic">Classic</option>
  </select>

  <script>
    // get all selected values from multi-select
    let selected = Array.from(select.options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    alert(selected); // blues,rock
  </script>
  ```

  ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c2777fda-f282-4170-b283-4ab6c37d8a24/_2020-05-02_09.10.15.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c2777fda-f282-4170-b283-4ab6c37d8a24/_2020-05-02_09.10.15.png)

### new Option

```jsx
// 아래 구문으로 <option /> 엘리먼트를 손쉽게 만들 수 있음
option = new Option(text, value, defaultSelected, selected);
```

- <option value="{value}" selected>{text}</option>
- == `const option = new Option("text", "value", true, false)`
  - option.value === false
- `const option = new Option("text", "value", true, true)`

  - option.value === true

- select에 option 추가

  ```jsx
  <select id="genres">
    <option value="rock">Rock</option>
    <option value="blues" selected>
      Blues
    </option>
  </select>;

  let newOption = new Option("Classic", "classic");
  genres.append(newOption); // 요런식으로 사용
  ```

### option의 프로퍼티

- option.selected - 옵션이 선택 되었는지 여부
- option.index - select에서의 인덱스
- option.text - 옵션의 텍스트 (사용자에게 보이는)

## 2. Focusing: focus/blur

- input 엘리먼트의 `autofocus`가 설정되어 있으면 페이지 로드시 자동으로 포커스 된다.

  ```jsx
  <input type="text" autofocus /> // 페이지 로드시 즉시 focus
  ```

- focus
  - click이나 Tab키를 통해 엘리먼트는 포커스 될 수 있다.
  - focus된다는 것은 "여기 데이터를 받을 준비가 되었다"라는 의미
- blur
  - 포커스를 잃으면 blur가 되는데, 이는 포커스된 곳 외에 다른 곳을 클릭하거나 탭을 눌린 경우 수행됨.
  - blur된다는 것은 "데이터가 입력되었음"을 의미함 (input의 경우)

### 이벤트

```jsx
input.onblur = () => { ... }
input.onfocus = () => { ... }
```

input 엘리먼트에 required, pattern등의 속성이 제공되지만, 이를 활용하면 더 유연하게 validation을 처리할 수 있음 (onblur시 validation 로직 처리 등으로)

- 🧨onblur는 포커스를 잃은 후에 수행되므로, event.preventDefault()를 한다고 해서 blur를 막을 수는 없다.

### 메서드

```jsx
elem.focus();
elem.blur();
```

- 🧨사용자에 의한 focus, blur. 프로그래밍에 의한 focus, blur 외에 alert 등의 자바스크립트 동작으로 focus, blur가 일어날 수 있음에 유의

### tabindex

- button, input, a 등의 엘리먼트는 기본적으로 대부분의 브라우저에서 focus/blur가 동작함
- div, span 등은 기본적으로 focus/blur가 동작하지 않는데, tabindex를 지정하면 가능함
- tabindex를 지정하면 `Tab`키에 의한 순서가 설정됨

  - 1이상 → 순서대로 탭
  - 0 → 1이상인 탭 이후 focus
  - -1 → 프로그래밍에의한 focus만 가능

  ```jsx
  <ul>
    <li tabindex="1">One</li> // 1<li tabindex="0">Zero</li> // 3
    <li tabindex="2">Two</li> // 2<li tabindex="-1">Minus one</li> //
    programmatic focusing // Tab은 무시됨
  </ul>
  ```

- elem.tabIndex 프로퍼티로도 tabindex 지정이 가능

### 위임: focusin/focusout

- focus와 blur는 bubble되지 않아 상위 엘리먼트에서 이벤트를 위임받고자 하는 경우 어려움이 있을 수 있음
- 이를 해결하려면

  - capturing phase에 이벤트를 설정하거나

    ```jsx
    form.addEventListener("focus", () => ..., true);
    form.addEventListener("blur", () => ..., true);
    ```

  - focusin/focusout 이벤트를 사용하면 됨 (bubble 됨)

    ```jsx
    // onfocusin
    form.addEventListener("focusin", () => ...);
    form.addEventListener("focusout", () => ...);
    ```

## 3. Events: change, input, cut, copy, paste

### Change

- 엘리먼트의 변경이 **완료될 때** 일어나는 이벤트
- input의 경우 포커스를 잃어버릴 때 일어남
- select, input type=checkbox/radio의 경우 선택이 변경되는 경우 일어남

### Input

- 값이 변경될 때 마다 일어나는 이벤트
- keydown과 같은 키보드 입력이 아니더라도, 복붙, 마우스에 의한 입력 등에도 이벤트가 일어남 (value가 변경되므로)
- ← → 입력과 같이 값이 변하지 않는 경우에는 이벤트가 일어나지 않음
- 🧨input 이벤트는 value가 수정된 후에 일어나므로 `event.preventDefault`로 입력을 막을 수 없다.

### Cut, Copy, Paste

- ClipboardEvent 클래스에 속하며 복사, 붙여넣어진 데이터에 접근을 제공함
  (event.clipboardData.~)
- `event.preventDefault`를 사용 가능해 액션을 취소가능하며, 이 경우 복사/붙여넣어진 데이터가 `event.clipboardData`에 전달되지 않음

## 4. Forms: event and method submit

- submit 이벤트는 form이 전송 되어질 때 일어남
  - 대개 서버 전송 전에 폼을 검증하거나 전송을 취소하는데 사용함
- `form.submit()`은 폼 전송을 시작하며, 이를 이용해 동적으로 폼을 생성하고 서버로 전송할 수 있다.

### Event: submit

- 폼 submit 이벤트를 발생시키는 방법
  1. form내의 `<input type="submit" />` 또는 `<input type="image" />` 클릭
  2. input 필드에서 `Enter`
- event.preventDefault로 서버로의 전송을 막을 수 있음

### Method: submit

- `form.submit()` 으로 전송
- submit 이벤트는 발생하지 않고 form이 전송됨. submit 이벤트가 발생됨으로서 해야할 일(onsubmit에서 수행해야하는 로직)을 프로그래머가 했다고 가정하고 폼 전송을 수행함

  ```jsx
  <form onsubmit="return false" action="http://naver.com">
    <input type="text" size="30" value="Focus here and press enter" />
    <input type="submit" value="Submit" onclick="alert('click')" />
  </form>
  => preventDefault()가 되어있음에도, http://naver.com 로 이동 해버림
  ```

- 🧨submit 이벤트가 발생하면, input type="submit"이 클릭된 것으로 인식됨

```jsx
<form onsubmit="return false">
 <input type="text" size="30" value="Focus here and press enter">
 <input type="submit" value="Submit" onclick="alert('click')">
</form>
```
