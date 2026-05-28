function TodoApp() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      <TodoStats todos={todos} />
    </div>
  );
}

export default TodoApp;
