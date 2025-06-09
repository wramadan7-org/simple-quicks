import axios from "axios";
import type { ChatType } from "../types/chatType";
import type { InboxType } from "../types/inboxType";

export const getInboxs = async (search?: string) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts${
      search ? `?search=${search}` : ""
    }`
  );

  return response;
};

export const getInbox = async (idInbox: string) => {
  console.log("Trigger getInbox with ID: ", idInbox);
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  return response;
};

export const patchInbox = async (
  idInbox: string,
  payload: Partial<InboxType>
) => {
  console.log("Trigger patchInbox with ID: ", idInbox);

  const response = await axios.patch(
    "https://jsonplaceholder.typicode.com/posts/1",
    payload
  );

  return response;
};

export const postChat = async (payload: ChatType) => {
  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/comments",
    payload
  );

  return response;
};

export const getChats = async (idInbox: string) => {
  console.log("Trigger getChats with ID: ", idInbox);
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/comments/1"
  );

  return response;
};

export const getChat = async (idChat: string) => {
  console.log("Trigger getChat with ID: ", idChat);
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/comments/1"
  );

  return response;
};

export const patchChat = async (idChat: string, payload: Partial<ChatType>) => {
  console.log("Trigger patchChat with ID: ", idChat);
  const response = await axios.patch(
    "https://jsonplaceholder.typicode.com/comments/1",
    payload
  );

  return response;
};

export const deleteChat = async (idChat: string) => {
  console.log("Trigger deleteChat with ID: ", idChat);
  const response = await axios.delete(
    "https://jsonplaceholder.typicode.com/comments/1"
  );

  return response;
};
