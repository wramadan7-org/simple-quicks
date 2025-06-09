import axios from "axios";
import type { TaskType } from "../types/taskType";

export const postTask = async (payload: TaskType) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/todos",
    payload
  );

  return response;
};

export const getTasks = async (idTypeTask?: string) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/todos${
      idTypeTask ? `?idTypeTask=${idTypeTask}` : ""
    }`,
    {
      headers: {
        "X-Request-Name": "GetTodosByTypeTask",
      },
    }
  );

  return response;
};

export const getTypeTasks = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/albums"
  );

  return response;
};

export const patchTask = async (idTask: string, payload: Partial<TaskType>) => {
  const response = await axios.patch(
    `https://jsonplaceholder.typicode.com/todos/${idTask}`,
    payload
  );

  return response;
};

export const deleteTask = async (idTask: string) => {
  const response = await axios.delete(
    `https://jsonplaceholder.typicode.com/todos/${idTask}`
  );

  return response;
};
