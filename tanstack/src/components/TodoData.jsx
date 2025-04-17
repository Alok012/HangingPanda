import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const TodoData = () => {
  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await axios.get("https://dummyjson.com/todos");
      console.log(response.data);
      return response.data.todos;
    },
  });

  if (todoQuery.isLoading) return <h1>Loading....</h1>;
  if (todoQuery.isError) return <h1>Error loading data!!!</h1>;

  return (
    <div>
      <div>
        <h3>Todo List</h3>
        {todoQuery.data.map((todo) => (
          <div key={todo.id}>
            {todo.todo} &nbsp;
            {todo.completed} &nbsp; {todo.userId}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoData;
