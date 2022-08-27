# Effects, Reducers, Context

## Effect (Side Effect)

리액트가 하는 일

- UI render, react to user input,
- Evaluate & render JSX, manage State & Props
- React to events & input
- Re-evaluate component upon State & Prop changes

### Side Effects

- 위를 제외한 나머지들
- Store data in browser storage
- Send HTTP requests to backend servers
- Set and manage timers ...

이 작업들은 normal component evaluation의 밖에서 일어나야 함

로컬 스토리지 사용하기
`localStorage.setItem("키", "값")`
`localStorage.getItem("키")`
크롬 개발자 도구 -> Application -> Storage -> Local Storage

### `useEffect()` Hook

```javascript
useEffect(() => { ... }, [ dependencies ]);
```

1. `() => { ... }`
   모든 컴포넌트 평가 후에 실행되어야 하는 함수 (지정된 의존성이 변경된 경우)

2. `[ dependencies ]`
   지정된 의존성으로 구성된 배열

   지정한 의존성이 변경된 경우에만 함수 실행 (컴포넌트가 다시 렌더링될 때는 실행되지 않음)

   데이터 가져오기는 한 번만 실행되어야 함 (아니면 무한 루프에 빠질 수 있음)

   배열이 비어있다면 컴포넌트 함수가 처음으로 실행될 때 의존성이 변경된 것으로 간주 (의존성이 없었기 때문) -> 단 한 번만 실행. 이후로 의존성은 절대 변경되지 않기 때문

```javascript
useEffect(() => {
  const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
  if (storedUserLoggedInInformation === "1") {
    setIsLoggedIn(true);
  }
}, []); // 빈 의존성 배열 (단 한 번만 실행)
```

의존성 배열이 비었다고 없애지 말자

의존성 배열이 useEffect에 아예 없으면 컴포넌트가 재평가될 때마다 실행

그러면 useEffect의 콜백 함수가 컴포넌트 함수 바로 안으로 이동한 것과 같음

의존성이 없기 때문에 해당 코드는 컴포넌트가 다시 렌더링될 때마다 다시 실행

그 코드에 state를 설정하는 setState 함수가 있었다면, 재 렌더링 주기 자체를 트리거 -> 무한루프 발생

모든 컴포넌트 렌더링 주기 이후에 실행되기 때문

```javascript
useEffect(() => {
  setFormIsValid(
    enteredEmail.includes("@") && enteredPassword.trim().length > 6
  );
}, [setFormIsValid, enteredEmail, enteredPassword]); // setFormIsValid 함수는 리액트에 의해 절대 변경되지 않도록
// 보장되기 때문에 setFormIsValid는 생략 가능
```

사용자 입력 데이터의 사이드 이펙트

### 종속성으로 추가할 항목 및 추가하지 않을 항목

effect 함수에서 사용하는 모든 것을 종속성으로 추가해야 함 -> 거기에서 사용하는 모든 상태 변수와 함수를 포함

예외

- 상태 업데이트 기능을 추가할 필요 (ex)setFormIsValid) (해당 함수는 리액트가 절대 변경되지 않도록 보장하기 때문에 추가할 필요 없음)
- 내장 API 또는 함수를 추가할 필요 없음(ex)fetch(), localStorage()) (브라우저 API, 전역 기능은 리액트 구성 요소 렌더링 주기와 관련이 없으며 변경되지 않음)
- 변수, 함수를 추가할 필요 없음. 아마도 구성 요소 외부에서 정의했을 것

구성 요소(또는 일부 상위 구성 요소)가 다시 렌더링되어 이러한 것들이 변경될 수 있는 경우에 종속성으로 추가

```javascript
import { useEffect, useState } from "react";

let myTimer;

const MyComponent = (props) => {
  const [timerIsActive, setTimerIsActive] = useState(false);

  const { timerDuration } = props; // using destructuring to pull out specific props values

  useEffect(() => {
    if (!timerIsActive) {
      setTimerIsActive(true);
      myTimer = setTimeout(() => {
        setTimerIsActive(false);
      }, timerDuration);
    }
  }, [timerIsActive, timerDuration]);
};
```

