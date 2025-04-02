"use client";

import { useEffect, useState } from "react";
import TodoList from "@/components/todo-list";
import TodoInput from "@/components/todo-input";
import TodoFilters from "@/components/todo-filters";
import ThemeToggle from "@/components/theme-toggle";
import { useStore, useFilteredTodos, useActiveCount } from "@/store";
import Image from "next/image";
import { useMobile } from "@/hooks/use-mobile";
import { useTheme } from "next-themes";

export default function Home() {
  const todos = useFilteredTodos();
  const activeCount = useActiveCount();
  const { filter, addTodo, toggleTodo, deleteTodo, clearCompleted, moveTodo, setFilter } =
    useStore();

  const { theme, setTheme } = useTheme();
  const isMobile = useMobile();
  const [mounted, setMounted] = useState(false);

  // Only show the UI when mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-very-light-gray dark:bg-very-dark-blue">
        <p className="text-dark-grayish-blue dark:text-dark-grayish-blue-dark">Loading...</p>
      </div>
    );
  }

  const isDarkTheme = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkTheme ? "bg-very-dark-blue" : "bg-very-light-gray"
      }`}
    >
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 h-[300px] overflow-hidden z-0">
          <Image
            src={
              isMobile
                ? isDarkTheme
                  ? "/images/bg-mobile-dark.jpg"
                  : "/images/bg-mobile-light.jpg"
                : isDarkTheme
                ? "/images/bg-desktop-dark.jpg"
                : "/images/bg-desktop-light.jpg"
            }
            alt="Background"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div className="relative z-10 max-w-lg mx-auto px-4 pt-12 pb-16">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold tracking-[0.3em] text-white">TODO</h1>
            <ThemeToggle />
          </header>

          <TodoInput addTodo={addTodo} theme={isDarkTheme ? "dark" : "light"} />

          <div
            className={`mt-6 rounded-md overflow-hidden shadow-xl ${
              isDarkTheme ? "bg-very-dark-desaturated-blue" : "bg-white"
            }`}
          >
            <TodoList
              todos={todos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              moveTodo={moveTodo}
              theme={isDarkTheme ? "dark" : "light"}
            />

            <div
              className={`px-5 py-4 flex justify-between items-center text-sm ${
                isDarkTheme
                  ? "text-dark-grayish-blue-dark border-t border-very-dark-grayish-blue-2"
                  : "text-dark-grayish-blue border-t border-light-grayish-blue"
              }`}
            >
              <span>{activeCount} items left</span>

              <div className="hidden md:flex">
                <TodoFilters
                  filter={filter}
                  setFilter={setFilter}
                  theme={isDarkTheme ? "dark" : "light"}
                />
              </div>

              <button
                onClick={clearCompleted}
                className={`${
                  isDarkTheme
                    ? "text-dark-grayish-blue-dark hover:text-light-grayish-blue-hover"
                    : "text-dark-grayish-blue hover:text-very-dark-grayish-blue"
                } transition-colors`}
              >
                Clear Completed
              </button>
            </div>
          </div>

          <div
            className={`md:hidden mt-4 rounded-md py-4 shadow-xl ${
              isDarkTheme ? "bg-very-dark-desaturated-blue" : "bg-white"
            }`}
          >
            <TodoFilters
              filter={filter}
              setFilter={setFilter}
              theme={isDarkTheme ? "dark" : "light"}
            />
          </div>

          <p
            className={`mt-10 text-center text-sm ${
              isDarkTheme ? "text-dark-grayish-blue-dark" : "text-dark-grayish-blue"
            }`}
          >
            Drag and drop to reorder list
          </p>
        </div>
      </div>
    </div>
  );
}
