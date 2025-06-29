export type TaskType = {
  id: string;
  idTask: string;
  idTypeTask: string;
  title: string;
  description?: string;
  deadline?: number;
  status: StatusTaskType;
  typeTask: string;
  bookmarks?: Bookmark[];
};

export type Bookmark = {
  id: string;
  idBookmark: string;
  name: string;
};

export type StatusTaskType = "completed" | "open" | "new";

export type TypeTaskType = {
  id: string;
  idTypeTask: string;
  name: string;
};
