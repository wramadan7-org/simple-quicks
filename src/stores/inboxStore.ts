import { create } from "zustand";
import type { InboxType } from "../types/inboxType";

type State = {
  inboxs: InboxType[];
  inboxSelected: InboxType | null;
  loading: boolean;
  error: boolean;
};

type Action = {
  actions: {
    setInboxs: (inboxs: InboxType[]) => void;
    setInboxSelected: (inbox: InboxType | null) => void;
    setUpdateInboxById: (
      idInbox: string,
      updatedInbox: Partial<InboxType>
    ) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: boolean) => void;
  };
};

const useInboxStore = create<State & Action>((set) => ({
  inboxs: [
    {
      id: "8c197e93-6d2e-4aa4-b5b3-2b0df02fb0ae",
      idInbox: "8c197e93-6d2e-4aa4-b5b3-2b0df02fb0ae",
      idChat: "1234-1234-3221-8392",
      status: "unread",
      name: "Obaidullah Amarkhil",
      from: "109220-Naturalization",
      message: "Morning. I’ll try to do them. Thanks",
      datetime: 1623226800,
      groupCategory: "user",
      participant: 2,
    },
    {
      id: "2f4496a7-93fc-4606-b3ef-382b3a2605b0",
      idInbox: "2f4496a7-93fc-4606-b3ef-382b3a2605b0",
      idChat: "1234-1234-3221-9102",
      status: "read",
      name: "You",
      from: "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
      message: "Thanks Ellen, got it. I’ll review it today.",
      datetime: 1622606100,
      groupCategory: "user",
      participant: 3,
    },
    {
      id: "5d39ad56-1a2e-49f6-a60d-7ad96de0a71f",
      idInbox: "5d39ad56-1a2e-49f6-a60d-7ad96de0a71f",
      idChat: "1234-1234-3221-9202",
      status: "read",
      name: "You",
      from: "8405-Diana SALAZAR MUNGUIA",
      message: "Thank you for the kind words, Cameron. That really helps..",
      datetime: 1622525340,
      groupCategory: "user",
      participant: 5,
    },
    {
      id: "d96059f8-0e40-41a0-9dc3-4a21f16e1d9a",
      idInbox: "d96059f8-0e40-41a0-9dc3-4a21f16e1d9a",
      idChat: "1234-1234-3221-9302",
      status: "read",
      name: null,
      from: "You",
      message: "Hi, I need help with something can you help me ?",
      datetime: 1622524800,
      groupCategory: "system",
      participant: 0,
    },
  ],
  inboxSelected: null,
  loading: false,
  error: false,
  actions: {
    setInboxs: (inboxs) => set({ inboxs }),
    setInboxSelected: (inbox) => set({ inboxSelected: inbox }),
    setUpdateInboxById: (idInbox, updatedInbox) => {
      set((state) => {
        const inboxs = state.inboxs.map((inbox) => {
          if (inbox.idInbox === idInbox) {
            return {
              ...inbox,
              ...updatedInbox,
            };
          }
          return inbox;
        });
        return { inboxs };
      });
    },
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
  },
}));

export const useInboxs = () => useInboxStore((state) => state.inboxs);
export const useInboxSelected = () =>
  useInboxStore((state) => state.inboxSelected);
export const useInboxLoading = () => useInboxStore((state) => state.loading);
export const useInboxError = () => useInboxStore((state) => state.error);
export const useInboxActions = () => useInboxStore((state) => state.actions);
