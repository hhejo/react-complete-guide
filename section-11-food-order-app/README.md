## Building a Food Order App

아이템들을 렌더링할 때 아이템은 `li` 태그로 만들고 상위 컴포넌트는 `ul` 컴포넌트로 만들어야 좋음

아이템들을 map으로 생성할 때 꼭 `key` 속성 주기

`toFixed()` : 실수 자료형 메서드이고 소수점 이하 몇 자리까지 표시 (인수로 값 넣어줌) -> 문자열로 반환

`<input {...props.input} />` : input에 한번에 속성 다 넣기

상위 컴포넌트에서는 아래 처럼 작성 (input 속성으로 한번에)

```javascript
<Input
  label=""
  input={{
    id: `_${props.id}`,
    type: "",
    min: "",
    max: "",
    step: "",
    defaultValue: "",
  }}
/>
```

`defaultValue` : 기본값 속성

굳이 감싸려는 것이 없다면 `<div />` 이렇게 작성해도 괜찮음

Modal과 Portal

```javascript
import ReactDOM from "react-dom/client";
const Backdrop = (props) => {};
const ModalOverlay = (props) => {};
const portalElement = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};
```

Backdrop, ModalOverlay, Modal 만들고 portal 생성

```javascript
const Cart = (props) => {
  return <Modal>{/* ... */}</Modal>;
};
```

Modal 컴포넌트로 나타낼 것 감싸기

Context를 많이 사용하면 해당 컴포넌트의 사용성은 한정됨

`reduce(("인수1", "인수2") => {}, "시작값")`

```javascript
const numberOfCartItems = cartCtx.items.reduce(
  (curNumber, item) => curNumber + item.amount,
  0
);
```

`concat()` : 배열에 새 항목 추가하고 새 배열을 반환하는 배열 메서드

`findIndex()`

`bind()`

코드 참고

Context(Provider), Modal 사용법 잘 알아두기
