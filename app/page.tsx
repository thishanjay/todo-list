"use client";

import { useEffect, useState } from "react";

interface Todo {
  id: number;
  text: string;
}

export default function Home() {
  const[todos, setTodos] = useState<Todo[]>([]);
  const[text, setText] = useState("");

  async function loadTodos() {
    const res = await fetch("/api/todos");
    const data: Todo[] = await res.json();
    setTodos(data);
  }

  async function addTodo() {
    if(!text.trim()) return;

    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    const newTodo: Todo = await res.json();
    setTodos([...todos, newTodo]);
    setText("");
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return(
    <div className="p-8 m-8 text-center">
      <h1 className="text-3xl p-4">Todo List</h1>
      <input 
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Add a todo..."
      className="p-4 border-2 border-grey-700 focus:border-amber-500"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <a href={`/todo/${t.id}`}>{t.text}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