1. `timerIsActive` 는 종속성으로 추가되었습니다. 왜냐하면 구성 요소가 변경될 때 변경될 수 있는 구성 요소 상태이기 때문이죠(예: 상태가 업데이트되었기 때문에)
2. `timerDuration` 은 종속성으로 추가되었습니다. 왜냐하면 해당 구성 요소의 prop 값이기 때문입니다 - 따라서 상위 구성 요소가 해당 값을 변경하면 변경될 수 있습니다(이 MyComponent 구성 요소도 다시 렌더링되도록 함).
3. `setTimerIsActive` 는 종속성으로 추가되지 않습니다. 왜냐하면예외 조건이기 때문입니다: 상태 업데이트 기능을 추가할 수 있지만 React는 기능 자체가 절대 변경되지 않음을 보장하므로 추가할 필요가 없습니다.
4. `myTimer` 는 종속성으로 추가되지 않습니다. 왜냐하면 그것은 구성 요소 내부 변수가 아니기 때문이죠. (즉, 어떤 상태나 prop 값이 아님) - 구성 요소 외부에서 정의되고 이를 변경합니다(어디에서든). 구성 요소가 다시 평가되도록 하지 않습니다.
5. `setTimeout` 은 종속성으로 추가되지 않습니다 왜냐하면 그것은 내장 API이기 때문입니다. (브라우저에 내장) - React 및 구성 요소와 독립적이며 변경되지 않습니다.

### Debouncing (그룹화)

사용자의 입력을 잠시 기다렸다가 유효성 검사를 수행하면 더 효율적 (입력할 때마다 state 변경하면 비효율적)

사용자가 타이핑을 일시 중지했을 때 수행 (Form 유효성 검사)

### Clean-Up function

useEffect는 return할 때 클린업 할 수 있음 (함수 자체를 반환 -> 클린업 함수 반환)

클린업은 모든 새로운 사이드 이펙트 함수가 실행되기 전에 실행됨

```javascript
useEffect(() => {
  const identifier = setTimeout(() => {
    console.log("Checking form validity!");
    setFormIsValid(
      enteredEmail.includes("@") && enteredPassword.trim().length > 6
    );
  }, 500);

  return () => {
    console.log("CLEANUP");
    clearTimeout(identifier);
  };
}, [enteredEmail, enteredPassword]);
```

## Reducer

### `useReducer` Hook

한 함수 내에서 두 개 이상의 state를 보는데 최신 스냅샷이 아닌 경우

```javascript
const emailChangeHandler = (event) => {
  setEnteredEmail(event.target.value);
  setFormIsValid(
    event.target.value.includes("@") && enteredPassword.trim().length > 6
  ); // 이메일을 검사하는데 가장 최근에 입력한 암호가 포함되지 않을 수 있음 (리액트가 state 업데이트를 스케줄링하는 방식 때문)
};
```

그래서 setState 함수에서는 콜백 함수로 관리해야 함 (prevState => {} 이 방법)

최근 스냅샷이 아닌 state에 의존할 수 있기 때문

그러나 두 개의 다른 state에 의존하고 있기 때문에 사용할 수 없는 방법

그렇다면? -> `useReducer` 사용

복잡한 State를 관리할 때 `useState` 대신 사용

다른 state를 기반으로 하는 state를 업데이트하면 하나의 state로 병함하는 것도 좋음 (useReducer 없이)

```javascript
const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);
```

- `state` : 최신 state 스냅샷
- `dispatchFn` : state를 업데이트하는 함수. 새로운 state 값을 설정하는 대신 action을 dispatch
- `reducerFn` : dispatch된 action을 가져 오는 함수. 최신 state 스냅샷을 자동으로 가져오고 새로운 업데이트된 state 반환 `(prevState, action) => newState`
- dispatch 함수에는 객체가 들어감. type을 키로 지정할 수 있고, 페이로드 또한 넣을 수 있음

### example

```javascript
// Login.js
// password 부분 제외 (전체 코드 참고)
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  // 구조분해할당 with alias
  // 문자만 변했는데도 검사하는 것을 막기
  const { isValid: emailIsValid } = emailState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid); // 여기도 emailState -> emailIsValid, passwordState -> passwordIsValid로 변경
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]); // emailState 또는 passwordState가 변경될 때마다 실행 -> 막으려면?
  // emailState에서 isValid만 빼서 쓰면 됨. 어차피 그 변수만 사용하기 때문에 (password도 똑같이)
  // emailState -> emailIsValid, passwordState -> passwordIsValid로 변경

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);

    // 원래 setFormIsValid() 함수에서 위 처럼 사용하면 업데이트되지 않은 이전 state를 사용할 수 있음
    // 리액트가 보장하는 최신 state를 사용해야 안전하기 때문에, 위 useEffect() 처럼 사용하면 됨
    // 해당 의존성 배열에 있는 값으로 리액트가 잡아내 state를 최신화하기 때문
    // 따라서 useEffect() 안에서 최신 state 값을 보장하고, 해당 값을 이용해 setFormIsValid() 함수를 사용
    // 그러니까 여기서 setState같은 함수 사용은 ㄴㄴ
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
```

useEffect에는 전체 개체 대신 특정 속성을 종속성으로 전달 가능

```javascript
[someObject.someProperty]; // 가능
```

