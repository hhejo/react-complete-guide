## Fragments, Portals, Refs

JSX는 두 개 이상 리턴할 수 없기 때문에 `<div></div>`로 감싸거나 `[]`(배열)로 리턴

하지만 배열 안에 넣어서 리턴하면 각 값에 key를 줘야 하기 때문에 불편함

### `<div>` soup

그렇게 계속 `div`로 감싸면 CSS 스타일링이 나빠지고, 렌더링할 것이 많아져 성능 저하됨 (불필요하고 중첩되는 div들)

해결하기 위해 감쌀 `Wrapper.js` 정의하고 아무것도 없이 `props.children` 리턴

```javascript
const Wrapper = (props) => props.children;
export default Wrapper;
```

## Fragments

React 조각

리액트에서 제공하는 fragment로 Wrapper는 직접 작성하지 않아도 됨

`Fragment Components` 두 가지 방식

- `<React.Fragment></React.Fragment>`

- `<></>`

```javascript
import React, { Fragment } from "react";
```

`<Fragment></Fragment>`도 가능

## Portals

React 포탈

modal은 semantic 관점에서 좋지 않음 -> 전체 페이지에 대한 오버레이이기 때문

React 포탈을 이용해서 코드를 다른 곳으로 옮김

1. component를 이동시킬 장소 필요
2. component에게 그 곳에 포탈을 가져야 한다고 알려줌

`ReactDOM.createPortal(렌더링되어야 하는 리액트 노드(JSX), 이 요소가 렌더링될 실제 DOM의 컨테이너를 가리키는 포인터)`

```html
<!-- index.html -->
<!-- ... -->
<div id="backdrop-root"></div>
<div id="overlay-root"></div>
<div id="root"></div>
<!-- ... -->
```

```javascript
// UI/ErrorModal.js
import ReactDom from "react-dom";
// import ReactDom from "react-dom/client"; // React 18 버전인 경우

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return <Card className={classes.modal}>...</Card>;
};

const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDom.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};
```

## Refs

레퍼런스

다른 DOM 요소에 접근해 그것들로 작업할 수 있게 해줌

`useRef()`

HTML 태그에 ref 속성에 달아줌

ref 값은 항상 객체, 항상 current 프롭을 가짐

current 프롭은 그 ref가 연결된 실제 값을 가짐

기본값을 정의하지 않아도 코드가 실행되자마자 ref 프롭 때문에 해당 input에 연결됨

current 프롭에 저장된 것은 실제 DOM 노드 -> 조작하지 않는 것이 좋음 (DOM은 리액트에 의해서만 조작되어야 함)

```javascript
const nameInputRef = useRef();
// ...
console.log(nameInputRef.current.value);
```

제출 버튼을 눌렀을 때 읽을 수 있는 ref

state는 값만 읽기에는 불필요한 작업이 많기 때문에, 값만 읽고 싶다면 ref를 사용하는 것이 좋음

원래 직접 DOM을 조작하면 안되지만 초기화정도는 해도 됨. 일반적으로는 하지 않는 게 좋음

```javascript
nameInputRef.current.value = ""; // 자주 쓰지 말자
```

```javascript
// Users/AddUser.js
import React, { useState, useRef } from "react";
// ...
const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // const [enteredUsername, setEnteredUsername] = useState("");
  // const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;

    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    // 주의해서 쓰자
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
    // setEnteredUsername("");
    // setEnteredAge("");
  };

  // const usernameChangeHandler = (event) => {
  //   setEnteredUsername(event.target.value);
  // };

  // const ageChangeHandler = (event) => {
  //   setEnteredAge(event.target.value);
  // };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            // value={enteredAge}
            // onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
```

값만 읽으려고 할 때 (아무것도 변경하지 않고) `state`는 그렇게 좋지 않음 -> `ref`를 쓰자

`state`를 키 로그 기록용으로 사용하는 것은 좋지 않음

불필요한 코드 작업이 많기 때문

값만 읽고 싶다면 `ref`를 사용해라

### Uncontroled, Controled Components

`Uncontroled Components` (제어되지 않는 컴포넌트)

- 우리가 쓴 input (ref를 사용한)
- 리액트롤 입력 요소의 state를 제어하지 않기 때문
- 리액트가 관여하지 않는다 (useRef는 단지 DOM 요소와 연결하기 위함)

`Controled Components` (제어되는 컴포넌트)

- 폼 컴포넌트는 브라우저에 의해 내부적으로 state를 가짐
- 전에 useState로 했던 방식이 제어된 방식 (controled components)
- 내부 state가 리액트에 의해 제어되기 때문
