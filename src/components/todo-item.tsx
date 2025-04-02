"use client";
import type { Todo } from "@/types/todo";
import { XCircle } from "lucide-react";

interface TodoItemProps {
  todo: Todo;
  index: number;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
  theme: "light" | "dark";
}

export default function TodoItem({
  todo,
  index,
  toggleTodo,
  deleteTodo,
  moveTodo,
  theme,
}: TodoItemProps) {
  return (
    <li
      className={`group flex items-center px-5 py-4 border-b ${
        theme === "dark"
          ? "border-very-dark-grayish-blue-2 bg-very-dark-desaturated-blue text-light-grayish-blue-dark"
          : "border-light-grayish-blue bg-white text-very-dark-grayish-blue"
      }`}
    >
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`relative flex-shrink-0 w-5 h-5 rounded-full mr-4 cursor-pointer ${
          todo.completed
            ? "bg-gradient-to-r from-check-bg-from to-check-bg-to"
            : theme === "dark"
            ? "border border-very-dark-grayish-blue-2"
            : "border border-light-grayish-blue"
        }`}
      >
        {todo.completed && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="9"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
          </svg>
        )}
      </button>

      <span
        className={`flex-grow ${
          todo.completed
            ? theme === "dark"
              ? "line-through text-very-dark-grayish-blue-1"
              : "line-through text-light-grayish-blue"
            : ""
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        aria-label="Delete todo"
      >
        <XCircle
          size={18}
          className={`${
            theme === "dark"
              ? "text-very-dark-grayish-blue-1 hover:text-light-grayish-blue-hover"
              : "text-light-grayish-blue hover:text-very-dark-grayish-blue"
          }`}
        />
      </button>
    </li>
  );
}
