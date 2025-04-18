import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const TodoData = () => {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draftText, setDraftText] = useState("");

  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get("https://dummyjson.com/todos");
      console.log(response.data);
      return response.data.todos;
    },
  });
  //   const { data: todos, isLoading, isError } = useQuery({
  //     queryKey: ['todos'],
  //     queryFn: todoQuery,
  //   })

  const createTodo = useMutation({
    mutationFn: (todoText) =>
      axios.post("https://dummyjson.com/todos/add", {
        todo: todoText,
        completed: false,
        userId: 1,
      }),
    onSuccess: (data) => {
      const newId = Math.floor(Math.random() * 100);
      const newUserId = Math.floor(Math.random() * 1000);
      const newTodo = {
        ...data.data,
        id: newId,
        userId: newUserId,
      };
      queryClient.setQueryData(["todos"], (oldTodos = []) => [
        ...oldTodos,
        newTodo,
      ]);
    },
  });

  const toggleTodo = useMutation({
    mutationFn: ({ id, completed }) =>
      axios.put(`https://dummyjson.com/todos/${id}`, {
        completed: !completed,
      }),
    onSuccess: (_, { id }) => {
      queryClient.setQueryData(["todos"], (oldTodos = []) =>
        oldTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    },
  });

  const deleteTodo = useMutation({
    mutationFn: (id) => axios.delete(`https://dummyjson.com/todos/${id}`),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["todos"], (oldTodos = []) =>
        oldTodos.filter((todo) => todo.id !== id)
      );
    },
  });

  const editTodo = useMutation({
    mutationFn: ({ id, newText }) =>
      axios.put(`https://dummyjson.com/todos/${id}`, {
        todo: newText,
      }),
    onSuccess: (_, { id, newText }) => {
      queryClient.setQueryData(["todos"], (oldTodos = []) =>
        oldTodos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                todo: newText,
              }
            : todo
        )
      );
    },
  });

  const handleAdd = () => {
    if (newTodo.trim() !== "") {
      createTodo.mutate(newTodo);
      setNewTodo("");
    }
  };

  if (todoQuery.isLoading) return <h1>Loading....</h1>;
  if (todoQuery.isError) return <h1>Error loading data!!!</h1>;

  return (
    <div>
      <div className="border mt-15 w-[50%] m-auto rounded bg-gray-100">
        <div className="flex mt-5">
          <h3 className="ml-4 mt-5 font-bold text-4xl">Todo List</h3>
          <input
            className="ml-50 mt-5 mb-4 rounded pl-3 h-8 w-[260px] border "
            type="text"
            value={newTodo}
            placeholder="Add your todo..."
            onChange={(e) => setNewTodo(e.target.value)}
          ></input>
          <button
            className="ml-4 border rounded-3xl w-20 h-8 mt-5 mr-4 mb-7 text-white bg-green-600"
            onClick={handleAdd}
          >
            Add Task
          </button>
        </div>
        {todoQuery.data.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center border-1 border-gray-200 ml-2 mt-2 mb-1 rounded mr-2"
          >
            <input
              type="checkbox"
              className="mr-2 ml-2"
              checked={todo.completed}
              onChange={() =>
                toggleTodo.mutate({ id: todo.id, completed: todo.completed })
              }
            />

            {editingId === todo.id ? (
              <>
                <input
                  className="flex-1  p-1 max-w-[250px]  rounded h-7 cursor-pointer outline-none "
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  autoFocus
                />
                <div className="flex  max-w-[130px] ml-82 ">
                  <button
                    className="border rounded px-2 ml-2 mt-1 mb-1 cursor-pointer hover:bg-green-600 hover:text-white "
                    onClick={() => {
                      editTodo.mutate({ id: todo.id, newText: draftText });
                      setEditingId(null);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="border rounded px-2 ml-1 mt-1 mb-1 mr-6 w-15 cursor-pointer hover:bg-gray-400"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span
                  className="flex-1"
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.todo}
                </span>
                <div className="flex  max-w-[130px] ml-auto mr-auto ">
                  <button
                    className="border rounded px-2 ml-2 mt-1 mb-1 cursor-pointer hover:bg-amber-500"
                    onClick={() => {
                      setEditingId(todo.id);
                      setDraftText(todo.todo);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="border rounded px-2 ml-1 mt-1 mb-1 mr-6 w-15 cursor-pointer hover:bg-red-600"
                    onClick={() => deleteTodo.mutate(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoData;
