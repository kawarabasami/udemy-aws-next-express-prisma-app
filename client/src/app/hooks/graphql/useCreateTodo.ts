import { gql, useMutation, useQuery } from "@apollo/client";

const CREATE_TODOS = gql`
  mutation CreateTodo($title: String!, $isCompleted: Boolean) {
    createTodo(input: { title: $title, isCompleted: $isCompleted }) {
      title
      isCompleted
    }
  }
`;

interface Props {
  title: string;
  isCompleted: boolean;
}

export const useCreateTodo = () => {
  const mutation = useMutation(CREATE_TODOS);
  return mutation;
};
