

### Event

중괄호 안에 함수 전달

```javascript
const clickHandler = (event) => console.log(event.target.value);
//
<button onClick={clickHandler}></button>
////////////////////////////////////////////////////
<input type="text" onChange={titleChangeHandler} />
```

컴포넌트 -> 컴포넌트에도 전달 가능

```javascript
<ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
```



### useState

`useState(초기값)`

- 2개 리턴 (값, 값 변경 함수)

```javascript
import React, { useState } from "react";
// ...
const ExpenseItem = (props) => {
  const [title, setTitle] = useState(props.title); // 초기값 넣어줌. 무조건 2개 리턴

  const clickHandler = () => {
    setTitle("Updated!"); // title을 직접 변경하지 않고 setTitle을 이용
    console.log(title); // 업데이트 되지 않은 title이 출력 !!! <- 비동기 때문인데 나중에 알아보기
  };
  console.log("ExpenseItem evaluated by React");

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      {/* <button onClick={clickHandler}>Change Title</button> */}
    </Card>
  );
};
```



`useState`를 사용하지 않으면?

```javascript
import React, { useState } from "react";
// ...
const ExpenseItem = (props) => {
  let title = props.title; // props로 title을 부모에게 받음

  const clickHandler = () => {
    title = "updated!";
    console.log(title); // title은 분명 updated!로 변경되어 콘솔에는 출력되지만, 화면에는 변경되지 않음
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        {/* <h2>{title}</h2> */}
        <h2>{title}</h2> {/* 변경되지 않음... (콘솔에서는 변경됨) */}
        <div className="expense-item__price">${props.amount}</div>
      </div>
      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
};
```

React의 렌더링 방식 때문 (JSX의 작동 방식).. 이래서 State를 사용



리액트 훅은 컴포넌트 함수에서 직접 호출되어야 함 (바깥에다가 `useState` 같은 것 사용할 수 없음)



`onChange`가 `onInput`보다 모든 유형에 대해 변화를 잡을 수 있어 좋음



### useState 여러 개

여러 State를 위해 `useState`를 여러 번 쓸 수 있지만, 한 번에 뭉쳐 쓸 수도 있음 (나중에 더 알아보기)

1. `useState`를 여러 번 쓰기

   ```javascript
   // ExpenseForm.js
   import React, { useState } from "react";
   
   import "./ExpenseForm.css";
   
   const ExpenseForm = (props) => {
     const [enteredTitle, setEnteredTitle] = useState("");
     const [enteredAmount, setEnteredAmount] = useState("");
     const [enteredDate, setEnteredDate] = useState("");
   
     const titleChangeHandler = (event) => {
       setEnteredTitle(event.target.value);
     };
     const amountChangeHandler = (event) => {
       setEnteredAmount(event.target.value);
     };
     const dateChangeHandler = (event) => {
       setEnteredDate(event.target.value);
     };
   
     const submitHandler = (event) => {
       event.preventDefault();
   
       const expenseData = {
         title: enteredTitle,
         amount: enteredAmount,
         date: new Date(enteredDate),
       };
   
       props.onSaveExpenseData(expenseData); // 부모에게 전달
       setEnteredTitle("");
       setEnteredAmount("");
       setEnteredDate("");
     };
   
     return (
       // submit 버튼 대신 여기에 이벤트 연결
       <form onSubmit={submitHandler}>
         <div className="new-expense__controls">
           <div className="new-expense__control">
             <label>Title</label>
             <input type="text" value={enteredTitle} onChange={titleChangeHandler} />
           </div>
           <div className="new-expense__control">
             <label>Amount</label>
             <input type="number" value={enteredAmount} onChange={amountChangeHandler} />
           </div>
           <div className="new-expense__control">
             <label>Date</label>
             <input type="date" value={enteredDate} onChange={dateChangeHandler} />
           </div>
         </div>
         <div className="new-expense__actions">
           <button type="submit">Add Expense</button>
           {/* submit 버튼. 여기에 직접 이벤트 달지 않았음 */}
         </div>
       </form>
     );
   };
   
   export default ExpenseForm;
   ```

