import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Todo } from "@/types/todo";

interface TodoState {
  todos: Todo[];
  filter: "all" | "active" | "completed";

  // Actions
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  clearCompleted: () => void;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
  setFilter: (filter: "all" | "active" | "completed") => void;
}

export const useStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [
        { id: 1, text: "Complete online JavaScript course", completed: true },
        { id: 2, text: "Jog around the park 3x", completed: false },
        { id: 3, text: "10 minutes meditation", completed: false },
        { id: 4, text: "Read for 1 hour", completed: false },
        { id: 5, text: "Pick up groceries", completed: false },
        { id: 6, text: "Complete Todo App on Frontend Mentor", completed: false },
      ],
      filter: "all",

      // Actions
      addTodo: (text: string) => {
        if (text.trim()) {
          set((state) => ({
            todos: [
              ...state.todos,
              {
                id: Date.now(),
                text,
                completed: false,
              },
            ],
          }));
        }
      },

      toggleTodo: (id: number) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },

      deleteTodo: (id: number) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },

      moveTodo: (dragIndex: number, hoverIndex: number) => {
        set((state) => {
          const newTodos = [...state.todos];
          const dragTodo = newTodos[dragIndex];
          newTodos.splice(dragIndex, 1);
          newTodos.splice(hoverIndex, 0, dragTodo);
          return { todos: newTodos };
        });
      },

      setFilter: (filter: "all" | "active" | "completed") => {
        set({ filter });
      },
    }),
    {
      name: "todo-storage",
    }
  )
);

// Add these computed selectors
export const useFilteredTodos = () => {
  const todos = useStore((state) => state.todos);
  const filter = useStore((state) => state.filter);

  if (filter === "active") return todos.filter((todo) => !todo.completed);
  if (filter === "completed") return todos.filter((todo) => todo.completed);
  return todos;
};

export const useActiveCount = () => {
  const todos = useStore((state) => state.todos);
  return todos.filter((todo) => !todo.completed).length;
};
