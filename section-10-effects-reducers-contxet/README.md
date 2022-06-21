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



### `useReducer` Hook

복잡한 State를 관리할 때 `useState` 대신 사용

```javascript
const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);
```

- `state` : 최신 state 스냅샷
- `dispatchFn` : state를 업데이트하는 함수. 새로운 state 값을 설정하는 대신 action을 dispatch
- `reducerFn` : dispatch된 action을 가져 오는 함수. 최신 state 스냅샷을 자동으로 가져오고 새로운 업데이트된 state 반환 `(prevState, action) => newState`
- 





