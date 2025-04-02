"use client";

import type React from "react";

import { useState } from "react";

interface TodoInputProps {
  addTodo: (text: string) => void;
  theme: "light" | "dark";
}

export default function TodoInput({ addTodo, theme }: TodoInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border ${
          theme === "dark" ? "border-very-dark-grayish-blue-2" : "border-light-grayish-blue"
        }`}
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Create a new todo..."
        className={`w-full py-4 pl-14 pr-4 rounded-md outline-none ${
          theme === "dark"
            ? "bg-very-dark-desaturated-blue text-light-grayish-blue-dark placeholder:text-dark-grayish-blue-dark"
            : "bg-white text-very-dark-grayish-blue placeholder:text-dark-grayish-blue"
        }`}
      />
    </form>
  );
}