2. `useState`를 한 번에 쓰기 (잘못된 방식, 올바른 방식 확인)

   ```javascript
   // ExpenseForm.js
   import React, { useState } from "react";
   
   import "./ExpenseForm.css";
   
   const ExpenseForm = (props) => {
     // 객체를 이용해 작성
     const [userInput, setUserInput] = useState({
       enteredTitle: "",
       enteredAmount: "",
       enteredDate: "",
     });
   
     const titleChangeHandler = (event) => {
       // // 잘못된 방식
       // setUserInput({
       //   ...userInput,
       //   enteredTitle: event.target.value,
       // });
       // 올바른 방식
       setUserInput((prevState) => {
         return { ...prevState, enteredTitle: event.target.value };
       });
     };
   
     const amountChangeHandler = (event) => {
       // setUserInput({
       //   ...userInput,
       //   enteredAmount: event.target.value,
       // });
       setUserInput((prevState) => {
         return { ...prevState, enteredAmount: event.target.value };
       });
     };
   
     const dateChangeHandler = (event) => {
       // setUserInput({
       //   ...userInput,
       //   enteredDate: event.target.value,
       // });
       setUserInput((prevState) => {
         return { ...prevState, enteredDate: event.target.value };
       });
     };
   
     const submitHandler = (event) => {
       event.preventDefault();
   
       // ...
     };
   
     return (
       <form onSubmit={submitHandler}>
         <div className="new-expense__controls">
           <div className="new-expense__control">
             <label>Title</label>
             <input type="text" value={enteredTitle} onChange={titleChangeHandler} />
           </div>
           <div className="new-expense__control">
             <label>Amount</label>
             <input type="number" value={enteredAmount} onChange={amountChangeHandler} />
           </div>
           <div className="new-expense__control">
             <label>Date</label>
             <input type="date" value={enteredDate} onChange={dateChangeHandler} />
           </div>
         </div>
         <div className="new-expense__actions">
           <button type="submit">Add Expense</button>{" "}
         </div>
       </form>
     );
   };
   
   export default ExpenseForm;
   ```



### Two way binding (양방향 바인딩)

```javascript
// ExpenseForm.js
import React, { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  // ...

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  // ...

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    props.onSaveExpenseData(expenseData); // 부모에게 전달
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          {/* value에 state 변수를 작성해 양방향 바인딩 */}
          <input type="text" value={enteredTitle} onChange={titleChangeHandler} />
        </div>
        {/* ... */}
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
```



### Lifting State Up

- 자식 컴포넌트에서 부모 컴포넌트로 값 전달

예시 (ExpenseForm -> NewExpense)

```javascript
// ExpenseForm.js
import React, { useState } from "react";

import "./ExpenseForm.css";

// props로 부모에게 받음
const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // 데이터 생성
    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };
    props.onSaveExpenseData(expenseData); // 부모의 함수에 담아 생성한 데이터 전달
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" value={enteredTitle} onChange={titleChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input type="number" value={enteredAmount} onChange={amountChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" value={enteredDate} onChange={dateChangeHandler} />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
```

```javascript
// NewExpense.js
import React from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  // 자식이 넘긴 데이터를 enteredExpenseData로 받음
  const saveExpenseDataHandler = (enteredExpenseData) => {
    // 데이터 생성
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData); // 부모 App.js의 함수를 이용해 생성 데이터 전달
  };

  return (
    <div className="new-expense">
      {/* 자식에게 데이터를 받기 위해 함수 전달 */}
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  );
};

export default NewExpense;
```



`Presentational Component` v `Stateful Component`

`Stateless Component` v `Stateful Component`

`Dumb Component` v `Smart Component`

