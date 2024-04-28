import useSWR from "swr";
import { TodoType } from "../types";
import { API_URL } from "@/constants/url";

async function fetcher(key: string) {
  return fetch(key).then((res) => res.json());
}

export const useTodos = () => {
  const { data, isLoading, error, mutate } = useSWR<TodoType[]>(
    `${API_URL}/allTodos`,
    fetcher
  );

  return {
    todos: data,
    isLoading,
    error,
    mutate,
  };
};
