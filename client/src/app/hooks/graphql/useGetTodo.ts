import Todo from "@/app/components/Todo";
import { TodoType } from "@/app/types";
import { gql, useQuery } from "@apollo/client";

const GET_TODOS = gql`
  query getTodos {
    Todos {
      id
      title
      isCompleted
    }
  }
`;

interface Data {
  Todos: TodoType[];
}

export const useGetTodo = () => {
  const query = useQuery<Data>(GET_TODOS);
  return { ...query, data: query.data != null ? query.data.Todos : [] };
};
