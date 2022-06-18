## Fragments, Portals, Refs



JSX의 제한 사항... 두 개 이상 리턴 불가 -> div로 감싸기 or 배열(키 주고)로 리턴

`<div>` soup

-> CSS 스타일링 망칠 수 있음, 렌더링할 게 많아서 성능 저하됨 (불필요한 내용 렌더링)



Wrapper.js 정의하고 아무것도 없이 칠드런 리턴



리액트 조각

Wrapper는 우리가 직접 작성하지 않아도 됨! -> 리액트에서 제공

프래그먼트 컴포넌트

`<React.Fragment></React.Fragment>`

`<></>`

import 방식에 따라 `<Fragment></Fragment>` 가능

`import React, { Fragment } from "react";`



리액트 포탈 (React Portals) <- 비슷한 역할 함

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



