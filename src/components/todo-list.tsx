import TodoItem from "./todo-item";
import type { Todo } from "@/types/todo";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
  theme: "light" | "dark";
}

export default function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  moveTodo,
  theme,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div
        className={`py-8 text-center ${
          theme === "dark" ? "text-dark-grayish-blue-dark" : "text-dark-grayish-blue"
        }`}
      >
        No todos to display
      </div>
    );
  }

  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          moveTodo={moveTodo}
          theme={theme}
        />
      ))}
    </ul>
  );
}
