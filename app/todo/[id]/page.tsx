"use client";

import { useEffect, useState } from "react";
import React from "react";

interface Todo {
  id: number;
  text: string;
}

interface Props {
  params: Promise<{ id: string }>; // 👈 params is a Promise in Next.js 16
}

export default function TodoPage({ params }: Props) {
  const { id } = React.use(params); // 👈 unwrap params using React.use()
  const [todo, setTodo] = useState<Todo | null>(null);

  async function loadTodo() {
    const res = await fetch("/api/todos");
    const allTodos: Todo[] = await res.json();
    setTodo(allTodos.find((t) => t.id === parseInt(id)) || null);
  }

  async function deleteTodo() {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });

    window.location.href = "/";
  }

  useEffect(() => {
    loadTodo();
  }, []);

  if (!todo) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo Details</h1>
      <p>Text: {todo.text}</p>

      <button onClick={deleteTodo} style={{ color: "red" }}>
        Delete Todo
      </button>
    </div>
  );
}
