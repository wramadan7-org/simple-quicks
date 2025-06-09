export type ChatType = {
  id?: string;
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
  groupCategory: GroupCategoryType;
};

export type GroupCategoryType = "user" | "system";
