import React from "react";
import { useState } from "react";

const ToDoList = () => {
	const [ inputValue, setInputValue ] = useState("")
	const [ todos, setTodos ] = useState([])

	return (
		<div className="container">
			<h1>To-Do List</h1>
			<ul className="to-dolist">
				<li>
					<input 
						type="text" 
						onChange={(e) => setInputValue(e.target.value)} 
						value={inputValue} 
						onKeyPress={(e) => {
							if (e.key === "Enter") {
								setTodos(todos.concat([inputValue]));
								setInputValue("");
							}
						}}
					 	placeholder="Enter a to-do task"></input>
				</li>
				{todos.map((item, index) => (
					<li>
						{item}{" "} 
						<i 
							class="fa-solid fa-trash-can" 
							onClick={() => 
								setTodos(
									todos.filter(
										(t, currentIndex) => 
											index != currentIndex
									)
								)
							}></i>
					</li>
				))}
			</ul>
			<div className="task-count">{todos.length} tasks
			</div>
		</div>
	);
};

export default ToDoList;
