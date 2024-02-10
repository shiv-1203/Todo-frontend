import React, { useState, useEffect } from "react";
import '../styles/ToDoTable.css';
import { useDispatch, useSelector } from "react-redux";
import SweetAlert2 from "react-sweetalert2";

const ToDoTable = () => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);
    const idTobeSearched = useSelector(state => state.idTobeSearched);
    const [newTodo, setNewTodo] = useState('');
    const [swalProps, setSwalProps] = useState({});

    function handleClick() {
        setSwalProps({
            show: true,
            showConfirmButton: false
        });
    }

    useEffect(() => {
        // Fetch todos from the server when the component mounts
        fetch('https://todo-backend-41in.onrender.com/getTodos')
            .then((res) => res.json())
            .then((data) => dispatch({ type: 'SET_TODOS', payload: data.todos }))
            .catch((error) => console.error('Error fetching todos:', error));
    }, [dispatch]);

    const handleAddTodo = () => {
        setSwalProps({
            show: false,
        });
        fetch('https://todo-backend-41in.onrender.com/addTodo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                todo: {
                    id: Date.now(),
                    description: newTodo
                }
            }),
        })
            .then((res) => res.json())
            .then((data) => dispatch({ type: 'ADD_TODO', payload: data.todo }))
            .catch((error) => console.error('Error adding todo:', error));
        setNewTodo('');
    };

    const handleDeleteTodo = (index) => {
        fetch(`https://todo-backend-41in.onrender.com/${index}`, { method: 'DELETE' })
            .then((res) => res.json())
            .then((data) => dispatch({ type: 'DELETE_TODO', payload: index }))
            .catch((error) => console.error('Error deleting todo:', error));
    };

    return (
        <div>
            <div className="container">
                <div className="line"></div>
                <div className="centeredText">Showing {todos !== undefined ? (idTobeSearched === undefined ? todos.length : idTobeSearched.length) : 0} entries</div>
                <div className="line"></div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="headEntries">ID</th>
                        <th className="headEntries">Description</th>
                        <th className="headEntries">Delete</th>
                        <th className="headAddButton"><div className="button" onClick={handleClick}>
                            Add
                        </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {todos !== undefined ? (idTobeSearched === undefined ?
                        (todos.map(todo => (
                            <tr key={todo.id}>
                                <td className="bodyEntries">{todo.id}</td>
                                <td className="bodyEntriesDesc">{todo.description}</td>
                                <td className="bodyEntries"><div className="button" onClick={() => handleDeleteTodo(todo.id)}>Delete</div></td>
                            </tr>))) : (
                            (idTobeSearched.map(todo => (
                                <tr key={todo.id}>
                                    <td className="bodyEntries">{todo.id}</td>
                                    <td className="bodyEntriesDesc">{todo.description}</td>
                                    <td className="bodyEntries"><div className="button" onClick={() => handleDeleteTodo(todo.id)}>Delete</div></td>
                                </tr>)))
                        )
                    ) : (
                        <tr>
                            <td></td>
                            <td style={{ textAlign: 'center' }}>
                                No entries found
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <SweetAlert2 {...swalProps} didClose={() => { setSwalProps({ show: false }) }}>
                <h3 className="swalAdd">Add Todo</h3>
                <input
                    className="addInput"
                    type="text"
                    placeholder="Enter new todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <div className="buttonAdd" onClick={handleAddTodo}>
                    Add
                </div>
            </SweetAlert2>
        </div>
    );

}

export default ToDoTable;