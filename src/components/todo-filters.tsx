"use client";

interface TodoFiltersProps {
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
  theme: "light" | "dark";
}

export default function TodoFilters({ filter, setFilter, theme }: TodoFiltersProps) {
  const baseClass = "font-bold mx-2 transition-colors";
  const activeClass = "text-bright-blue";
  const inactiveClass =
    theme === "dark"
      ? "text-dark-grayish-blue-dark hover:text-light-grayish-blue-hover"
      : "text-dark-grayish-blue hover:text-very-dark-grayish-blue";

  return (
    <div className="flex justify-center">
      <button
        onClick={() => setFilter("all")}
        className={`${baseClass} ${filter === "all" ? activeClass : inactiveClass}`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`${baseClass} ${filter === "active" ? activeClass : inactiveClass}`}
      >
        Active
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`${baseClass} ${filter === "completed" ? activeClass : inactiveClass}`}
      >
        Completed
      </button>
    </div>
  );
}
