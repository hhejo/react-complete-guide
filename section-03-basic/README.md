### JavaScript

1. `let`, `const`

2. Arrow Functions

   - ```javascript
     function callMe(name) {
         console.log(name);
     }
     ////////////////////////////////
     const callMe = function(name) {
         console.log(name);
     };
     ////////////////////////////////
     const callMe = (name) => {
         console.log(name);
     };
     ////////////////////////////////
     const callMe = () => {
         console.log('Max!');
     };
     ////////////////////////////////
     const callMe = name => {
         console.log(name);
     };
     ////////////////////////////////
     ////////////////////////////////
     const returnMe = name => {
         return name;
     }
     ////////////////////////////////
     const returnMe = name => name;
     ```

3. `export`, `import`

   - ```javascript
     export default ...; // default
     export const someData = ...; // named
     ```

   - ```javascript
     import someNameOfYourChoice from './file.js';
     import { someData } from './file.js';
     ```

4. `class`

   - ```javascript
     class Person {
         constructor() {
             this.name = 'what';
         }
     }
     const person = new Person();
     console.log(person.name);
     ////////////////////////////////
     class Person {
         name = 'what';
         printMyName() {
             console.log(this.name);
         }
     }
     ////////////////////////////////
     class Person {
         name = 'what';
         printMyName = () => {
             console.log(this.name);
         }
     }
     ////////////////////////////////
     class Human {
         species = 'human';
     }
     class Person extends Human {
         name = 'what';
         printMyName = () => {
             console.log(this.name);
         }
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
         name: 'myName',
         age: 20
     }
     const { name } = myObj; // name: myName
     ```



React는 선언적 (Declarative Approach)



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
    <div className="App"> // className으로 클래스 지정
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

const Card = (props) => { // Card라는 wrapper
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

import React from 'react';
// ...
return React.createElement('div', {}, 
  React.createElement('h2', {}, "Let's get started!"),
  React.createElement(Expenses, {items: expenses})
);
```

