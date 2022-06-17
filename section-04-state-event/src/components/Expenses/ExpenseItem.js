// import React, { useState } from "react";

// Stateless Component (Presentational, Dumb) : 아무 상태를 갖지 않고 단지 데이터를 출력하기 위해 존재

import React from "react";

import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  // const [title, setTitle] = useState(props.title); // 초기값 넣어줌. 무조건 2개 리턴

  // const clickHandler = () => {
  //   setTitle("Updated!"); // title을 직접 변경하지 않고 setTitle을 이용
  //   console.log(title); // 업데이트 되지 않은 title이 출력
  // };
  console.log("ExpenseItem evaluated by React");

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        {/* <h2>{title}</h2> */}
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      {/* <button onClick={clickHandler}>Change Title</button> */}
    </Card>
  );
};

export default ExpenseItem;
