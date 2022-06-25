## Effects, Reducers, Context



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

```javascript
useEffect(() => {
  const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
  if (storedUserLoggedInInformation === "1") {
    setIsLoggedIn(true);
  }
}, []);
```

```javascript
useEffect(() => {
  setFormIsValid(
    enteredEmail.includes("@") && enteredPassword.trim().length > 6
  );
}, [enteredEmail, enteredPassword]);
```



### Debouncing (그룹화)

사용자가 타이핑을 일시 중지했을 때 수행 (Form 유효성 검사)



### Clean-Up function

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

복잡한 State를 관리할 때 `useState` 대신 사용

```javascript
const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);
```

- `state` : 최신 state 스냅샷
- `dispatchFn` : state를 업데이트하는 함수. 새로운 state 값을 설정하는 대신 action을 dispatch
- `reducerFn` : dispatch된 action을 가져 오는 함수. 최신 state 스냅샷을 자동으로 가져오고 새로운 업데이트된 state 반환 `(prevState, action) => newState`



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
  // emailState -> emailIsValid, passwordState -> passwordIsValid로 변경

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
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

코드 참고

