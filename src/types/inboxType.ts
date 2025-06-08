export type InboxType = {
  id?: string;
  idInbox: string;
  status: string;
  name?: string | null;
  from: string;
  message: string;
  datetime: number;
  createBy: "user" | "system";
  participant: number;
};
