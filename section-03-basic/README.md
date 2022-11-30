### JavaScript

1. `let`, `const`

2. Arrow Functions

   - ```javascript
     function callMe(name) {
       console.log(name);
     }
     ////////////////////////////////
     const callMe = function (name) {
       console.log(name);
     };
     ////////////////////////////////
     const callMe = (name) => {
       console.log(name);
     };
     ////////////////////////////////
     const callMe = () => {
       console.log("Max!");
     };
     ////////////////////////////////
     const callMe = (name) => {
       console.log(name);
     };
     ////////////////////////////////
     ////////////////////////////////
     const returnMe = (name) => {
       return name;
     };
     ////////////////////////////////
     const returnMe = (name) => name;
     ```

3. `export`, `import`

   - ```javascript
     export default ...; // default
     export const someData = ...; // named
     ```

   - ```javascript
     import someNameOfYourChoice from "./file.js";
     import { someData } from "./file.js";
     ```

4. `class`

   - ```javascript
     class Person {
       constructor() {
         this.name = "what";
       }
     }
     const person = new Person();
     console.log(person.name);
     ////////////////////////////////
     class Person {
       name = "what";
       printMyName() {
         console.log(this.name);
       }
     }
     ////////////////////////////////
     class Person {
       name = "what";
       printMyName = () => {
         console.log(this.name);
       };
     }
     ////////////////////////////////
     class Human {
       species = "human";
     }
     class Person extends Human {
       name = "what";
       printMyName = () => {
         console.log(this.name);
       };
     }
     ```

5. `...`

   - ```javascript
     const oldArray = [1, 2, 3];
     const newArray = [...oldArray, 4, 5]; // [1, 2, 3, 4, 5]
     const oldObject = {
         name: 'name';
     }
     const newObject = {
         ...oldObject,
         age: 20
     } // { name: 'name', age: 20 }
     ```

6. Destructuring

   - ```javascript
     const array = [1, 2, 3];
     const [a, b] = array; // a: 1, b: 2
     const myObj = {
       name: "myName",
       age: 20,
     };
     const { name } = myObj; // name: myName
     ```

React는 선언적 (Declarative Approach)

저번에 JavaScript로만 예제 작성했던 것은 명령형

### React

### Components

### Create React App

```bash
npx create-react-app my-app
cd my-app
npm start
```

### `package.json`

프로젝트에서 어떤 패키지들을 사용하고 있는지 보여줌

`npm install`, `npm i`

`node_modules` : 모든 종속 요소들을 가짐. 나의 로컬 컴퓨터에 다운로드한 서드 파티 패키지

### `/src`

모든 작업이 이루어지는 폴더

### `index.js`

최초로 실행되는 코드 (가장 먼저 실행되는 파일)

```javascript
import "./index.css";
```

위 같은 코드는 일반적인 JavaScript에서는 동작하지 않지만, 현재 프로젝트 설정으로는 가능

`npm start`를 통해 `index.css` 파일을 애플리케이션 전체에 포함하도록 함

`react`, `react-dom`

`ReactDOM.createRoot()` : React로 구축할 사용자 인터페이스인 React 애플리케이션을 불러온 웹 페이지 상에서 어디에 배치해야 하는지 React에 알려줌

`index.html` : React 애플리케이션 전체에서 사용하는 유일한 HTML 파일 (Single Page Application)

### `App.js`

3자 라이브러리나 우리의 JS 파일 중 하나라면 import할 때 `.js`는 생략 가능

### JSX

JavaScript XML

크롬 개발자 도구 -> Sources 여기서 자바스크립트 파일 볼 수 있음

`0.chunk.js`, `bundle.js`, `main.chunk.js` -> 전체 리액트 패키지 코드

컴포넌트 이름은 대문자로 해야 리액트가 연결할 수 있음

JSX 코드 조각마다 반드시 한 개의 루트 요소를 가짐

### CSS

```javascript
import "./ExpenseItem.css";
function ExpenseItem() {
  return <div></div>;
}
export default ExpenseItem;
```

그리고 태그에 `class`가 아닌 `className`을 사용

`className="expense-item"`, `className="expense-item__description"`

### Props

properties

사용자 지정 컴포넌트의 속성을 설정할 수 있음

