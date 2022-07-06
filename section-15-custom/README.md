# Section 15 Custom React Hooks

 

### Custom Hooks

- 결국은 정규 함수. 안에 상태를 설정할 수 있는 로직을 포함한 함수
- 정규 함수와는 다르게 다른 커스텀 훅을 포함한 다른 리액트 훅 사용 가능
- 커스텀 훅을 통해 다른 컴포넌트에서 사용할 수 있는 로직을 커스텀 훅으로 아웃소싱할 수 있고 이를 통해 다양한 컴포넌트에서 호출이 가능
- 로직 재사용이 가능

생성할 때 반드시 이름은 `use`로 시작해야 함

`components` 폴더와 같은 위치에 `hooks` 폴더 생성하고 안에 파일 작성

```javascript
// hooks/use-counter.js
import { useState, useEffect } from "react";

const useCounter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
};

export default useCounter;
```

