import React from "react";
import Badge from "./Badge";
import { Trash2 } from "lucide-react";

function TodoListCard({
  id,
  title,
  type,
  isCompleted,
  deleteTodo,
  updateTodo,
}) {
  return (
    <div
      className={`border rounded-lg p-5 flex items-center mb-5 transition-colors duration-200 ${
        isCompleted ? "bg-gray-200" : "bg-gray-50"
      }`}
    >
      <div className="flex-shrink-0">
        <input
          checked={isCompleted}
          type="checkbox"
          className="w-4 h-4 accent-blue-600"
          onChange={(e) => {
            updateTodo(id, { isCompleted: !isCompleted });
          }}
        />
      </div>
      <div className="flex-1 px-4 min-w-0">
        <p
          className={`font-medium transition-all duration-200 ${
            isCompleted ? "text-gray-500 line-through" : "text-gray-800"
          }`}
        >
          {title}
        </p>
        <Badge text={type} />
      </div>
      <div className="flex-shrink-0">
        <Trash2
          color="#cf0c0c"
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            deleteTodo(id);
          }}
        />
      </div>
    </div>
  );
}

export default TodoListCard;
