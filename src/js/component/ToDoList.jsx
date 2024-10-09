import React, { useState, useEffect } from "react";

const ToDoList = () => {

	const [newTodo, setNewTodo] = useState("");
	const [list, setList] = useState([])
	const clearInputField = () => {
		let input1 = document.getElementById('typeTodo');
		input1.value = "";
	}



	const handleChange = (event) => {

		setNewTodo(event.target.value)

	}
	

	const createUser = () => {
		fetch('https://playground.4geeks.com/todo/users/Tgodwin94', {
			method: "POST",

		})
			.then(resp => {
			
				return resp.json(); 
			})
			.then(data => {
				
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}
	const getList = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/todo/users/Tgodwin94')
			const data = await response.json()
			if (response.status == 404) {
				createUser()

			}
			if (response.ok) {
				setList(data.todos)
			}
		} catch (error) { }
	}

	const deleteTodo = async (id) => {

		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			})

			getList()

		}
		catch (error) {
			console.log(error)

		}
	}

	
	const addNewTodo = () => {
		fetch('https://playground.4geeks.com/todo/todos/Tgodwin94', {
			method: "POST",
			body: JSON.stringify({
				"label": newTodo,
				"is_done": false
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (resp.ok) {
					getList()
				}
			})

			.catch(error => {
				console.log(error);
			});
	}

	useEffect(() => {
		getList()
	}, [])

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">
				To-Do List
			</h1>
			<div className="postTodo">
				<input id="typeTodo" type="text" value={newTodo} onChange={handleChange} />
				<button type="button" className="btn btn-success" onClick={() => { addNewTodo(); clearInputField();}}>
					Add a to-do
				</button>
			</div>
			<p><b>New To-Do:</b> {newTodo} </p>
			<ul>
				{list.map((item, index) => {
					return (
						<li key={index}>
							{item.label}<button type="button" className="btn btn-danger" onClick={() => deleteTodo(item.id)}> Delete </button>

						</li>
            
					)
				})}
			</ul>
		</div>
	)
}

export default ToDoList;