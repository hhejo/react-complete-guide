### .map()

### `key` props

- 아이템 추가하면 맨 위에 추가되는데, HTML에서는 맨 아래에 추가됐다고 표시됨 (근데 다시 업데이트로 위로 감)

- React는 모든 목록을 체크해서 업데이트 -> 버그 발생할 수 있고, 성능 저하됨
- `key`를 사용해서 해결 (map 메서드의 index를 줄 수도 있지만, 권장하지 않음)

```javascript
// ExpenseList.js
import React from "react";

import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {
  // props.items가 하나도 없으면 <h2></h2> 리턴
  if (props.items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }

  // 하나라도 있으면 <ExpenseItem /> 리턴
  return (
    <ul className="expenses-list">
      {/* .map() 메서드 */}
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          title={expense.title}
          amount={expense.amount}
          date={expense.date}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
```



### 자식에게 받은 값으로 배열에 업데이트

잘못된 방법, 올바른 방법 구분하기

```javascript
// App.js
import React, { useState } from "react";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

const DUMMY_EXPENSES = [
  // ...
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  // ...
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    // setExpenses([expense, ...expenses]); // 잘못된 방법
    // 올바른 방법
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div className="App">
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
```



### filter (조건 필터링)

- `&&` 연산자를 이용
- 조건을 만족할 때 렌더링할 JSX content를 `&&` 뒤에 배치
- 아예 컴포넌트화하는 것을 추천

```javascript
// Expenses.js
import React, { useState } from "react";

import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";
import Card from "../UI/Card";
import "./Expenses.css";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2020");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesChart expenses={filteredExpenses} />
        {/* {expensesContent} */}
        <ExpensesList items={filteredExpenses} />
        {/* 조건 만족하면 렌더링할 JSX content가 && 뒤에 옴 */}
        {/* {filteredExpenses.length === 0 && <p>No expenses found.</p>}
        {filteredExpenses.length > 0 &&
          filteredExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              title={expense.title}
              amount={expense.amount}
              date={expense.date}
            />
          ))} */}

        {/* {filteredExpenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          filteredExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              title={expense.title}
              amount={expense.amount}
              date={expense.date}
            />
          ))
        )} */}
      </Card>
    </div>
  );
};

export default Expenses;

```



### 조건부 렌더링

```javascript
// NewExpense.js
import React, { useState } from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };

  const startEditingHandler = () => setIsEditing(true);

  const stopEditingHandler = () => setIsEditing(false);

  return (
    <div className="new-expense">
      {/* isEditing이 false */}
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Expense</button>
      )}
      {/* isEditing이 true */}
      {isEditing && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
```



### 간단한 숫자 변환

문자열 숫자 앞에 `+`를 붙임

