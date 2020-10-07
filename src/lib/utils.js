export const filterTodos = (filter, todos) => filter
  ? todos.filter(todo => todo.isCompleted === (filter === 'completed'))
  : todos