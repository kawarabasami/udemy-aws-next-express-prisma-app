import useSWR from "swr";
import { TodoType } from "../types";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}

export const useTodos = () => {
  const { data, isLoading, error, mutate } = useSWR<TodoType[]>(
    "http://localhost:8080/allTodos",
    fetcher
  );

  return {
    todos: data,
    isLoading,
    error,
    mutate,
  };
};
