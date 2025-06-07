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
      idInbox: "8c197e93-6d2e-4aa4-b5b3-2b0df02fb0ae",
      status: "unread",
      name: "Cameron Phillips",
      from: "109220-Naturalization",
      message: "Please check this out!",
      datetime: 1622524740,
      createBy: "user",
      participant: 2,
    },
    {
      idInbox: "2f4496a7-93fc-4606-b3ef-382b3a2605b0",
      status: "read",
      name: "Ellen",
      from: "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
      message: "Hey, please read.",
      datetime: 1622605500,
      createBy: "user",
      participant: 3,
    },
    {
      idInbox: "5d39ad56-1a2e-49f6-a60d-7ad96de0a71f",
      status: "read",
      name: "Cameron Phillips",
      from: "8405-Diana SALAZAR MUNGUIA",
      message:
        "I understand your initial concerns and thats very valid, Elizabeth. But you shouldn`t be concerned about it. You are not alone. You are not the only one who is going through this.",
      datetime: 1622524740,
      createBy: "user",
      participant: 5,
    },
    {
      idInbox: "d96059f8-0e40-41a0-9dc3-4a21f16e1d9a",
      status: "read",
      name: null,
      from: "FastVisa Support",
      message: "Hey there! Welcome to your inbox.",
      datetime: 1609497000,
      createBy: "system",
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
