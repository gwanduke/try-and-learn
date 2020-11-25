# Iterator

- [Iterator](#iterator)
  - [내 생각](#내-생각)
  - [요약 정리](#요약-정리)
  - [`objects`를 iterable하게 만들기](#objects를-iterable하게-만들기)
  - [어떤 것이 iterable일까?](#어떤-것이-iterable일까)
  - [어떤 것이 iterable을 사용할까?](#어떤-것이-iterable을-사용할까)
  - [실전 코드](#실전-코드)
  - [References](#references)
    - [봤어요](#봤어요)
    - [아직 안봤어요](#아직-안봤어요)

## 내 생각

## 요약 정리

- Iterator는 어떤 collection이든지 반복할 수 있는 새로운 방법이다.
- iterator method -> `Symbol.iterator`
  - 여기서 Symbol은 유니크한 이름을 제공해 다른 프로퍼티명과 겹치지 않게 해줌
  - 이는 `iterator`라 불리는 객체를 반환
  - iterator는 `{ value, done }`형태의 객체를 반환하는 `next` 메서드를 가짐
- `value` key는 현재 값을 가지며, 어떤 타입이든 될 수 있다.
- `done`은 boolean 값이며 모든 값이 fetched 되었는지 아닌지를 나타낸다.
- Iteration Protocol
  ![iteration protocol](./iteration_protocol.png)
- iterable은 공개적으로 접근가능하도록 만들 엘리먼트 데이터 구조를 말한다.
  - 이는 Symbol.iterator를 구현함으로서 달성할 수 있으며, 이 메서드는 iterators를 위한 팩토리이다. 이 것이 iterators를 만든다.
  - iterator는 데이터 구조의 엘리먼트를 순회하는 포인터와 같다.

## `objects`를 iterable하게 만들기

```js
const iterable = {
  [Symbol.iterator]() {
    let step = 0;
    const iterator = {
      next() {
        step++;

        if (step === 1) {
          return { value: "This", done: false };
        } else if (step === 2) {
          return { value: "is", done: false };
        } else if (step === 3) {
          return { value: "iterable.", done: false };
        }

        return { value: undefined, done: true };
        // done을 false로 처리해도 next() 메서드는 먹히지만, true로 끝났음을 알려야 실제 for ~ of 등에서 정상 동작할 것이다
      },
    };

    return iterator;
  },
};

var iterator = iterable[Symbol.iterator]();

iterator.next();
iterator.next();
iterator.next();
iterator.next(); // { value: undefined, done: true }
iterator.next(); // { value: undefined, done: true }
```

## 어떤 것이 iterable일까?

- Arrays and TypedArrays
- Strings
- Maps
- Sets
- arguments
- DOM elements

## 어떤 것이 iterable을 사용할까?

- `for-of`

  ```js
  for (const value of iterable) { ... }
  ```

- Destructuring of Arrays

  ```js
  const array = ["a", "b", "c", "d", "e"];
  const [first, , third, , last] = array;

  // ==
  const array = ["a", "b", "c", "d", "e"];
  const iterator = array[Symbol.iterator]();
  const first = iterator.next().value;
  iterator.next().value; // Since it was skipped, so it's not assigned
  const third = iterator.next().value;
  iterator.next().value; // Since it was skipped, so it's not assigned
  const last = iterator.next().value;
  ```

- The spread operator (...)

  ```js
  const array = ["a", "b", "c", "d", "e"];
  const newArray = [1, ...array, 2, 3];

  // ==
  const array = ["a", "b", "c", "d", "e"];
  const iterator = array[Symbol.iterator]();
  const newArray = [1];
  for (
    let nextValue = iterator.next();
    nextValue.done !== true;
    nextValue = iterator.next()
  ) {
    newArray.push(nextValue.value);
  }
  newArray.push(2);
  newArray.push(3);
  ```

- Promise.all, Promise.race 가 Promise위에서 iterables를 받는다.
- Maps and Sets

  ```js
  const map = new Map([
    [1, "one"],
    [2, "two"],
  ]);
  map.get(1);
  // one

  const set = new Set(["a", "b", "c"]);
  set.has("c");
  // true
  ```

## 실전 코드

```js
const myFavouriteAuthors = {
  allAuthors: {
    fiction: ["Agatha Christie", "J. K. Rowling", "Dr. Seuss"],
    scienceFiction: [
      "Neal Stephenson",
      "Arthur Clarke",
      "Isaac Asimov",
      "Robert Heinlein",
    ],
    fantasy: ["J. R. R. Tolkien", "J. K. Rowling", "Terry Pratchett"],
  },
  [Symbol.iterator]() {
    const genres = Object.values(this.allAuthors);

    let currentAuthorIndex = 0;
    let currentGenreIndex = 0;

    return {
      next() {
        const authors = genres[currentGenreIndex];

        const doNotHaveMoreAuthors = !(currentAuthorIndex < authors.length);
        if (doNotHaveMoreAuthors) {
          currentGenreIndex++;
          currentAuthorIndex = 0;
        }

        const doNotHaveMoreGenres = !(currentGenreIndex < genres.length);
        if (doNotHaveMoreGenres) {
          return {
            value: undefined,
            done: true,
          };
        }

        return {
          value: genres[currentGenreIndex][currentAuthorIndex++],
          done: false,
        };
      },
    };
  },
};

for (const author of myFavouriteAuthors) {
  console.log(author);
}

console.log(...myFavouriteAuthors);
```

## References

### 봤어요

- https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e (자료, 이미지 출처)

### 아직 안봤어요
