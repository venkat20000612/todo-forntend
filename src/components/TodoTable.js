import React, { useEffect, useState } from 'react'

import API from '../services/apis'

const TodoTable = () => {

    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [completed, setCompletd] = useState(false);
    const [error, setError] = useState("")

    const fetchtodos = async () => {
        try {
            const res = await API.get("/all");
            setTodos(res.data);
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchtodos();
    }, [])

    const deleteTodo = async (id) => {
        await API.delete(`/${id}`)
        fetchtodos();
    }

    const togggleStaus = async (todo) => {
        await API.put(`/${todo._id}`, {
            completed: !todo.completed
        });
        fetchtodos();
    }

    const addtodo = async (e)=> {
        e.preventDefault();

        if(!title.trim()){
            setError("Please Enter a Task")
            return;
        }

        try {
            await API.post("/", {title, completed})
            setTitle("");
            setCompletd(false)
            setError("")
            fetchtodos();
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div>
            <h2>Todo List</h2>

            <form onSubmit={addtodo}>
                <input
                    type='text'
                    placeholder='Enter your task'
                    value={title}
                    onChange={(e)=> {setTitle(e.target.value); setError("")}}
                />
                <select 

                    value={completed}
                    onChange={(e)=> setCompletd(e.target.value === "true")}

                >
                    <option value="false">Pending</option>
                    <option value="true">completed</option>

                </select>
                <button type='Submit'>Add Todo</button>

                {error && <p style={{color: 'red'}}>{error}</p>}

            </form>

            <br/>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>S. No</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <tr key={todo._id}>
                            <td>{index + 1}</td>
                            <td>{todo.title}</td>
                            <td>
                                {todo.completed ? "Completed" : "Pending"}
                            </td>
                            <td>
                                <button onClick={() => togggleStaus(todo)}>
                                    Toggle
                                </button>
                                <button onClick={() => deleteTodo(todo._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TodoTable
