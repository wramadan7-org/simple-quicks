import { create } from "zustand";
import {
  type Bookmark,
  type TaskType,
  type TypeTaskType,
} from "../types/taskType";

type State = {
  tasks: TaskType[];
  bookmarks: Bookmark[];
  typeTasks: TypeTaskType[];
  typeTaskSelected: TypeTaskType | null;
  loading: boolean;
  error: boolean;
  isOpenBookmark: boolean;
};

type Action = {
  actions: {
    setTasks: (tasks: TaskType[]) => void;
    setTypeTasks: (typeTasks: TypeTaskType[]) => void;
    setTypeTaskSelected: (typeTask: TypeTaskType | null) => void;
    setCreateTask: (task: TaskType) => void;
    setUpdateTaskById: (idTask: string, updatedTask: Partial<TaskType>) => void;
    setDeleteTaskById: (idTask: string) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: boolean) => void;
    setIsOpenBookmark: (isOpen: boolean) => void;
  };
};

export const useTaskStore = create<State & Action>((set) => ({
  tasks: [
    {
      id: "f3c0b77a-5fa7-4129-bcad-1d7c5fe40e01",
      idTask: "f3c0b77a-5fa7-4129-bcad-1d7c5fe40e01",
      idTypeTask: "2f4496a7-93fc-4606-b3ef-382b3a2605b0",
      title: "Update team weekly report",
      description:
        "Compile and submit the weekly performance report for the My Tasks group.",
      deadline: 1749357600,
      status: "open",
      typeTask: "My Tasks",
      bookmarks: [
        {
          id: "a1b2c3d4-1234-5678-9101-abcdef123456",
          idBookmark: "a1b2c3d4-1234-5678-9101-abcdef123456",
          name: "Important ASAP",
        },
        {
          id: "c3d4e5f6-3344-7788-0099-cdefab345678",
          idBookmark: "c3d4e5f6-3344-7788-0099-cdefab345678",
          name: "Virtual Meeting",
        },
      ],
    },
    {
      id: "716a93dc-c8cb-4e60-a634-913dbe90519b",
      idTask: "716a93dc-c8cb-4e60-a634-913dbe90519b",
      idTypeTask: "9317w6a7-51cw-7591-123po-951b3a230o28",
      title: "Buy groceries for the week",
      description: "Buy essential groceries and household items.",
      deadline: 1749058800,
      status: "completed",
      typeTask: "Personal Errands",
    },
    {
      id: "7f6f3a9d-2b93-4df8-8fd4-ea7c8c342a50",
      idTask: "7f6f3a9d-2b93-4df8-8fd4-ea7c8c342a50",
      idTypeTask: "35391p73-33sc-3521-8e81-120sia263171",
      title: "Send urgent contract to legal",
      description:
        "Email the urgent contract documents to the legal team before the deadline.",
      deadline: 1749472800,
      status: "open",
      typeTask: "Urgent To-Do",
    },
    {
      id: "95cba2dc-70c2-4df0-bf3c-e28a5c57e300",
      idTask: "95cba2dc-70c2-4df0-bf3c-e28a5c57e300",
      idTypeTask: "9317w6a7-51cw-7591-123po-951b3a230o28",
      title: "Clean garage",
      description: "Organize and clean the garage before the end of the week.",
      deadline: 1749170400,
      status: "completed",
      typeTask: "Personal Errands",
    },
    {
      id: "dd86be55-2d11-457f-8e5b-0d8c9bc0bb1d",
      idTask: "dd86be55-2d11-457f-8e5b-0d8c9bc0bb1d",
      idTypeTask: "2f4496a7-93fc-4606-b3ef-382b3a2605b0",
      title: "Finish feature development: login module",
      description:
        "Complete and push the login module code to the main branch.",
      deadline: 1749612000,
      status: "completed",
      typeTask: "My Tasks",
      bookmarks: [
        {
          id: "e5f6g7h8-5566-9900-2233-efabcd567890",
          idBookmark: "e5f6g7h8-5566-9900-2233-efabcd567890",
          name: "Client Related",
        },
        {
          id: "f6g7h8i9-6677-0011-3344-fabcde678901",
          idBookmark: "f6g7h8i9-6677-0011-3344-fabcde678901",
          name: "Self Task",
        },
      ],
    },
    {
      id: "84e45717-7754-4e76-a4f6-7b46c58a05fc",
      idTask: "84e45717-7754-4e76-a4f6-7b46c58a05fc",
      idTypeTask: "2f4496a7-93fc-4606-b3ef-382b3a2605b0",
      title: "Review meeting notes",
      description:
        "Review the minutes from last week's meeting and summarize key points.",
      deadline: 1749391200,
      status: "open",
      typeTask: "My Tasks",
      bookmarks: [
        {
          id: "a1b2c3d4-1234-5678-9101-abcdef123456",
          idBookmark: "a1b2c3d4-1234-5678-9101-abcdef123456",
          name: "Important ASAP",
        },
      ],
    },
    {
      id: "9c9ba416-221f-4b5d-b8a2-251c084c162c",
      idTask: "9c9ba416-221f-4b5d-b8a2-251c084c162c",
      idTypeTask: "9317w6a7-51cw-7591-123po-951b3a230o28",
      title: "Pay electricity bill",
      description: "Pay the monthly electricity bill before the due date.",
      deadline: 1748968800,
      status: "completed",
      typeTask: "Personal Errands",
    },
    {
      id: "bbd53cc5-b0df-4b3d-a3fc-fc25cd82bfa0",
      idTask: "bbd53cc5-b0df-4b3d-a3fc-fc25cd82bfa0",
      idTypeTask: "35391p73-33sc-3521-8e81-120sia263171",
      title: "Fix login bug on production",
      description: "Critical issue on user login — must be resolved ASAP.",
      deadline: 1749228000,
      status: "open",
      typeTask: "Urgent To-Do",
    },
    {
      id: "5f1949b5-4455-4eb8-b42b-85b6e72b3ea3",
      idTask: "5f1949b5-4455-4eb8-b42b-85b6e72b3ea3",
      idTypeTask: "9317w6a7-51cw-7591-123po-951b3a230o28",
      title: "Book annual medical check-up",
      description:
        "Schedule and confirm appointment for general health check-up.",
      deadline: 1749304800,
      status: "completed",
      typeTask: "Personal Errands",
    },
    {
      id: "449e5c85-181e-4ea1-80a7-f23a4a1c7b5e",
      idTask: "449e5c85-181e-4ea1-80a7-f23a4a1c7b5e",
      idTypeTask: "2f4496a7-93fc-4606-b3ef-382b3a2605b0",
      title: "Write Q2 OKRs draft",
      description:
        "Prepare draft of Q2 Objectives and Key Results for the team.",
      deadline: 1749444000,
      status: "completed",
      typeTask: "My Tasks",
    },
    {
      id: "b90cf74e-0a87-42e3-a3fd-c5e3d05c48e6",
      idTask: "b90cf74e-0a87-42e3-a3fd-c5e3d05c48e6",
      idTypeTask: "35391p73-33sc-3521-8e81-120sia263171",
      title: "Submit urgent vendor invoice",
      description:
        "Process and send urgent invoice to vendor for payment approval.",
      deadline: 1749523200,
      status: "completed",
      typeTask: "Urgent To-Do",
    },
    {
      id: "6f8588a4-ec0f-4684-b4bb-bb40db3a991e",
      idTask: "6f8588a4-ec0f-4684-b4bb-bb40db3a991e",
      idTypeTask: "9317w6a7-51cw-7591-123po-951b3a230o28",
      title: "Pick up dry cleaning",
      description: "Collect dry cleaning from the shop before 7 PM.",
      deadline: 1748878800,
      status: "open",
      typeTask: "Personal Errands",
    },
    {
      id: "eff91f1d-4dd0-4b80-bc3d-2230166d3dd4",
      idTask: "eff91f1d-4dd0-4b80-bc3d-2230166d3dd4",
      idTypeTask: "2f4496a7-93fc-4606-b3ef-382b3a2605b0",
      title: "Finalize budget forecast",
      description: "Check and finalize the upcoming quarter's budget forecast.",
      deadline: 1749705600,
      status: "completed",
      typeTask: "My Tasks",
    },
    {
      id: "65c703e0-585b-4bfb-9d80-19b26bdf33cf",
      idTask: "65c703e0-585b-4bfb-9d80-19b26bdf33cf",
      idTypeTask: "35391p73-33sc-3521-8e81-120sia263171",
      title: "Urgent: approve security patch",
      description:
        "Approve the deployment of a critical security patch to live systems.",
      deadline: 1749788400,
      status: "open",
      typeTask: "Urgent To-Do",
    },
    {
      id: "ed7a0ee1-bdfb-4c0c-981f-389166b726b0",
      idTask: "ed7a0ee1-bdfb-4c0c-981f-389166b726b0",
      idTypeTask: "9317w6a7-51cw-7591-123po-951b3a230o28",
      title: "Call plumber",
      description: "Fix the kitchen sink leak before it worsens.",
      deadline: 1749136800,
      status: "completed",
      typeTask: "Personal Errands",
    },
  ],
  typeTasks: [
    {
      id: "2f4496a7-93fc-4606-b3ef-382b3a2605b0",
      idTypeTask: "2f4496a7-93fc-4606-b3ef-382b3a2605b0",
      name: "My Tasks",
    },
    {
      id: "9317w6a7-51cw-7591-123po-951b3a230o28",
      idTypeTask: "9317w6a7-51cw-7591-123po-951b3a230o28",
      name: "Personal Errands",
    },
    {
      id: "35391p73-33sc-3521-8e81-120sia263171",
      idTypeTask: "35391p73-33sc-3521-8e81-120sia263171",
      name: "Urgent To-Do",
    },
  ],
  bookmarks: [
    {
      id: "a1b2c3d4-1234-5678-9101-abcdef123456",
      idBookmark: "a1b2c3d4-1234-5678-9101-abcdef123456",
      name: "Important ASAP",
    },
    {
      id: "b2c3d4e5-2233-6677-9988-bcdefa234567",
      idBookmark: "b2c3d4e5-2233-6677-9988-bcdefa234567",
      name: "Offline Meeting",
    },
    {
      id: "c3d4e5f6-3344-7788-0099-cdefab345678",
      idBookmark: "c3d4e5f6-3344-7788-0099-cdefab345678",
      name: "Virtual Meeting",
    },
    {
      id: "d4e5f6g7-4455-8899-1122-defabc456789",
      idBookmark: "d4e5f6g7-4455-8899-1122-defabc456789",
      name: "ASAP",
    },
    {
      id: "e5f6g7h8-5566-9900-2233-efabcd567890",
      idBookmark: "e5f6g7h8-5566-9900-2233-efabcd567890",
      name: "Client Related",
    },
    {
      id: "f6g7h8i9-6677-0011-3344-fabcde678901",
      idBookmark: "f6g7h8i9-6677-0011-3344-fabcde678901",
      name: "Self Task",
    },
    {
      id: "g7h8i9j0-7788-1122-4455-abcdef789012",
      idBookmark: "g7h8i9j0-7788-1122-4455-abcdef789012",
      name: "Appointments",
    },
    {
      id: "h8i9j0k1-8899-2233-5566-bcdefa890123",
      idBookmark: "h8i9j0k1-8899-2233-5566-bcdefa890123",
      name: "Court Related",
    },
  ],
  typeTaskSelected: {
    id: "2f4496a7-93fc-4606-b3ef-382b3a2605b0",
    idTypeTask: "2f4496a7-93fc-4606-b3ef-382b3a2605b0",
    name: "My Tasks",
  },
  isOpenBookmark: false,
  loading: false,
  error: false,
  actions: {
    setIsOpenBookmark: (isOpen) => set({ isOpenBookmark: isOpen }),
    setTasks: (tasks) => set({ tasks }),
    setTypeTasks: (typeTasks) => set({ typeTasks }),
    setTypeTaskSelected: (typeTask) => set({ typeTaskSelected: typeTask }),
    setCreateTask: (task) =>
      set((state) => ({ tasks: [task, ...state.tasks] })),
    setUpdateTaskById: (idTask, updatedTask) => {
      set((state) => {
        const tasks = state.tasks.map((task) => {
          if (task.idTask === idTask) {
            return {
              ...task,
              ...updatedTask,
            };
          }
          return task;
        });
        return { tasks };
      });
    },
    setDeleteTaskById: (idTask: string) =>
      set((state) => ({
        tasks: state.tasks.filter((task) => task.idTask !== idTask),
      })),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
  },
}));

export const useBookmarks = () => useTaskStore((state) => state.bookmarks);
export const useIsOpenBookmark = () =>
  useTaskStore((state) => state.isOpenBookmark);
export const useTasks = () => useTaskStore((state) => state.tasks);
export const useTypeTasks = () => useTaskStore((state) => state.typeTasks);
export const useTypeTaskSelected = () =>
  useTaskStore((state) => state.typeTaskSelected);
export const useTaskActions = () => useTaskStore((state) => state.actions);
