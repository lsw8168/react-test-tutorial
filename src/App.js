import React from "react";
import "./App.css";
import { saveTodo, loadTodos, destroyTodo } from "./lib/service";

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div className={`todo ${todo.isCompleted ? "completed": ''}`}>
      <input className="toggle" type="checkbox" readOnly checked={todo.isCompleted} />
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>완료</button>
        <button className="destroy" onClick={() => removeTodo(index)}>삭제</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        autoFocus
        className="input"
        value={value}
        placeholder="todo를 입력하세요."
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    loadTodos()
      .then(({data}) => setTodos(data))
      .catch(() => setError(true))
    }, [])
      
    
  const addTodo = text => {
    // const newTodos = [...todos, { text }];
    // setTodos(newTodos);
    const newTodo = {text: text, isCompleted: false}
    saveTodo(newTodo)
      .then(({data}) => setTodos([...todos, data]))
      .catch(() => setError(true))
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const remaining = todos.filter(t => !t.isCompleted).length;

  return (
    <div className="app">
      <h1>todos</h1>
      {error ? <span className='error'>Oh no!</span> : null}
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
      <div className="todo-count">{remaining} todos left</div>
    </div>
  );
}

export default App;
