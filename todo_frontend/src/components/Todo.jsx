import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Main Todo Component
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [bgColor, setBgColor] = useState('#f4f7f6'); // Default background color

  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos from the API
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/todos/');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Add a new todo
  const addTodo = async () => {
    if (newTodo.title === '' || newTodo.description === '') {
      alert('Please provide both title and description');
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/todos/', newTodo);
      setNewTodo({ title: '', description: '' });
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Handle background color change
  const handleBgColorChange = (e) => {
    setBgColor(e.target.value);
  };

  return (
    <div className="todo-container" style={{ backgroundColor: bgColor }}>
      <h1 className="header">Todo App</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          className="input"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          className="input"
        />
        <button onClick={addTodo} className="button">Add Todo</button>
      </div>

      <div className="color-picker-container">
        <label className="color-label">Choose Background Color: </label>
        <input
          type="color"
          value={bgColor}
          onChange={handleBgColorChange}
          className="color-picker"
        />
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div className="todo-info">
              <h3 className="todo-title">{todo.title}</h3>
              <p className="todo-description">{todo.description}</p>
            </div>
            <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;

// Adding CSS styling directly within the component using 'styled-components' or external CSS
const styles = `
  /* Global Styles */
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f7f6;
  }

  /* Main Todo Container */
  .todo-container {
    width: 80%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }

  /* Header */
  .header {
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin-bottom: 20px;
  }

  /* Input Section */
  .input-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }

  .input:focus {
    border-color: #0056b3;
    outline: none;
  }

  /* Add Todo Button */
  .button {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .button:hover {
    background-color: #45a049;
  }

  /* Color Picker Section */
  .color-picker-container {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .color-label {
    font-size: 1rem;
    color: #333;
  }

  .color-picker {
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    cursor: pointer;
  }

  /* Todo List */
  .todo-list {
    list-style: none;
    padding: 0;
  }

  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
  }

  .todo-item:last-child {
    border-bottom: none;
  }

  .todo-info {
    max-width: 80%;
  }

  .todo-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }

  .todo-description {
    font-size: 1rem;
    color: #666;
  }

  /* Delete Button */
  .delete-button {
    background-color: #f44336;
    color: white;
    padding: 10px 15px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .delete-button:hover {
    background-color: #e53935;
  }
`;

// Add styles directly in the head for this demo, but typically, this would be in a separate .css file.
const styleTag = document.createElement('style');
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);
