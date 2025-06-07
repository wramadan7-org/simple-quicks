export type ChatType = {
  idChat: string;
  idInbox: string;
  name: string;
  from: string;
  to: string;
  message: string;
  datetime: number;
  idReply?: string;
  isNew: boolean;
  isReply: boolean;
  isRead: boolean;
  createdBy: "user" | "system";
};
