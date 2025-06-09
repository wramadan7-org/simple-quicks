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
  console.log(`Service getInbox by ID inbox ${idInbox}`);
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  return response;
};

export const patchInbox = async (
  idInbox: string,
  payload: Partial<InboxType>
) => {
  console.log(`Service patchInbox by ID inbox ${idInbox}`);
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
  console.log(`Service getChats by ID inbox ${idInbox}`);
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/comments/1"
  );

  return response;
};

export const getChat = async (idChat: string) => {
  console.log(`Service getChat by ID chat ${idChat}`);
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/comments/1"
  );

  return response;
};

export const patchChat = async (idChat: string, payload: Partial<ChatType>) => {
  console.log(`Service patchChat by ID chat ${idChat}`);
  const response = await axios.patch(
    "https://jsonplaceholder.typicode.com/comments/1",
    payload
  );

  return response;
};

export const deleteChat = async (idChat: string) => {
  console.log(`Service deleteChat by ID chat ${idChat}`);
  const response = await axios.delete(
    "https://jsonplaceholder.typicode.com/comments/1"
  );

  return response;
};
