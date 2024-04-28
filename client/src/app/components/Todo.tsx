import React, { useState } from "react";
import { TodoType } from "../types";
import { useTodos } from "../hooks/useTodo";

interface TodoProps {
  todo: TodoType;
}

function Todo({ todo }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const { todos = [], mutate } = useTodos();

  const handleEdit = async () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      const response = await fetch(
        `http://localhost:8080/editTodo/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editedTitle,
            isCompleted: false,
          }),
        }
      );

      if (response.ok) {
        const editedTodo = await response.json();
        const updatedTodos = todos.map((t) =>
          t.id === editedTodo.id ? editedTodo : t
        );
        mutate([...updatedTodos]);
        setEditedTitle("");
      }
    }
  };

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:8080/deleteTodo/${todo.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    const updatedTodos = todos.filter((t) => todo.id !== t.id);
    mutate([...updatedTodos]);
    setEditedTitle("");
  };

  const toggleTodoCompletion = async (id: number, isCompleted: boolean) => {
    const response = await fetch(`http://localhost:8080/editTodo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isCompleted: !isCompleted,
      }),
    });

    if (response.ok) {
      const editedTodo = await response.json();
      const updatedTodos = todos.map((t) =>
        t.id === editedTodo.id ? editedTodo : t
      );
      mutate([...updatedTodos]);
      setEditedTitle("");
    }
  };

  return (
    <li className="py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="todo1"
            name="todo1"
            type="checkbox"
            className="h-4 w-4 text-teal-600 focus:ring-teal-500
                  border-gray-300 rounded"
            checked={todo.isCompleted}
            onChange={() => toggleTodoCompletion(todo.id, todo.isCompleted)}
          />
          <label className="ml-3 block text-gray-900">
            {isEditing ? (
              <input
                type="text"
                className="border rounded py-1 px-2"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            ) : (
              <span
                className={`text-lg font-medium mr-2 ${
                  todo.isCompleted ? "line-through" : ""
                }`}
              >
                {todo.title}
              </span>
            )}
          </label>
        </div>
        <div className={`flex items-center space-x-2 `}>
          <button
            className="duration-150 bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 rounded"
            onClick={handleEdit}
          >
            {isEditing ? "Save" : "✒"}
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
            onClick={handleDelete}
          >
            ✖
          </button>
        </div>
      </div>
    </li>
  );
}

export default Todo;
