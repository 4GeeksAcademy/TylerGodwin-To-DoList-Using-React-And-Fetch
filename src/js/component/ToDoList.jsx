import React from "react";
import { useState } from "react";

const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((t, currentIndex) => currentIndex !== index));
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <ul className="todoList">
        {" "}
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={handleKeyDown}
            placeholder="Enter a to-do task"
          ></input>
        </li>
        {todos.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <i
              className="fa-solid fa-trash-can"
              onClick={() => handleDelete(index)}
            ></i>
          </li>
        ))}
      </ul>
      <div className="taskCount">{todos.length} tasks</div>
    </div>
  );
};

export default ToDoList;