`useEffect`를 사용할 때는 전체 개체 대신 특정 속성을 종속성으로 전달하는 것이 좋음. 그렇지 않으면 전체 개체의 모든 속성이 변경될 때마다 재실행 됨

### `useState` v `useReducer`

- `useState`는 주요 state 관리 도구
- 개별 state및 data를 다루기에 적합 (간단한 state)
- state 업데이트가 쉽고 몇 종류 안 되는 경우, state가 잘 변하지 않는 경우
- `useReducer`는 state로서의 객체가 있는 경우, 복잡한 state가 있는 경우 고려
- 더 강력하기 때문에 좋음
- state가 연관되어 있을 때, 복잡한 state 업데이트

## Context

앱이 커질 수록 prop 체인이 길어지기 때문에 중앙에서 state를 관리하는 것이 필요

React 내부적으로 state를 관리할 수 있도록 해줌. 앱의 어떤 컴포넌트에서라도 직접 변경해 다른 컴포넌트에 직접 전달할 수 있게 해줌 (prop 체인 없이)

폴더의 이름은 `context`, `state`, `store`로 하는 경우가 많음

### `createContext` 사용

`React.createContext()`

- `context` 객체 생성

- ```javascript
  // store/auth-context.js
  import React from "react";

  const AuthContext = React.createContext({
    isLoggedIn: false,
  });

  export default AuthContext;
  ```

Provider, Consumer

`<AuthContext.Provider></AuthContext.Provider>`로 감싸줌

`<AuthContext.Consumer></AuthContext.Consumer>`로 감싸줌

Consumer는 함수를 하나 필요로 함. context를 받고 컴포넌트를 리턴

```javascript
// App.js
// ...
import AuthContext from "./store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // ...
  // Provider에 prop 전달
  return (
    // value 프롭 추가해서 오류 해결
    // 그냥 Provider만 쓰면 기본값 때문에 오류 발생
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn }}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
```

Consumer를 사용하는 방법

```javascript
// components/MainHeader/Navigation.js
import React from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../../store/auth-context";

const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(ctx) => {
        return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Navigation;
```

이러면 오류가 발생. 기본값이 있기 때문

기본값은 공급자 없이 소비하는 경우에만 사용. 따라서 공급자는 필요하지 않았음

해결하려면 Provider에서 프롭을 추가

이 방법보다는 훅이 조금 더 유용함

### `useContext` Hook

consumer를 사용하는 대신 `useContext()` 사용

```javascript
// components/MainHeader/Navigation.js
import React, { useContext } from "react";

import classes from "./Navigation.module.css";
import AuthContext from "../../store/auth-context";

const Navigation = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
```

아예 App.js가 아닌 auth-context.js에서 관리할 수 있게 함

코드 참고

Context에 함수도 전달할 수 있음

```javascript
const logoutHandler = () => {};
// ...
<AuthContext.Provider
  value={{
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler,
  }}
>
  // ...
</AuthContext.Provider>;
```

위 처럼 만들어도 되지만 AuthContext를 정의한 파일에 가서 기본 컨텍스트에 해당 함수 추가해주고 `() => {}` 달아 주는 것이 좋음

IDE 자동완성이 가능

```javascript
<button onClick={ctx.onLogout}>Logout</button>
```

`AuthContext.Provider`를 아예 `auth-context.js`에 넣고 useState를 이용해 상태를 관리할 수 있음

```javascript
import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logoutHandler = () => {
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
```

전체 로그인 state를 관리

위 코드에 다 쓰지는 않았지만 로컬 스토리지에 접속하는 등 로직을 짤 수 있음

useEffect도 넣을 수 있음

App.js에서 context 관련 코드 다 제거하고

index.js에서 <App />을 context 태그로 묶음

코드 참고

### 한계

변경이 잦은 경우 부적합 (1초에 여러 번 state 변경 등)

모든 props를 변경하면 좋지 않음

### Rules of Hooks

React Hook은 use로 시작하는 모든 함수

1. React Hooks는 React Functions(React Component Functions, Custom Hooks) 에서만 호출
2. React Component Functions 혹은 Custom Hooks의 최상위 수준에서만 호출 (중첩 함수, 블록에서 x)
3. `useEffect`는 항상, 참조하는 모든 항목을 의존성으로 `useEffect` 내부에 추가해야 함 (그렇지 않을 이유가 없다면)

### Forward Refs

ref를 사용자 커스텀 input에 넘길 수 있음

예시) 제출 버튼을 클릭할 때, 양식이 비어있다면 자동 포커스하는 기능

`useImperativeHandle`

`React.forwardRef()`

136번 강의부터 2개 강의 다시보기

코드 참고
