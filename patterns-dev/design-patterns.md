- [Design Patterns](#design-patterns)
  - [Singleton Pattern](#singleton-pattern)
  - [Proxy Pattern](#proxy-pattern)
  - [Provider Pattern](#provider-pattern)
  - [Prototype Pattern](#prototype-pattern)
  - [Container/Presentational Pattern](#containerpresentational-pattern)
  - [Observer Pattern](#observer-pattern)
  - [Module Pattern](#module-pattern)
  - [Mixin Pattern](#mixin-pattern)
  - [Mediator/Middleware Pattern](#mediatormiddleware-pattern)
  - [HOC Pattern](#hoc-pattern)
  - [Render Props Pattern](#render-props-pattern)
  - [Hooks Pattern](#hooks-pattern)
  - [Flyweight Pattern](#flyweight-pattern)
  - [Factory Pattern](#factory-pattern)
  - [Compound Pattern](#compound-pattern)
  - [Command Pattern](#command-pattern)
  - [Learning JavaScript Design Patterns](#learning-javascript-design-patterns)

# Design Patterns

## Singleton Pattern

앱 전역에서 공유되므로 전역 상태 관리에 적합하다. 장/단점이 있지만, JS에서는 보통 하지 말아야한 안티패턴으로 취급되곤 한다.

- 장점
  - 인스턴스를 하나만 만들게 되므로 메모리 공간 절약
- 단점
  - 테스트시 데이터를 공유하므로 매 테스트간 초기화 과정이 필요
  - import 해서 사용할 때 싱글턴인지 아닌지 파악하기 어려움 (이렇게 잘 모르고 사용/수정 될 때 그 사이드 이펙트를 예측하기 힘듬)

🌼 클래스를 이용한 구현

```js
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
```

🌼 모듈을 이용한 구현

```js
let count = 0;

const counter = {
  increment() {
    return ++count;
  },
  decrement() {
    return --count;
  },
};

Object.freeze(counter);
export { counter };
```

## Proxy Pattern

Proxy 객체는 어떤 객체의 값을 설정하거나 값을 조회할때 등의 인터렉션을 직접 제어할 수 있다. 하지만 Proxy를 너무 과도하게 사용하면 성능 문제가 생길 수 있다.

- 유효성 검사 수행시 유용

```js
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`); // 또는 ${Reflect.get(obj, prop)}
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
    return true;
  },
});

personProxy.name;
personProxy.age = 43;
```

## Provider Pattern

Context 를 활용해 Prop-drilling 을 피하는 방법

- 장점
  - 중간의 컴포넌트가 불필요하게 데이터를 받지 않아도 됨
- 단점
  - 성능 이슈 발생 가능성 (불필요한 렌더링) [참고자료 - How to use React Context effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively)

## Prototype Pattern

아래 두가지의 차이를 이해하고 있으면 됨

- `.__proto__`
- `.prototype`

## Container/Presentational Pattern

hooks를 사용하는 것도 좋은 방법

- 장점
  - 자연스러운 관심사 분리 (컨테이너: 상태/데이터, 프리젠터: UI를 그리는 순수함수)
  - Presenter는 테스트/수정/재사용성이 뛰어남
- 단점
  - 작은앱에서는 오버엔지니어링일 수 있음

## Observer Pattern

- 구독 주체: Observer
- 구독 가능한 객체: Observable

이벤트가 발생하면 Observable은 Observer에게 이벤트를 전파한다.

Observable의 구성요소

- `observers`: Observer[]
- `subscribe(fn)`
- `unsubscribe(fn)`
- `notify(data)`: observers의 Observer[]를 돌며 이벤트를 전파함

- 장점
  - observer와 Observable이 강결합되지 않고 분리 가능
  - observer가 받은 데이터 처리
  - observable이 이벤트 모니터링
- 단점
  - observer가 복잡하면 모든 observer에 알림 전파하는데 성능 이슈 발생

```js
class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}
```

## Module Pattern

ES6 module 을 사용해 import, export 하는 방법에 대한 일반적인 내용

## Mixin Pattern

[ ] [Mixins Are Dead. Long Live Composition](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)

prototype이 기능 객체를 참조하도록 해 어떤 객체의 기능을 확장할 수 있다.

```js
class Dog {
  constructor(name) {
    this.name = name;
  }
}

const dogFunctionality = {
  bark: () => console.log("Woof!"),
  wagTail: () => console.log("Wagging my tail!"),
  play: () => console.log("Playing!"),
};

Object.assign(Dog.prototype, dogFunctionality);
```

## Mediator/Middleware Pattern

중재자를 두고 요청을 처리하는 방법 (1) 보다 (2)의 방식이다.

(1)

```
A <-> B <-> C
^     ^     ^
 \   | |   |
  v v   v v
   D <-> E
```

(2)

```
A <-> B <-> C
      ^
     | |
    v   v
   D     E
```

간단한 예로 채팅을 나누어주는 채팅 서버를 생각해볼 수 있다.

```js
class ChatRoom {
  logMessage(user, message) {
    const sender = user.getName();
    console.log(`${new Date().toLocaleString()} [${sender}]: ${message}`);
  }
}

class User {
  constructor(name, chatroom) {
    this.name = name;
    this.chatroom = chatroom;
  }

  getName() {
    return this.name;
  }

  send(message) {
    this.chatroom.logMessage(this, message);
  }
}

const chatroom = new ChatRoom();

const user1 = new User("John Doe", chatroom);
const user2 = new User("Jane Doe", chatroom);

user1.send("Hi there!");
user2.send("Hey!");
```

Express.js 에서의 특정 라우팅 경로에 대한 콜백(미들웨어) 가 한가지 예시가 될 수 있음. 미들웨어는 한 중앙지점에서 모든 커뮤니케이션 흐름이 일어나도록 하여 객체간 다-대-다 관계를 단순화한다.

## HOC Pattern

다른 컴포넌트를 받는 컴포넌트

- 장점
  - 한 곳에 구현한 로직들을 여러 컴포넌트에서 재사용
  - DRY 하면서 관심사의 분리도 적용
- 단점
  - 트리가 깊어지는 경향 (-> 가능한 경우 hooks를 사용해 해결)
  - HOC가 전달하는 props와 원래 Component가 가지는 props의 이름이 겹칠 수 있음 (-> 이 때에 `<Comp style={{ a: 'b', ...props.style }} />` 같은 병합 전략을 사용)
  - 규모가 커지고 여러 HOC가 중첩되면 props가 병합되므로 파악이 어렵다.

HOC의 사용 사례

- 앱 전반적으로 동일하며 커스터마이징 불가한 동작이 여러 컴포넌트에 필요한 경우
- 컴포넌트가 커스텀 로직 추가 없이 단독으로 동작할 수 있어야 하는 경우

Hooks의 사용 사례

- 공통 기능이 각 컴포넌트에서 쓰이기 전에 커스터마이징 되어야 하는 경우
- 공통 기능이 앱 전반적으로 쓰이는 것이 아닌 하나나 혹은 몇개의 컴포넌트에서 요구되는 경우
- 해당 기능이 기능을 쓰는 컴포넌트에게 여러 프로퍼티를 전달해야 하는 경우

## Render Props Pattern

- 장점
  - 재사용성과 데이터 공유 부분의 이슈를 해결
- 단점
  - 대부분의 render props는 Hooks로 대체 가능
  - render prop 내에서 라이프사이클 사용 불가

## Hooks Pattern

클래스 컴포넌트의 문제점(복잡함, 공통 로직을 빼내기 어려움, 관심사가 여러군데 나누어짐)에서 Hooks 등장! 그 외의 내용은 잘 아는 것들

## Flyweight Pattern

비슷한 객체를 대량으로 만들어야 할 때 메모리를 절약할 수 있게 해 주는 유용한 패턴

자바스크립트에서 프로토타입 상속을 통해서도 비슷한 효과를 낼 수 있다 보니 이 패턴은 그리 크게 중요하지 않게 됨

```js
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

const books = new Map(); // 👍 isbn에 따라 인스턴스 재활용
const bookList = []; // 전체 객체

const addBook = (title, author, isbn, availability, sales) => {
  const book = {
    ...createBook(title, author, isbn),
    sales,
    availability,
    isbn,
  };

  bookList.push(book);
  return book;
};

const createBook = (title, author, isbn) => {
  const existingBook = books.has(isbn);

  if (existingBook) {
    return books.get(isbn);
  }

  const book = new Book(title, author, isbn);
  books.set(isbn, book);

  return book;
};

addBook("Harry Potter", "JK Rowling", "AB123", false, 100);
addBook("Harry Potter", "JK Rowling", "AB123", true, 50);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", true, 10);
addBook("To Kill a Mockingbird", "Harper Lee", "CD345", false, 20);
addBook("The Great Gatsby", "F. Scott Fitzgerald", "EF567", false, 20);

console.log("Total amount of copies: ", bookList.length); // 5
console.log("Total amount of books: ", books.size); // 3
```

## Factory Pattern

함수를 호출하는 것으로 객체를 만들어낼 수 있다. new 키워드를 사용하는 대신 함수 호출의 결과로 객체를 만들 수 있는 것

- 장점
  - 동일한 프로퍼티를 가진 여러 작은 객체를 만들어낼 때 유용하다.
  - 현재의 환경이나 사용자 특징적인 설정을 통해 원하는 객체를 쉽게 만들 수 있다,
- 단점
  - 자바스크립트에서 팩토리 함수는 new 키워드 없이 객체를 만드는 것에서 크게 벗어나지 않음

```js
// 팩토리 함수
const createUser = ({ firstName, lastName, email }) => ({
  firstName,
  lastName,
  email,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
});

const user1 = createUser({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
});

// 클래스
class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const user1 = new User({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
});
```

## Compound Pattern

컴파운드 컴포넌트 패턴은 여러 컴포넌트들이 모여 하나의 동작을 할 수 있게 해 준다. (Select, Dropdown 등에 자주 사용됨)

- 장점
  - 구현에 필요한 내부 상태를 가지는데 이를 외부로 드러내지 않게 감춘다.
  - FlyOut.Toggle 처럼 컴포넌트를 일일히 import하지 않아도 되어 편리하다.
- 단점
  - [React.Children.map](https://reactjs.org/docs/react-api.html#reactchildrenmap)을 사용하면 쓰는 쪽에서 자식 컴포넌트를 약속된 형태로 넘겨야한다.
    ```js
    export default function FlyoutMenu() {
      return (
        <FlyOut>
          {/* This breaks */}
          <div>
            <FlyOut.Toggle />
            <FlyOut.List>
              <FlyOut.Item>Edit</FlyOut.Item>
              <FlyOut.Item>Delete</FlyOut.Item>
            </FlyOut.List>
          </div>
        </FlyOut>
      );
    }
    ```
  - 엘리먼트를 복제하는 경우. 복제 대상 컴포넌트가 기존에 갖고 있는 prop과 이름이 충돌될 수 있다. 이 경우 React.cloneElement를 사용할 때 넘어간 값으로 해당 prop은 덮어써질 것이다

```js
const FlyOutContext = createContext();

function FlyOut(props) {
  const [open, toggle] = useState(false);

  return (
    <FlyOutContext.Provider value={{ open, toggle }}>
      {props.children}
    </FlyOutContext.Provider>
  );
}

function Toggle() {
  const { open, toggle } = useContext(FlyOutContext);

  return (
    <div onClick={() => toggle(!open)}>
      <Icon />
    </div>
  );
}

FlyOut.Toggle = Toggle;
```

```js
import React from "react";
import { FlyOut } from "./FlyOut";

export default function FlyoutMenu() {
  return (
    <FlyOut>
      <FlyOut.Toggle />
      <FlyOut.List>
        <FlyOut.Item>Edit</FlyOut.Item>
        <FlyOut.Item>Delete</FlyOut.Item>
      </FlyOut.List>
    </FlyOut>
  );
}
```

## Command Pattern

> 명령을 처리하는 객체를 통해 메서드와 실행되는 동작의 결합도를 낮출 수 있다

특정 작업을 실행하는 개체 / 메서드를 호출하는 개체를 분리

- 장점
  - 커멘드 패턴은 객체와 메서드를 분리할 수 있게 해 준다. 이렇게 분리하면 수명이 지정된 명령을 만들거나. 명령들을 큐에 담아 특정한 시간대에 처리하는 것도 가능해진다.
- 단점
  - 커멘드 패턴을 쓸만한 상황이 딱히 많지 않고 종종 불필요한 코드가 만들어지곤 한다.

```js
// 메서드를 호출하는 개체
class OrderManager {
  constructor() {
    this.orders = [];
  }

  execute(command, ...args) {
    return command.execute(this.orders, ...args);
  }
}

// 특정 작업을 실행하는 개체
class Command {
  constructor(execute) {
    this.execute = execute;
  }
}

function PlaceOrderCommand(order, id) {
  return new Command((orders) => {
    orders.push(id);
    console.log(`You have successfully ordered ${order} (${id})`);
  });
}

function CancelOrderCommand(id) {
  return new Command((orders) => {
    orders = orders.filter((order) => order.id !== id);
    console.log(`You have canceled your order ${id}`);
  });
}

function TrackOrderCommand(id) {
  return new Command(() =>
    console.log(`Your order ${id} will arrive in 20 minutes.`)
  );
}

const manager = new OrderManager();

manager.execute(new PlaceOrderCommand("Pad Thai", "1234"));
manager.execute(new TrackOrderCommand("1234"));
manager.execute(new CancelOrderCommand("1234"));
```

[Refactoring Guru - Command](https://refactoring.guru/design-patterns/command)

## Learning JavaScript Design Patterns

[ebook - 자바스크립트 디자인 패턴](https://www.patterns.dev/posts/classic-design-patterns/)
