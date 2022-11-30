## Project With Modal

```
App
- AddUser
  - ErrorModal
    - Card
      - Button
  - Card
    - Button
- UsersList
  - Card
```

1. `App`
   - `usersList` 관리. `AddUser`에서 유저 추가하는 것을 받고 `UserList`에 내려줌
2. `AddUser`
   - 이름, 나이 입력 관리. 에러 관리. 입력이 올바르면 `App`에 데이터 전달(`AddUserHandler`). 에러에 따라 `ErrorModal` 표현
3. `UsersList`
   - `users` 출력. `Card` 컴포넌트로 포장
4. `ErrorModal`
   - 모달 출력 컴포넌트
5. `Card`
   - UI 컴포넌트
6. `Button`
   - UI 컴포넌트

React에서 `<label></label>`에 `htmlFor`를 `for`대신 사용

`className` props 받고 `className` 2개 주기

- ```javascript
  <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  ```

`.trim()` : 문자열 양 끝 공백 제거

`Math.random().toString()` : id 랜덤하게 줄 때 쓰는 방법

### Error Handler (with modal)

```javascript
const ErrorModal = (props) => {
  return (
    <div>
      {/* div를 모달이 될 컴포넌트 앞에 작성 (모달 떴을 때 뒤에 가려줌) */}
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <Card className={classes.modal}>// ..</Card>
    </div>
  );
};
```
