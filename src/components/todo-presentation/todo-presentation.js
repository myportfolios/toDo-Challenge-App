import React, { useState, useEffect } from "react";

import "./todo.scss";

export default function TodoPresentation() {
  const emptyString = "";
  const [checkbox, setCheckbox] = useState(true);
  const [todoItem, setTodoItem] = useState(emptyString);
  const [todoList, addTodoList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  //clear userInput field
  useEffect(() => {
    setTodoItem(emptyString);
  }, [todoList]);
  //get user input
  const handleUserInput = (e) => {
    let code = e.which;
    let key = e.key;
    if (code === 13 || key === "Enter") {
      addTodoHandler();
    }
    let value = e.target.value;
    setTodoItem(value);
  };

  //save user input
  const addTodoHandler = () => {
    if (!todoItem) {
      return;
    }
    addTodoList([...todoList, todoItem]);
  };
  //handle Checkbox
  const handleCheckbox = (e, checked) => {
    let duplicate = checkedList.includes(checked);
    duplicate &&
      setCheckedList(
        checkedList.filter((item) => {
          return item !== checked;
        })
      );
    !duplicate && setCheckedList([...checkedList, checked]);

    setCheckbox(true);
    setCheckbox(!checkbox);
  };
  //list display
  let listDisplay =
    todoList &&
    todoList.map((todo, index) => {
      return (
        <div
          key={index}
          className={checkedList.includes(todo) ? "is-done" : ""} //add style if checked
          style={{ display: "flex" }}
        >
          <li className="display-todo-box_todo">{todo}</li>
          <input
            type="checkbox"
            className="display-todo-box__checkbox"
            onClick={(e) => handleCheckbox(e, todo)}
          />
        </div>
      );
    });
  let totalNoOfTodo = todoList && todoList.length; //total number of task
  let remainingTask =
    checkedList.length > 0 ? totalNoOfTodo - checkedList.length : totalNoOfTodo; //total number of outstanding task
  return (
    <div>
      <h1>To do</h1>
      <RenderInputWithBtn>
        <div className="input-btn-box">
          <input
            type="text"
            placeholder="ENTER TODO"
            className="input-btn-box__text-input"
            onChange={handleUserInput}
            value={todoItem}
            onKeyPress={handleUserInput}
          />
          <input
            type="submit"
            className="input-btn-box__save-btn"
            onClick={addTodoHandler}
            value="ADD TODO"
          />
        </div>
      </RenderInputWithBtn>
      <RenderTodoList>
        <ul>{listDisplay}</ul>
      </RenderTodoList>
      <h5>
        {remainingTask} remaining out of {totalNoOfTodo}
      </h5>
    </div>
  );
}
const RenderInputWithBtn = ({ children }) => {
  return children;
};

const RenderTodoList = (props) => {
  return props.children;
};
