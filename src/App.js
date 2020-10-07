import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import { saveTodo, loadTodos, destroyTodo, updateTodo } from "./lib/service";
import { filterTodos } from './lib/utils';

function Todo({ todo, completeTodo, removeTodo }) {
  return (
    todo.map(todo => 
      <div key={todo.id} className={`todo ${todo.isCompleted ? "completed": ''}`}>
        <input type="checkbox" readOnly checked={todo.isCompleted} />
        {todo.text}
        <div>
          <button className="toggle" onClick={() => completeTodo(todo.id)}>완료</button>
          <button className="destroy" onClick={() => removeTodo(todo.id)}>삭제</button>
        </div>
      </div>
    )
  )
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
      
    
  const addTodo = React.useCallback(text => {
    // const newTodos = [...todos, { text }];
    // setTodos(newTodos);
    const newTodos = {text: text, isCompleted: false}
    saveTodo(newTodos)
      .then(({data}) => setTodos([...todos, data]))
      .catch(() => setError(true))
  }, [todos]);

  const completeTodo = React.useCallback(id => {
    const targetTodo = todos.find(t => t.id === id)
    // console.log(targetTodo)
    const updated = {
      ...targetTodo,
      isCompleted: !targetTodo.isCompleted
    }
    // console.log(updated)

    updateTodo(updated)
      .then(({data}) => {
        const updateTodos = todos.map(
          t => t.id === data.id ? data : t
        )
        setTodos(updateTodos)
      })

    // console.log("index", index)
    // console.log("todos", ...todos)
    // console.log("updated", updated)

    // const updateTodos = [
    //   ...todos.slice(0, index),
    //   updated,
    //   ...todos.slice(index + 1)
    // ]
    // console.log("t", updateTodos)

    // setTodos(updateTodos)

    // updateTodo(updated)
    //   .then(({data}) => {
    //     console.log(data)
    //   })


    // const newTodos = [...todos];
    // newTodos[index].isCompleted = true;
    // setTodos(newTodos);
  }, [todos]);

  const removeTodo = React.useCallback(id => {
    // const newTodos = [...todos];
    // newTodos.splice(index, 1);
    // console.log(todos[index])

    // destroyTodo(index).then(() => setTodos(newTodos))
    // destroyTodo(index).then(() => console.log(index))
    // destroyTodo(index).then(() => setTodos(todos.filter(todo => todo.id !== id)))
    destroyTodo(id)
      .then(() => setTodos(todos.filter(t => t.id !== id)))
      .catch(() => setError(true))
  }, [todos]);

  const remaining = todos.filter(t => !t.isCompleted).length;

  return (
    <Router>
      <div className="app">
        <h1>todos</h1>
        {error ? <span className='error'>Oh no!</span> : null}
        <div className="todo-list">
          <Route path='/:filter?' render={({match}) => 
            <Todo 
              todo={filterTodos(match.params.filter, todos)} 
              completeTodo={completeTodo} 
              removeTodo={removeTodo}
            />
          } />
          <TodoForm addTodo={addTodo} />
        </div>
          <div className="todo-count">{remaining}{remaining === 1 ? ' todo' : ' todos'} left</div>
          <ul className="filters">
            <li><Link to="/">All</Link></li>
            <li><Link to="/active">Active</Link></li>
            <li><Link to="/completed">Completed</Link></li>
          </ul>
      </div>
    </Router>
  );
}

export default App;
