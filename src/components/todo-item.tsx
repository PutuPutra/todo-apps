"use client";

import type React from "react";

import { useRef, useState } from "react";
import type { Todo } from "@/types/todo";
import Image from "next/image";

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
  const [isDragging, setIsDragging] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", index.toString());
    // For better drag preview
    if (e.dataTransfer.setDragImage && itemRef.current) {
      e.dataTransfer.setDragImage(itemRef.current, 0, 0);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    const dragIndex = Number.parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (dragIndex !== index) {
      moveTodo(dragIndex, index);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <li
      ref={itemRef}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      className={`group flex items-center px-5 py-4 border-b ${
        theme === "dark"
          ? "border-very-dark-grayish-blue-2 bg-very-dark-desaturated-blue text-light-grayish-blue-dark"
          : "border-light-grayish-blue bg-white text-very-dark-grayish-blue"
      } ${isDragging ? "opacity-50" : "opacity-100"} cursor-move`}
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
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/images/icon-check.svg" alt="Checkmark" width={11} height={9} />
          </div>
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
        <Image
          src="/images/icon-cross.svg"
          alt="Delete"
          width={18}
          height={18}
          className={`${
            theme === "dark"
              ? "brightness-75 hover:brightness-100"
              : "brightness-100 hover:brightness-75"
          }`}
        />
      </button>
    </li>
  );
}
