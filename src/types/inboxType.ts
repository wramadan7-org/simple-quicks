export type InboxType = {
  id?: string;
  idInbox: string;
  idChat?: string | null;
  status: string;
  name?: string | null;
  from: string;
  message: string;
  datetime: number;
  groupCategory: "user" | "system";
  participant: number;
};