모든 속성을 받는 객체

```javascript
<ExpenseItem title={title} amount={amount} date={date} />;
//
function ExpenseItem(props) {}
// 한 개의 매개변수로 받고, 보통 props라고 씀
```

컴포넌트를 반복할 때는 `key` 속성을 주자

### Composition

컴포넌트를 다른 컴포넌트를 감싸기. 컴포넌트를 결합할 때마다 합성을 사용

사용자 지정 컴포넌트를 일종의 컨텐츠를 감싸는 wrapper로 사용할 수 없음

내장 html 요소인 div, h2 등은 작동하지만 wrapper 컴포넌트를 만드려면 `props.children` 사용

```javascript
function Card(props) {
  return <div className={"card " + props.className}>{props.children}</div>;
}
```

---

### Components

- React 앱의 최소 단위
- props(부모->자식)를 입력 받아 state(내부에서 값 변경)에 따라 DOM Node를 출력하는 함수
- 항상 대문자로 시작
- UI를 재사용 가능한 개별적인 여러 조각으로 나누고, 각 조각을 개별적으로 살펴볼 수 있음
- JavaScript 함수와 유사 (함수형 컴포넌트)

1. 함수형 컴포넌트 (Stateless Functional Component)
2. 클래스형 컴포넌트 (Class Component)

### JSX

- JavaScript를 확장한 문법 (React와 함께 사용하는 것을 권장)
- React element를 생성
- 중괄호로 감싸 JSX 안에 사용 가능 (JavaScript 표현식)
- JSX도 표현식이므로 if, for loop 안에 사용 가능
- HTML 태그의 attribute에 중괄호를 사용해 JavaScript 표현식 삽입 가능
- `className`으로 class 삽입 가능
- Babel은 JSX를 `React.createElement()` 호출로 컴파일하기 때문에 객체를 표현
- 브라우저는 JSX 코드를 지원하지 않기 때문에 변환됨

## React app 생성

`npx create-react-app my-app`

`cd my-app`

`npm start` (`npm run start`)

### 명령형 (Imperative)

- 무엇을 **어떻게** 할 것

- 과정에 집중해 원하는 결과를 얻으려 함

- JavaScript는 명령형

- ```javascript
  const pa = document.createElement("p");
  pa.textContent = "This is also visible";
  document.getElementById("root").append(pa); // 무엇을 하는지 단계별로 정확히 지시
  ```

### 선언형

- **무엇을** 할 것
- 결과에만 집중하고 과정에 대해서는 추상화를 통해 깊게 알려 하지 않음
- 가독성이 좋고 예측이 쉬움

```javascript
// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // css를 import로 가져옴
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App /> // App (self-closing tag)
  </React.StrictMode>
);
```

```javascript
// App.js
import React from "react"; // 없어도 상관 없음 (없어도 자동으로 변환)

const App = () => {
  return (
    <div className="App">
      {" "}
      // className으로 클래스 지정
      <h2>Let's get started!</h2>
    </div>
  );
};

export default App;
```

`return`할 때 하나의 컴포넌트만 리턴

### 합성 (Composition)

상속 대신 합성을 사용하여 컴포넌트 간에 코드를 재사용하는 것이 좋음

`props.children`을 사용해서 자식 엘리먼트를 출력에 그대로 전달 (wrapper로만 사용)

```javascript
import React from "react";
import "./Card.css";

const Card = (props) => {
  // Card라는 wrapper
  const classes = "card " + props.className; // wrapper의 클래스 추가
  return <div className={classes}>{props.children}</div>; // 클래스 추가 후 props.children으로 바로 전달
};

export default Card;
```

### props

- 속성을 나타내는 데이터
- 컴포넌트에 전달하는 값
- 컴포넌트의 자체 props를 수정하면 안 됨 (반드시 순수 함수처럼 동작해야 함)

옛날 버전 React

```javascript
/*
return (
  <div>
    <h2>Let's get started!</h2>
    <Expenses items={expenses} />
  </div>
);
*/

import React from "react";
// ...
return React.createElement(
  "div",
  {},
  React.createElement("h2", {}, "Let's get started!"),
  React.createElement(Expenses, { items: expenses })
);
```
