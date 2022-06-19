## Fragments, Portals, Refs

JSX는 두 개 이상 리턴할 수 없기 때문에 `<div></div>`로 감싸거나 `[]`(배열)로 리턴

### `<div>` soup

그렇게 계속 `div`로 감싸면 CSS 스타일링이 나빠지고, 렌더링할 것이 많아져 성능 저하됨 (불필요하고 중첩되는 div들)

해결하기 위해 감쌀 `Wrapper.js` 정의하고 아무것도 없이 `props.children` 리턴



### Fragments

React 조각

리액트에서 제공하는 fragment로 Wrapper는 직접 작성하지 않아도 됨

`Fragment Components` 두 가지 방식

- `<React.Fragment></React.Fragment>`

- `<></>`

```javascript
import React, { Fragment } from "react";
```

`<Fragment></Fragment>`도 가능



### Portals

React 포탈









modal은 semantic 관점에서 좋지 않음 -> 전체 페이지에 대한 오버레이이기 때문

리액트 포탈을 사용하면 됨

html 파일에 가서 div 추가

...



렌더링된 HTML을 다른 곳으로 옮기는 것 -> 포탈



또 다른 기능

ref (레퍼런스)

...

원래 직접 DOM을 조작하면 안되지만 초기화정도는 해도 됨. 일반적으로는 하지 않는 게 좋음

값만 읽고 싶다면 ref를 쓰자. state는 불필요한 작업이 많음 값만 읽기에



uncontroled components (제어되지 않는 컴포넌트)

우리가 쓴 input (ref를 사용한)

리액트롤 입력 요소의 state를 제어하지 않기 때문

폼 컴포넌트는 브라우저에 의해 내부적으로 state를 가짐

전에 useState로 했던 방식이 제어된 방식 (controled components)

내부 state가 리액트에 의해 제어되기 때문



