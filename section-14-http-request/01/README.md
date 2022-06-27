## How Does React Work Behind The Scenes?

Understanding the Virtual DOM & DOM Updates

Understanding State & State Updates



### 1. React

- A JavaScript library for building user interfaces
- 컴포넌트, 상태 객체를 관리하고 다른 객체의 상태와 컴포넌트가 바뀌어야 하는지 확인하고 컴포넌트의 변경 전후의 상태를 확인하는 라이브러리
- components, props만 신경 씀!
- component 트리의 현재 모양과 최종 모양을 결정. 상태를 업데이트
- 



### 2. ReactDOM

- Interface to the Web
- 브라우저의 일부인 실제 DOM에 대한 작업 수행
- 사용자가 보는 화면에 무언가를 표시
- 상태가 업데이트되면 component 트리를 통해 구성한 가상 스냅샷인 가상 DOM과 일치하도록 실제 DOM을 조작



state, props, context, component에 변경이 발생하면, 컴포넌트 함수가 재실행되어 React가 재평가

하지만 이것이 DOM을 다시 렌더링하는 것은 아님 (실제 DOM의 각 부분들이 다시 렌더링 x)

Components, React, Real DOM을 구분



### 3. Components



항상 현재 스냅샷에 기반해 값을 변경할 것

```javascript
// App.js
// ...
function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const toggleParagraphHandler = () => {
    // setShowParagraph(!showParagraph); // 이전 스냅샷에 기반에 작업하기 때문에 좋지 않음
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      {showParagraph && <p>This is new!</p>}
      <Button onClick={toggleParagraphHandler}>Toggle Paragrah!</Button>
    </div>
  );
}

export default App;
```



paragraph  p 태그를 다른 컴포넌트에 옮기고 실행하면 해당 컴포넌트만 변경

해당 컴포넌트에 props를 false로 고정해도 항상 컴포넌트 변경

```javascript
// App.js
// ...
function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const toggleParagraphHandler = () => {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      {/* <DemoOutput show={showParagraph} /> */}
      {/* 항상 false지만 재실행 -> React.memo()를 사용하면 됨 */}
      <DemoOutput show={false} />
      <Button onClick={toggleParagraphHandler}>Toggle Paragrah!</Button>
    </div>
  );
}

export default App;
```

```javascript
// components/Demo/DemoOutput.js
// ...
const DemoOutput = (props) => {
  return <p>{props.show ? "This is new!" : ""}</p>;
};

export default DemoOutput;
```

연결된 컴포넌트는 모두 재실행



### `React.memo()`

- 해당 컴포넌트에 어떤 props가 입력되는지 확인하고, 입력되는 모든 props의 신규 값을 확인한 뒤 이를 기존의 props의 값과 비교하도록 React에 전달. 그리고 props의 값이 바뀐 경우에만 컴포넌트를 재실행, 재평가

```javascript
// components/Demo/DemoOutput.js
// ...
const DemoOutput = (props) => {
  return <p>{props.show ? "This is new!" : ""}</p>;
};

export default React.memo(DemoOutput);
```

`memo()`가 먹지 않는 경우

- 매번 `App` 함수가 실행될 때마다 새로운 함수 객체가 생성되고, 그 함수 객체가 props로 전달되면, 두 함수는 `props.onClick`과 `props.previous.onClick`을 비교하게 되고(비유) 함수 객체는 JavaScript에서 같지 않기 때문에 (reference 자료형) 둘은 다름. 따라서 컴포넌트가 바뀌었으므로 (함수의 기능은 같지만) 재실행
- props로 primitive 자료형을 넘겨줬으면, 이전 값이나 현재 값이나 같다고 JavaScript에서 판정하기 때문에 컴포넌트는 재실행하지 않음



### `useCallback` Hook

- 컴포넌트 실행 전반에 걸쳐 함수를 저장할 수 있게 하는 훅
- React에 우리는 이 함수를 저장할 것이고, 매번 실행할 때마다 이 함수를 재생성할 필요가 없다는 것을 알림
- 동일한 함수 객체가 메모리의 동일한 위치에 저장되므로 비교 작업 가능
- `useCallback(함수, 의존성 배열)`

```javascript
// App.js
import React, { useState, useCallback } from "react";
// ...
function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  console.log("APP RUNNING!");
  const toggleParagraphHandler = useCallback(() => {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  }, []);

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={false} />
      <Button onClick={toggleParagraphHandler}>Toggle Paragrah!</Button>
    </div>
  );
}

export default App;
```

이제 컴포넌트 DemoOutput, Button은 재평가, 재실행되지 않음 (App 컴포넌트만 재실행 (버튼 누를 시에))

```javascript
// App.js
// ...
function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);
  console.log("APP RUNNING!");
  
  const toggleParagraphHandler = useCallback(() => {
    if (allowToggle) {
      setShowParagraph((prevShowParagraph) => !prevShowParagraph);
    }
  }, [allowToggle]);

  const allowToggleHandler = () => {
    setAllowToggle(true);
  };

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={allowToggleHandler}>Allow Toggle</Button>
      <Button onClick={toggleParagraphHandler}>Toggle Paragrah!</Button>
    </div>
  );
}

export default App;
```

Button 하나 더 생성. `useCallback()` 의존성 배열에 변수명 넣어줌

그렇지 않으면 useCallback은 초기 함수에서 초기 변수 값을 저장하기 때문에 버튼을 눌러도 값이 변하지 않음



### State

- `useState`도 재실행할 때 바뀌는 것인가?
- `useState`를 호출하면, React는 백그라운드에서 이를 관리하고 컴포넌트와 이를 묶어줄 새로운 상태 변수 생성
- `useState`를 호출했는데 왜 `App` 함수가 매번 다시 실행?
- `useState`는 React가 제공하며, 상태를 관리하고 컴포넌트와의 연결을 관리하기 때문
- 여기에 전달된 기본값에 대해서는 한 번만 고려되도록 처리 (컴포넌트가 처음 렌더링될 때)

### Scheduled State Change (상태 갱신 예약)

- set... 함수로 값을 변경하면, state 값은 바로 변경되지 않고 예약을 걸어둠. 상태 변화가 처리되면, React가 컴포넌트를 재평가하고 컴포넌트 함수를 재실행
- 스케줄링 때문에 다수의 예약 상태 변화가 동시에 있을 수 있음
- 그러므로 동시에 여러 번의 갱신이 스케줄될 수 있기 때문에 상태를 갱신할 때는 함수를 이용 (set... 함수) (특히 이전 상태의 스냅샷에 의존한다면)



### `useMemo` Hook

- `useMemo(저장하고 싶은 것을 반환하는 함수, 의존성 배열)`
- 변수 값을 저장할 수 있음 (재평가하지 않게 저장)
- 보통은 `useCallback`을 써서 함수를 더 많이 저장

